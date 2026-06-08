# AI 训练日志填写工具

这是一个本地运行的训练日志生成工具。它可以读取训练计划 Excel、网页任务内容或手动输入内容，再调用 AI 生成训练日志，并写入 DOCX 模板，最后导出 DOCX、PDF、文件夹或 ZIP。

项目默认使用 Docker 运行，适合 Windows 本机部署。Docker 会自动安装后端运行依赖、LibreOffice Writer 和中文字体，不需要你手动在系统里配置 Python 环境。

## 功能概览

- 上传或使用内置 DOCX 训练日志模板。
- 支持批量填写和手动填写。
- 支持读取训练计划 Excel，格式包括 XLSX、XLSM、CSV、TSV、TXT。
- 支持 OpenAI 兼容接口、DeepSeek 兼容接口、本机 Ollama、本机 Ollama 应用网关。
- 支持把生成结果写回 DOCX，并可导出 PDF。
- 支持批量生成多个文档，输出文件夹或 ZIP。
- 支持显示每一篇训练日志的生成耗时和 token 消耗。
- 支持多用户登录，每个用户保存自己的 API 配置。
- 支持导出和导入账号配置备份。
- 支持 Ollama 已登录应用/CLI 的云端模型网关，例如 `gemma4:31b-cloud`、`minimax-m3:cloud`。

## 目录结构

```text
.
├─ app/                         后端、前端页面、静态资源和模板
├─ config/                      本地配置目录，保存用户、API、登录设置
├─ outputs/                     生成后的 DOCX、PDF、ZIP
├─ uploads/                     上传的临时文件
├─ Dockerfile                   Docker 镜像构建文件
├─ docker-compose.yml           本地服务编排
├─ requirements.txt             Python 依赖列表
├─ ollama_cli_gateway.py        Ollama 应用/CLI 网关
├─ README.md                    项目说明
└─ USERS.md                     用户登录配置说明
```

## 推荐运行方式：Docker

### 1. 安装依赖

先安装这些软件：

- Docker Desktop for Windows
- Git，可选，但推荐
- 一个现代浏览器，例如 Edge 或 Chrome

Docker Desktop 安装后，打开 Docker Desktop，并确认左下角或状态栏显示 Docker 正在运行。

### 2. 获取项目代码

如果项目放在 GitHub 或其他 Git 仓库，推荐用 `git clone` 拉取。

先选择一个保存项目的目录，例如：

```powershell
cd "C:\Users\你的用户名\Documents"
```

然后执行：

```powershell
git clone 仓库地址
```

示例：

```powershell
git clone https://github.com/你的用户名/训练日志.git
```

如果仓库名是英文，例如 `training-log`：

```powershell
git clone https://github.com/你的用户名/training-log.git
```

本项目当前仓库示例：

```powershell
git clone https://github.com/Lillanqiu/training-log-docker.git
cd training-log-docker
```

执行完上面两个命令后，PowerShell 提示符应该类似这样：

```text
PS C:\Users\Skills\training-log-docker>
```

这说明你已经进入项目目录，接下来就可以继续复制配置文件并启动 Docker。

拉取完成后会生成一个项目文件夹：

```text
Documents/
└─ training-log/
```

进入项目目录：

```powershell
cd .\training-log
```

如果你已经有项目目录，只是想更新最新代码，在项目目录里执行：

```powershell
git pull
```

如果你没有安装 Git，也可以在 GitHub 页面点击 `Code`，选择 `Download ZIP`，下载后解压到本机目录。解压后进入包含 `docker-compose.yml` 和 `README.md` 的那一层目录。

确认当前目录正确：

```powershell
Get-ChildItem
```

正常应该能看到这些文件：

```text
Dockerfile
docker-compose.yml
requirements.txt
README.md
app
config
```

如果你看到这些文件，就继续执行：

```powershell
Copy-Item .env.example .env
docker compose up --build -d
```

启动完成后打开浏览器访问：

```text
http://127.0.0.1:18080
```

如果想确认服务是否启动成功：

```powershell
docker compose ps
```

### 3. 进入项目目录

PowerShell 示例：

```powershell
cd "C:\Users\lillan\OneDrive\文档\训练日志"
```

