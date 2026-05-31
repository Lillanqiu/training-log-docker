# 多用户登录

运行时用户配置保存在 `config/users.json`，这个文件会被 Git 忽略，不要上传到公开仓库。

首次部署可以复制示例文件：

```powershell
Copy-Item config/users.example.json config/users.json
```

建议只填写 `password_hash`，不要在仓库里保存明文密码。`password_hash` 是密码的 SHA-256 值。

每个用户的 API 配置会分别保存为 `config/api-config-用户名.json`，这些文件同样会被 Git 忽略，因为里面可能包含 API 密钥。
