# 快速开始指南

## 第一步：下载个人照片

1. 访问 Google Scholar 页面：https://scholar.google.com/citations?user=2O8Mr0oAAAAJ
2. 找到个人照片，右键点击并选择"另存为"
3. 将图片保存到 `assets/images/` 目录，命名为 `profile.jpg`
4. 建议图片尺寸：至少 400x400 像素

## 第二步：本地预览网站

### 方法一：直接打开（最简单）
1. 在文件管理器中找到 `index.html`
2. 双击打开，会在默认浏览器中显示

### 方法二：使用本地服务器（推荐）
```bash
# 使用 Python 3
python3 -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000

# 或使用 Node.js (需要先安装 http-server)
npx http-server
```

然后在浏览器中访问：http://localhost:8000

## 第三步：自定义内容

所有内容都基于 `CV_Dongran Zhai.md` 文件。如需更新：

1. **更新个人信息**：编辑各个 HTML 文件中的内容
2. **更新论文列表**：编辑 `publications.html`
3. **更新研究经历**：编辑 `experience.html` 和 `research.html`
4. **修改样式**：编辑 `assets/css/` 目录下的 CSS 文件

## 第四步：部署网站

### GitHub Pages（免费，推荐）
1. 在 GitHub 上创建新仓库
2. 将所有文件推送到仓库
3. 在仓库 Settings > Pages 中：
   - Source: 选择 main 分支
   - Folder: 选择 / (root)
4. 等待几分钟，网站将在 `https://[用户名].github.io/[仓库名]` 可用

### Netlify（免费）
1. 访问 https://www.netlify.com
2. 注册/登录账号
3. 将项目文件夹拖拽到 Netlify 部署区域
4. 网站将自动部署并获得一个免费域名

### Vercel（免费）
1. 访问 https://vercel.com
2. 连接 GitHub 仓库
3. 自动部署完成

## 文件结构说明

```
Doris-个人网站/
├── index.html              # 首页
├── research.html           # 研究页面
├── publications.html        # 论文页面
├── experience.html         # 经历页面
├── awards.html             # 荣誉页面
├── contact.html            # 联系页面
├── assets/
│   ├── css/                # 样式文件
│   ├── js/                 # JavaScript 文件
│   └── images/             # 图片资源
└── README.md               # 项目说明
```

## 常见问题

### Q: 个人照片不显示？
A: 请确保已将照片保存为 `assets/images/profile.jpg`。如果图片路径正确但仍不显示，检查浏览器控制台是否有错误信息。

### Q: 如何修改网站颜色？
A: 编辑 `assets/css/main.css` 文件，修改 `:root` 中的 CSS 变量。

### Q: 如何添加新页面？
A: 
1. 创建新的 HTML 文件
2. 复制现有页面的基本结构
3. 在导航栏中添加链接（编辑所有 HTML 文件的 `<nav>` 部分）

### Q: 移动端显示不正常？
A: 网站已包含响应式设计。如果仍有问题，检查 `assets/css/responsive.css` 文件。

## 技术支持

如有问题，请检查：
1. 浏览器控制台是否有错误（按 F12 打开开发者工具）
2. 文件路径是否正确
3. 所有 CSS 和 JS 文件是否已正确链接

## 下一步

- [ ] 下载并添加个人照片
- [ ] 检查所有页面内容是否正确
- [ ] 测试移动端显示
- [ ] 部署到 GitHub Pages 或其他平台
- [ ] 分享网站链接

祝使用愉快！