如果你是刚刚用 `git clone` 拉下来的项目，就进入你实际 clone 出来的目录，例如：

```powershell
cd "C:\Users\你的用户名\Documents\training-log"
```

### 4. 准备环境变量文件

复制示例文件：

```powershell
Copy-Item .env.example .env
```

编辑 `.env`。最小配置可以先这样：

```text
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4.1-mini
SESSION_SECRET=replace_with_a_long_random_string
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD_HASH=
```

如果你准备使用 OpenAI 兼容 API，可以填写：

```text
AI_API_KEY=你的_API_密钥
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4.1-mini
```

如果你主要在网页里配置 API，`.env` 里的 AI 配置可以留空或保持默认。

### 5. 启动服务

第一次启动会下载基础镜像并安装依赖，耗时会久一些：

```powershell
docker compose up --build -d
```

查看服务状态：

```powershell
docker compose ps
```

查看日志：

```powershell
docker compose logs -f
```

打开页面：

```text
http://127.0.0.1:18080
```

### 6. 停止服务

```powershell
docker compose down
```

如果只想重新构建并启动：

```powershell
docker compose up --build -d
```

## Docker 会安装哪些依赖

Dockerfile 使用 `python:3.12-slim`，并安装：

- `libreoffice-writer`：用于 DOCX 转 PDF。
- `fonts-noto-cjk`：用于中文字体渲染。
- `fastapi`
- `uvicorn[standard]`
- `python-multipart`
- `httpx`
- `pypdf`
- `python-docx`
- `openpyxl`

这些 Python 依赖来自 `requirements.txt`。

如果 Docker 构建时卡在 Docker Hub，比如 TLS handshake timeout，通常是网络临时问题，可以直接重试：

```powershell
docker compose up --build -d
```

## 可选：本地 Python 运行

推荐使用 Docker。只有在你明确不想用 Docker 时，才需要本地 Python 运行。

### 1. 安装本地依赖

需要：

- Python 3.12
- LibreOffice
- 中文字体

创建虚拟环境：

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

安装 Python 依赖：

```powershell
pip install -r requirements.txt
```

### 2. 启动后端

```powershell
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

打开：

```text
http://127.0.0.1:8000
```

注意：本地运行时，代码里默认的 `/app/uploads`、`/app/outputs` 是为 Docker 设计的。如果不改代码，建议仍使用 Docker。

## 页面使用流程

### 批量填写

推荐流程：

1. 选择填写方式为“批量填写”。
2. 填写“填写人”。
3. 选择 API 配置，并先点“API 测试”。
4. 选择任务来源：手动导入或链接提取。
5. 上传训练计划 Excel。
6. 点击“解析上传的表格”。
7. 选择下载格式：DOCX 或 PDF。
8. 选择批量下载方式：文件夹或 ZIP。
9. 上传 DOCX 模板，或留空使用内置模板。
10. 检查要填写的字段。
11. 点击“生成并写入”。

### 手动填写

适合只生成一份训练日志：

1. 选择填写方式为“手动填写”。
2. 选择模块和老师。
3. 输入训练任务或训练内容。
4. 上传模板或使用内置模板。
5. 点击“生成并写入”。

## API 配置说明

页面里的“详细设置”会打开设置面板。里面主要有这些区域：

- 基础设置：选择 API 兼容格式和当前模型。
- 模型组：维护同一 API 地址可用的模型列表，一行一个。
- API 配置：填写 API 地址、密钥，测试连接，保存配置。
- API 快速配置：一键切换常用 API。
- 配置备份：导出或导入当前账号配置。
- 模块选项：管理训练模块和授课老师。

### OpenAI 兼容接口

适用于 OpenAI 官方、DeepSeek、移动云、硅基流动、OpenRouter、LM Studio、vLLM 等兼容 Chat Completions 的服务。

示例：

```text
兼容格式：OpenAI 兼容 / Chat Completions
API 地址：https://api.openai.com/v1
API 密钥：sk-...
模型：gpt-4.1-mini
```

DeepSeek 示例：

```text
API 地址：https://api.deepseek.com/v1
模型：deepseek-chat
```

本机 OpenAI 兼容服务示例：

```text
API 地址：http://host.docker.internal:1234/v1
模型：local-model
```

注意：应用运行在 Docker 容器里。如果容器要访问宿主机服务，不能写 `localhost`，要写：

```text
http://host.docker.internal:端口
```

### 本机 Ollama API

适用于普通本地模型，例如：

```text
gemma4:26b
gemma4:31b
gemma4:latest
qwen2.5:7b
```

配置：

```text
兼容格式：Ollama / 本地模型
API 地址：http://host.docker.internal:11434
API 密钥：留空
模型：本地模型名
```

本机 Ollama API 只能看到本地模型，通常不能列出 Ollama 应用里登录后的云端模型。

## Ollama 应用网关模式

这个项目额外提供 `ollama_cli_gateway.py`，用于把训练日志请求转发给你电脑上已经登录的 Ollama 应用/CLI。

它解决的是这个场景：

- 你已经在本机 Ollama 应用或 CLI 登录。
- 你可以在命令行运行云端模型，例如：

```powershell
ollama run gemma4:31b-cloud "只回复 OK"
ollama run minimax-m3:cloud "只回复 OK"
```

- 你希望训练日志应用使用这些“本机已登录 Ollama 应用提供的云端模型”。

这和直接调用 `https://ollama.com` API 不是一回事。这里不是把 API key 直接发给 Ollama Cloud，而是让本机网关调用你电脑里的 `ollama.exe run ...`。

