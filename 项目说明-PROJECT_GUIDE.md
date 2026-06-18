# AI 训练日志填写工具 — 项目说明

> 本文档梳理项目的用途、架构、关键文件与全部参数,帮助快速、清晰地理解整个系统。

## 一、这是什么

**AI 训练日志填写工具**(代号 `ai-form-filler`)是一个**本地运行的 Web 应用**。

核心用途:读取你的"训练计划"(来源可以是 Excel、网页链接,或手动输入),调用 AI 大模型自动生成训练日志正文,再把内容**写入 DOCX 模板**,最后导出为 DOCX / PDF / 文件夹 / ZIP。

技术栈:**FastAPI(Python 后端)+ 原生 HTML/JS 前端**。推荐用 **Docker** 运行(镜像内自带 LibreOffice 做 DOCX→PDF 转换,自带中文字体)。默认访问地址:`http://127.0.0.1:18080`。

## 二、整体数据流

理解了这条主线,就理解了整个系统:

```
训练计划(Excel / 链接 / 手动输入)  +  DOCX 模板
            │
            ▼
   解析  →  拼成 prompt(JSON)  →  调用 AI
            │                       (OpenAI 兼容 / Ollama / Ollama 网关)
            ▼
   AI 返回 JSON(answers / records)
            │
            ▼
   把字段值写回 DOCX 模板的表格 / 标签位置
            │
            ▼
   导出 DOCX 或转 PDF  →  单文件下载 / 文件夹 / ZIP
            │
            ▼
   写入历史记录(config/generation-history.json,含耗时、token、下载链接)
```

## 三、关键文件作用

| 文件 / 目录 | 作用 |
|---|---|
| `app/main.py` | **唯一核心后端**(约 4200 行)。所有 API、AI 调用、DOCX 读写、用户登录、历史记录都在这里 |
| `app/templates/index.html` + `app/static/*.js` | 前端页面与交互(`api-presets.js` 是 API 快速配置预设,`secret-toggle.js` 控制密钥显隐) |
| `app/templates_docx/default-training-log.docx` | 内置默认模板(用户留空模板时使用) |
| `app/reference_docs/module_c/*.docx` | C 模块的参考资料文档 |
| `ollama_cli_gateway.py` | 独立的本机网关(约 160 行),把请求转发给本机已登录的 `ollama.exe`,用来跑云端模型(如 `gemma4:31b-cloud`) |
| `config/` | 运行时配置(用户、API 密钥、登录开关、历史)。**含密钥,不能上传 Git** |
| `outputs/` / `uploads/` | 生成结果 / 上传的临时文件 |
| `Dockerfile` / `docker-compose.yml` | 镜像构建与本地服务编排 |
| `requirements.txt` | Python 依赖(fastapi、uvicorn、httpx、pypdf、python-docx、openpyxl 等) |

## 四、参数详解

### 1. 环境变量(`.env`,全局默认)

| 参数 | 含义 |
|---|---|
| `AI_API_KEY` | 默认 API 密钥(网页里保存的用户配置优先级更高) |
| `AI_BASE_URL` | 默认 API 地址,如 `https://api.openai.com/v1` |
| `AI_MODEL` | 默认模型,如 `gpt-4.1-mini` |
| `SESSION_SECRET` | 会话签名密钥(登录 cookie 用) |
| `DEFAULT_ADMIN_USERNAME` / `DEFAULT_ADMIN_PASSWORD_HASH` | 没有 `users.json` 时,用环境变量创建默认管理员(密码用 SHA-256 哈希) |
| `OPENAI_REQUEST_TIMEOUT_SECONDS` | OpenAI 请求超时,默认 **300 秒** |
| `OLLAMA_REQUEST_TIMEOUT_SECONDS` | Ollama 请求超时,默认 **900 秒**(本地模型较慢) |

### 2. API 配置(每个用户独立,保存在 `config/api-config-用户名.json`)

| 字段 | 含义 |
|---|---|
| `format` | 只支持两种:`openai`(OpenAI 兼容 / DeepSeek / vLLM / LM Studio 等)或 `ollama` |
| `base_url` | API 地址。**容器内访问宿主机服务要写 `http://host.docker.internal:端口`,不能写 localhost** |
| `api_key` | 密钥(Ollama 可留空) |
| `model` | 模型名 |
| `gpu_model` | 指定 GPU(用于 Ollama 多卡场景) |

