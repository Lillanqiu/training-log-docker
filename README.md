# AI Document Form Filler

一个 Docker 化的小工具：上传 PDF、DOCX、TXT 或 MD 文档，填写目标字段和候选选项，然后用 AI 生成表单填写建议。上传 DOCX 训练日志模板时，会生成一份已填写的新 DOCX 下载文件。

## 启动

```powershell
docker compose up --build
```

打开：

```text
http://localhost:18080
```

## 页面上的 API 配置

每次生成时都可以在页面里填写：

- 兼容格式：`OpenAI 兼容 / Chat Completions` 或 `Ollama / 本地模型`
- API 地址：
  - OpenAI 官方：`https://api.openai.com/v1`
  - 其他 OpenAI 兼容平台：填写该平台的 `/v1` 地址
  - Ollama：`http://host.docker.internal:11434`
- API 密钥：OpenAI 兼容接口通常必填；Ollama 可留空
- 模型：例如 `gpt-4.1-mini`、`deepseek-chat`、`qwen2.5:7b`

点击“保存配置”或勾选“本次生成后保存 API 配置”后，配置会保存到 `config/api-config.json`。这会以明文保存 API 密钥，只建议在你自己的本机或可信服务器上使用。

## 也可以用环境变量默认配置

复制 `.env.example` 为 `.env`，然后填写：

```text
AI_API_KEY=your_api_key_here
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4.1-mini
```

如果页面没有填写 API 配置，后端会使用 `.env` 里的值。

## 读取每月训练要求网址

页面里的“每日/每月任务文档链接”支持 `http://` 或 `https://`。后端会读取该网址返回的文本、HTML 或 JSON，先把本月训练计划导入成可勾选对象，再按你勾选的对象创建训练日志。

如果 Docker 里访问本机服务，例如本机有一个要求页面跑在 `http://localhost:3000`，在页面里应填写：

```text
http://host.docker.internal:3000
```

推荐流程：

1. 上传训练日志 DOCX 模板
2. 粘贴每日/每月任务文档链接
3. 点击“导入训练计划”
4. 勾选要生成训练日志的对象
5. 点击“生成并写入”

勾选“根据网址内容批量创建多份训练日志”后，系统会使用已导入并勾选的对象。上传 DOCX 模板时，后端会为每条记录生成一份 DOCX，并打包成 ZIP 下载。

如果是金山文档、腾讯文档等在线文档链接，需要确保链接可以公开访问且页面能返回可读取文本。若链接需要登录、权限不足或只通过前端脚本渲染，Docker 后端可能读取不到正文；这种情况下请把文档导出为 DOCX/PDF/TXT 后上传，或提供可公开下载的链接。

## 字段格式

支持简单文本格式：

```text
姓名
性别: 男, 女
训练目标: 增肌, 减脂, 体能提升
是否有伤病: 是, 否
每周训练频率: 1-2次, 3-4次, 5次以上
```

也支持 JSON：

```json
[
  {"name": "姓名"},
  {"name": "性别", "options": ["男", "女"]},
  {"name": "训练目标", "options": ["增肌", "减脂", "体能提升"]}
]
```

字段也可以留空。上传 DOCX 模板时，系统会尝试从表格中自动识别字段，例如：

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

## 返回格式

后端返回的核心结果是：

```json
{
  "answers": [
    {
      "name": "字段名",
      "value": "建议填写值或选项",
      "confidence": 0.85,
      "reason": "简短依据"
    }
  ]
}
```

未配置 AI 密钥时，系统会使用本地关键词匹配兜底，方便先验证上传和字段流程。

## DOCX 写入

上传 DOCX 后，后端会根据生成结果写入模板：

- 横向表头表格：例如 `日期 / 星期 / 时间 / 模块 / 训练计划 / 负责教练`，写入表头下方第一条空行；没有空行时新增一行
- 标签式模板：例如 `日期：____`、`训练内容`、`学习笔记`、`总结`，写入相邻空格或对应内容区域

接口响应里的 `download_url` 是已填写 DOCX 的下载地址。
# 公开仓库安全说明

不要把本机运行数据提交到 GitHub。仓库已通过 `.gitignore` 忽略这些路径：

- `.env` 和其他本地环境变量文件
- `config/*.json`、`config/session-secret.txt`
- `uploads/`、`outputs/`
- `backups/`
- `app/reference_docs/`

需要配置时，复制 `.env.example` 和 `config/*.example.json`，再填入自己的 API 密钥、用户密码哈希和会话密钥。