### 启动 Ollama 应用网关

确认 Ollama 已安装，默认路径类似：

```text
C:\Users\你的用户名\AppData\Local\Programs\Ollama\ollama.exe
```

先验证命令行可以调用云端模型：

```powershell
& "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" run gemma4:31b-cloud "只回复 OK"
```

启动网关：

```powershell
python ollama_cli_gateway.py
```

网关默认监听：

```text
http://127.0.0.1:11435
```

Docker 容器访问它时使用：

```text
http://host.docker.internal:11435
```

页面里选择“API 快速配置”里的：

```text
Ollama 应用网关
```

模型列表里应该能看到：

```text
gemma4:31b-cloud
minimax-m3:cloud
```

### 验证网关

本机测试模型列表：

```powershell
Invoke-RestMethod http://127.0.0.1:11435/api/tags
```

测试生成：

```powershell
$body = @{
  model = "gemma4:31b-cloud"
  stream = $false
  messages = @(@{ role = "user"; content = '只返回这个 JSON：{"ok":true}' })
} | ConvertTo-Json -Depth 8

Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:11435/api/chat" -ContentType "application/json" -Body $body
```

Docker 后端测试模型列表：

```powershell
$body = @{
  format = "ollama"
  base_url = "http://host.docker.internal:11435"
  api_key = ""
  model = "gemma4:31b-cloud"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:18080/api/models" -ContentType "application/json" -Body $body
```

### 网关注意事项

- 网关是本机进程，电脑重启后需要重新启动。
- 云端模型速度取决于 Ollama 应用和网络，首次调用可能比较慢。
- 网关会清理 Ollama CLI 输出里的终端控制字符，并尽量抽取 JSON 内容。
- 如果模型输出不是合法 JSON，训练日志后端可能解析失败。可以换更稳定的模型或调整提示词。

## 训练计划 Excel

推荐使用 Excel 模板。常见字段可以包含：

```text
日期
星期
时间
模块
训练计划
负责教练
授课老师
训练模块
训练任务
训练内容
学习笔记
总结
填写人
```

系统会从 Excel 中解析要生成的训练对象，然后你可以勾选要生成哪些记录。

如果 Excel 解析效果不好，建议：

- 表头放在第一行或靠前位置。
- 每一行代表一个训练记录。
- 日期、模块、任务、老师等字段尽量单独列。
- 避免大量合并单元格。
- 避免把多个训练对象都塞进一个单元格。

## DOCX 模板

模板可以上传，也可以留空使用内置模板。

系统会尝试识别：

- 表格表头，例如 `日期 / 星期 / 时间 / 模块 / 训练计划 / 负责教练`。
- 标签式字段，例如 `训练内容`、`学习笔记`、`总结`、`填写人`。
- 常见空白占位符，例如下划线或空表格单元格。

生成后会写入模板并输出新文件。原模板不会被覆盖。

