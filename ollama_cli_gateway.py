import json
import re
import subprocess
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


OLLAMA_EXE = Path.home() / "AppData" / "Local" / "Programs" / "Ollama" / "ollama.exe"
HOST = "0.0.0.0"
PORT = 11435
CLOUD_MODELS = ["minimax-m3:cloud", "gemma4:31b-cloud"]


class GatewayHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path.rstrip("/") == "/api/tags":
            self.send_json({"models": [{"name": name, "model": name} for name in model_names()]})
            return
        self.send_json({"ok": True, "name": "ollama-cli-gateway"}, 200)

    def do_POST(self) -> None:
        if self.path.rstrip("/") not in {"/api/chat", "/api/generate"}:
            self.send_json({"error": "not found"}, 404)
            return

        payload = self.read_json()
        model = str(payload.get("model") or "").strip()
        if not model:
            self.send_json({"error": "model is required"}, 400)
            return

        prompt = self.prompt_from_payload(payload)
        try:
            result = run_ollama(model, prompt)
        except subprocess.CalledProcessError as exc:
            self.send_json({"error": (exc.stderr or exc.stdout or str(exc))[-2000:]}, 502)
            return
        content = result["content"]
        usage = {
            "prompt_eval_count": estimate_token_count(prompt),
            "eval_count": estimate_token_count(content),
            "total_tokens": estimate_token_count(prompt) + estimate_token_count(content),
            "duration_seconds": result["duration_seconds"],
            "token_source": "estimated",
        }

        if self.path.rstrip("/") == "/api/generate":
            self.send_json({"response": content, "done": True, **usage})
        else:
            self.send_json({"message": {"role": "assistant", "content": content}, "done": True, **usage})

    def read_json(self) -> dict:
        size = int(self.headers.get("Content-Length") or "0")
        if not size:
            return {}
        return json.loads(self.rfile.read(size).decode("utf-8"))

    def prompt_from_payload(self, payload: dict) -> str:
        if "prompt" in payload:
            return str(payload.get("prompt") or "")
        messages = payload.get("messages") or []
        parts = []
        for message in messages:
            role = message.get("role", "user")
            content = message.get("content", "")
            parts.append(f"{role}: {content}")
        return "\n\n".join(parts)

    def send_json(self, data: dict, status: int = 200) -> None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, _format: str, *_args) -> None:
        return


def model_names() -> list[str]:
    names = list(CLOUD_MODELS)
    try:
        result = subprocess.run(
            [str(OLLAMA_EXE), "list"],
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
            timeout=20,
            check=True,
        )
        for line in result.stdout.splitlines()[1:]:
            name = line.split(maxsplit=1)[0].strip()
            if name and name not in names:
                names.append(name)
    except Exception:
        pass
    return names


def run_ollama(model: str, prompt: str) -> dict:
    started = time.perf_counter()
    result = subprocess.run(
        [str(OLLAMA_EXE), "run", model, prompt],
        text=True,
        capture_output=True,
        encoding="utf-8",
        errors="replace",
        timeout=600,
        check=True,
    )
    return {
        "content": clean_ollama_output(result.stdout),
        "duration_seconds": round(time.perf_counter() - started, 2),
    }


def estimate_token_count(text: str) -> int:
    text = str(text or "")
    if not text.strip():
        return 0
    chinese_chars = len(re.findall(r"[\u4e00-\u9fff]", text))
    ascii_words = len(re.findall(r"[A-Za-z0-9_]+", text))
    other_chars = max(0, len(text) - chinese_chars)
    return max(1, int(chinese_chars * 1.15 + ascii_words * 1.25 + other_chars / 4))


def clean_ollama_output(output: str) -> str:
    text = strip_terminal_control(output)
    text = re.sub(r"(?is)\bThinking\.\.\..*?\.\.\.done thinking\.", "", text)
    parsed = extract_last_json(text)
    if parsed:
        return parsed
    return text.strip()


def strip_terminal_control(output: str) -> str:
    text = re.sub(r"\x1b\[[0-?]*[ -/]*[@-~]", "", output)
    text = re.sub(r"\x1b\][^\x07]*(?:\x07|\x1b\\)", "", text)
    return "".join(ch for ch in text if ch == "\n" or ch == "\t" or ord(ch) >= 32)


def extract_last_json(text: str) -> str:
    decoder = json.JSONDecoder()
    candidates = []
    for index, char in enumerate(text):
        if char not in "{[":
            continue
        try:
            value, end = decoder.raw_decode(text[index:])
        except json.JSONDecodeError:
            continue
        if isinstance(value, (dict, list)):
            candidates.append(text[index : index + end])
    return candidates[-1] if candidates else ""


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), GatewayHandler)
    print(f"Ollama CLI gateway listening on http://{HOST}:{PORT}")
    server.serve_forever()