### 3. 生成请求参数(`/api/fill` 表单字段)

这是"填写"时真正起作用的参数。

**核心输入**

| 参数 | 含义 |
|---|---|
| `file` | 上传的 DOCX 模板(留空用内置模板) |
| `requirements_text` / `requirements_url` | 训练要求正文,或从链接抓取 |
| `requirements_cookie` / `requirements_user_agent` / `requirements_referer` | 抓取需登录态网页时附带的请求头 |
| `selected_records` | 从 Excel 解析后**勾选要生成的记录**(JSON) |
| `custom_prompt` | 自定义提示词 |
| `custom_skills` | 自定义技能(逐行,每行一个) |

**填充默认值(批量时统一套用)**

| 参数 | 含义 |
|---|---|
| `start_date` | 起始日期 |
| `default_coach` | 负责教练 |
| `default_writer` | 填写人 |
| `manual_module` / `manual_training_content` | 手动填写的模块 / 训练内容 |
| `selected_modules` | 选中的模块 |
| `link_module_teacher` | 是否按模块联动授课老师 |
| `module_a_teacher` / `module_b_teacher` / `module_c_teacher` | 各模块的授课老师 |
| `module_teacher_map` | 模块→老师映射 |

**模式与输出控制**

| 参数 | 含义 |
|---|---|
| `batch_mode` | true = 批量生成,false = 单篇手动 |
| `output_format` | `docx` 或 `pdf` |
| `output_package_mode` | `folder`(文件夹)或 `zip` |
| `save_config` | 是否同时保存本次 API 配置 |

## 五、主要 API 端点

| 端点 | 作用 |
|---|---|
| `POST /api/login`、`GET /api/session` | 登录 / 会话状态 |
| `GET /POST /api/config` | 读写当前用户 API 配置 |
| `POST /api/test-api` | 测试 API 连接 |
| `POST /api/models`、`POST /api/gpus` | 列出可用模型 / GPU |
| `POST /api/template-preview` | 识别模板字段并预览 |
| `POST /api/import-plan` | 解析训练计划 Excel |
| `POST /api/fill` | **同步生成**(单篇或小批量) |
| `POST /api/fill-job` + `GET /api/jobs/{id}` | **异步批量任务**(可轮询进度、取消、断点续跑) |
| `GET /download/...`、`/download-folder-zip/...` | 下载文件 / 打包 ZIP |

## 六、AI 调用的工作方式(关键细节)

- prompt 被组装成一个 **JSON 字符串**(`build_prompt` / `build_batch_prompt`),内含 `fields`(要填的字段)、`monthly_requirements`(要求)、`document_text`(模板文本)、`custom_prompt`/`custom_skills`,并要求模型**只返回合法 JSON**。
- 温度固定 `temperature: 0.1`(追求稳定输出)。
- 模型返回的 JSON 被解析为 answers,再由 `fill_docx_*` 系列函数智能识别模板里的**表格表头**(日期 / 星期 / 模块 …)和**标签字段**(训练内容 / 学习笔记 / 总结),把值写进对应位置。
- 若选 OpenAI 格式但未填 key,会退化为本地**启发式生成**(`heuristic_answers`,不调模型)。
- Ollama 批量时若返回不是合法 JSON,会**自动做 1 次格式修复重试**。

## 七、多用户与配置

运行时配置都在 `config/` 目录:

- `config/users.json` — 用户列表(用户名、显示名、密码 SHA-256 哈希)
- `config/auth-settings.json` — 是否需要登录(`require_password`)
- `config/api-config-用户名.json` — 每个用户独立的 API 配置
- `config/session-secret.txt` — 会话密钥
- `config/generation-history.json` — 生成历史

未开启登录时使用内置访客用户 `guest`。历史记录优先按登录账号隔离,未登录时按"填写人"区分。

## 八、安全注意

不要把以下内容上传到公开仓库:`.env`、`config/*.json`、`config/session-secret.txt`、`uploads/`、`outputs/`、`backups/`。API 密钥保存在本地配置中,只建议在自己的电脑或可信服务器上使用。