## 输出文件

输出默认保存在：

```text
outputs/
```

Docker 容器内路径是：

```text
/app/outputs
```

单文件生成会返回下载链接。批量生成可以选择：

- 生成文件夹，不压缩。
- 生成 ZIP，便于一次下载。

## 生成统计

每次生成完成后，页面会在结果预览和生成列表里显示每一篇训练日志的统计信息：

- 耗时：这一篇从发起模型请求到拿到结果的大致时间。
- Token：输入 token、输出 token 和总 token。
- 来源：显示 token 是 API 返回的精确值、系统估算值，还是批量一次生成后按篇分摊。
- 模型：本次生成使用的模型名称。

不同模型来源的统计方式略有区别：

- OpenAI 兼容 API：如果接口返回 `usage`，页面显示接口返回的精确 token；如果接口没有返回 `usage`，系统会按文本长度估算。
- 本机 Ollama API：如果 Ollama 返回 `prompt_eval_count` 和 `eval_count`，页面显示 Ollama 返回的 token；如果没有返回，也会自动估算。
- Ollama 应用网关：因为 `ollama.exe run` 的 CLI 输出通常不给标准 token 统计，所以网关会记录真实调用耗时，并按提示词和输出内容估算 token。
- 本地兜底生成：没有调用模型，token 显示为未统计。

批量生成时，如果系统是一篇一篇调用模型，每篇会显示自己的耗时和 token。若使用一次模型调用生成多篇内容，后端会把这次请求的 token 和耗时按篇分摊显示。

## 多用户和配置保存

运行时配置保存在 `config/` 目录：

- `config/users.json`：用户配置。
- `config/auth-settings.json`：是否需要登录密码。
- `config/api-config-用户名.json`：每个用户自己的 API 配置。
- `config/session-secret.txt`：会话密钥。

这些文件可能包含密钥或登录信息，不应该提交到公开仓库。

更详细的账号说明见：

```text
USERS.md
```

## 常用接口

页面正常使用即可。下面这些接口适合调试：

```text
GET  /api/session
GET  /api/config
POST /api/config
POST /api/test-api
POST /api/models
POST /api/template-preview
POST /api/import-plan
POST /api/fill
POST /api/fill-job
GET  /api/jobs/{job_id}
GET  /download/{filename}
GET  /download-folder/{folder}/{filename}
GET  /download-folder-zip/{folder}
```

## 常见问题

### Docker 启动后打不开页面

先检查容器：

```powershell
docker compose ps
```

再看日志：

```powershell
docker compose logs -f
```

确认访问：

```text
http://127.0.0.1:18080
```

### 容器里访问不到本机 API

如果 API 服务跑在宿主机，不要在页面里写：

```text
http://localhost:端口
```

Docker 容器里的 `localhost` 指的是容器自己。应改成：

```text
http://host.docker.internal:端口
```

### Ollama 本地模型能用，云端模型看不到

这是正常的。`11434` 的 Ollama 本机 API 通常只列本地模型。

如果要使用已登录 Ollama 应用里的云端模型，请启动：

```powershell
python ollama_cli_gateway.py
```

然后在页面中选择 `Ollama 应用网关`。

### API 测试成功，但生成失败

可能原因：

- 模型输出不是合法 JSON。
- 任务内容太长，模型超时。
- API 服务限流或网络中断。
- Ollama 云端模型首次响应较慢。

建议先用较短输入测试，再切换到正式批量生成。

### DOCX 转 PDF 失败

Docker 镜像里已经安装 LibreOffice Writer。若仍失败，查看日志：

```powershell
docker compose logs -f
```

本地 Python 运行时，需要你自己安装 LibreOffice，并确保命令行能找到 `soffice`。

### 中文乱码或字体不对

Docker 镜像里安装了 `fonts-noto-cjk`。如果 PDF 仍显示异常，检查模板本身字体，建议使用常见中文字体或 Noto CJK。

## 安全说明

不要把这些文件上传到公开仓库：

- `.env`
- `config/*.json`
- `config/session-secret.txt`
- `uploads/`
- `outputs/`
- `backups/`

API 密钥会保存在本地配置里。只建议在你自己的电脑或可信服务器上使用。
