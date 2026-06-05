# 用户登录和账号配置

这个项目支持多用户。每个用户可以有自己的 API 配置、模型配置和生成设置。

运行时用户配置保存在：

```text
config/users.json
```

这个文件会被 Git 忽略，不要上传到公开仓库。

## 首次准备用户配置

复制示例文件：

```powershell
Copy-Item config/users.example.json config/users.json
```

如果没有 `users.json`，系统也可以通过环境变量创建默认管理员。

## users.json 格式

示例：

```json
[
  {
    "username": "admin",
    "display_name": "管理员",
    "password_hash": "这里填写 SHA-256 哈希",
    "password": ""
  },
  {
    "username": "student1",
    "display_name": "学生 1",
    "password_hash": "这里填写 SHA-256 哈希",
    "password": ""
  }
]
```

字段说明：

- `username`：登录用户名，建议只使用英文、数字、短横线或下划线。
- `display_name`：页面显示名称。
- `password_hash`：密码的 SHA-256 哈希，推荐使用。
- `password`：明文密码，不推荐，只适合本机临时测试。

推荐只填写 `password_hash`，不要保存明文密码。

## 生成密码 SHA-256

PowerShell 示例：

```powershell
$password = "你的密码"
$bytes = [System.Text.Encoding]::UTF8.GetBytes($password)
$hash = [System.Security.Cryptography.SHA256]::HashData($bytes)
[Convert]::ToHexString($hash).ToLower()
```

把输出结果填入 `password_hash`。

## 通过环境变量创建默认管理员

`.env` 中可以配置：

```text
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD_HASH=replace_with_sha256_hash
```

如果你只是本机临时测试，也可以使用明文密码环境变量：

```text
DEFAULT_ADMIN_PASSWORD=your_password
```

但不建议长期使用明文密码。

## 登录开关

是否需要登录密码保存在：

```text
config/auth-settings.json
```

示例：

```json
{
  "require_password": true
}
```

含义：

- `true`：进入系统需要登录。
- `false`：免登录，系统使用访客用户。

页面设置里也可以切换“进入系统需要登录密码”。

## 访客用户

如果 `require_password` 为 `false`，系统会使用内置访客用户：

```text
username: guest
display_name: 免登录用户
```

访客用户的 API 配置会保存为：

```text
config/api-config-guest.json
```

## 每个用户的 API 配置

每个用户的 API 配置会分别保存：

```text
config/api-config-用户名.json
```

例如：

```text
config/api-config-admin.json
config/api-config-student1.json
config/api-config-guest.json
```

这些文件可能包含 API 密钥，所以同样不要上传到公开仓库。

## 配置备份

页面设置里有“配置备份”区域，可以：

- 导出配置。
- 导入配置。

备份内容可能包含：

- 当前用户 API 配置。
- 登录设置。
- 内置模板。
- 生成要求配置。

如果备份文件包含 API 密钥，请只保存在可信位置。

## 修改用户后如何生效

修改 `config/users.json` 后，建议重启服务：

```powershell
docker compose up -d
```

如果改了 `.env` 或 Docker 构建相关内容，可以重建：

```powershell
docker compose up --build -d
```

## 常见问题

### 忘记密码怎么办

如果你还能访问项目目录，可以重新生成一个密码哈希，然后修改 `config/users.json` 里的 `password_hash`。

### 想临时关闭登录

修改：

```text
config/auth-settings.json
```

改成：

```json
{
  "require_password": false
}
```

然后重启服务：

```powershell
docker compose up -d
```

### 多个用户会共享 API 密钥吗

不会。每个用户有自己的 `api-config-用户名.json`。

但如果你使用 `.env` 里的默认 `AI_API_KEY`，那是全局默认配置。页面中保存的用户配置优先级更高。

### 可以把 users.json 提交到 Git 吗

不建议。即使只存密码哈希，也不建议提交。仓库已经通过 `.gitignore` 忽略 `config/*.json`。

