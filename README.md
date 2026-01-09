# Dongran Zhai 个人学术网站项目

## 项目概述

本项目旨在为Dongran Zhai博士创建一个专业的个人学术网站，用于展示其学术履历、研究成果、教学经验以及联系方式。网站设计将注重清晰性和专业性，便于访客快速了解其学术背景和研究贡献。

## 技术栈建议

### 方案一：静态网站（推荐）
- **HTML5 + CSS3 + JavaScript**：轻量级，易于部署和维护
- **框架选择**：
  - 纯HTML/CSS/JS（简单直接）
  - 或使用现代静态网站生成器：
    - **Jekyll**（GitHub Pages友好）
    - **Hugo**（快速构建）
    - **Next.js**（React框架，适合需要交互功能）

### 方案二：响应式框架
- **Bootstrap** 或 **Tailwind CSS**：快速构建响应式设计
- **Font Awesome**：图标库

## 项目结构

```
Doris-个人网站/
├── README.md                    # 项目说明文档（本文件）
├── CV_Dongran Zhai.md          # 原始CV文件（Markdown格式）
│
├── index.html                   # 网站首页（个人简介、导航）
├── research.html                # 研究成果页面
├── publications.html            # 发表论文详细页面
├── experience.html              # 研究经历与教学经验页面
├── awards.html                  # 获奖与荣誉页面
├── contact.html                 # 联系方式页面
│
├── assets/                      # 静态资源文件夹
│   ├── images/                  # 图片资源
│   │   ├── profile.jpg          # 个人照片（从Google Scholar获取）
│   │   ├── profile.webp         # 优化后的个人照片（可选）
│   │   └── research/            # 研究相关图片
│   │       └── (研究图表、项目图片等)
│   ├── css/                     # 样式表
│   │   ├── main.css             # 主样式表
│   │   ├── components.css       # 组件样式
│   │   └── responsive.css       # 响应式样式
│   ├── js/                      # JavaScript文件
│   │   ├── main.js              # 主脚本
│   │   ├── navigation.js        # 导航功能
│   │   └── publications.js     # 论文列表交互（如需要）
│   └── fonts/                   # 字体文件（如需要自定义字体）
│
├── data/                        # 数据文件（可选，用于动态加载内容）
│   ├── publications.json        # 论文数据（JSON格式）
│   └── experience.json          # 经历数据（JSON格式）
│
├── docs/                        # 文档文件夹（可选）
│   └── deployment.md            # 部署说明
│
└── .gitignore                   # Git忽略文件配置
```

## 功能模块设计

### 1. 首页 (index.html)
**主要内容：**
- 个人照片（从Google Scholar获取）
- 姓名、职位、所属机构
- 简短的个人简介（2-3段）
- 联系方式快速链接（邮箱、Google Scholar、ORCID）
- 导航菜单
- 最新研究成果亮点（3-5篇重要论文）

**设计要点：**
- 简洁大方的布局
- 突出个人照片和基本信息
- 清晰的导航结构

### 2. 研究成果页面 (research.html)
**主要内容：**
- 研究领域概述
- 主要研究方向：
  - 海洋叶绿素检测与归因
  - 气候变化对海洋生态系统的影响
  - 卫星遥感数据分析
  - 贝叶斯统计建模
- 研究项目时间线
- 关键研究成果摘要

### 3. 发表论文页面 (publications.html)
**主要内容：**
- 按年份倒序排列的论文列表
- 论文分类：
  - 已发表（Published）
  - 修订中（Under Revision）
  - 准备中（In Preparation）
- 每篇论文包含：
  - 标题
  - 作者列表（高亮本人）
  - 期刊/会议名称
  - 发表年份
  - DOI链接（如有）
  - 摘要（可选）
- 专利列表
- 引用统计（从Google Scholar获取，可选）

### 4. 经历与教学页面 (experience.html)
**主要内容：**
- **教育背景**（时间线形式）
  - 博士学位（UCSC, 2020-2025）
  - 硕士学位（UCSC, 2019-2020）
  - 交换生经历（台湾海洋大学, 2017-2018）
  - 本科学位（南通大学, 2015-2019）
- **工作经历**
  - 清华大学博士后（2026-至今）
  - UCSC研究助理（2025-2026）
- **研究经历**（详细描述）
- **教学经验**（助教课程列表）
- **指导经验**（指导学生项目）

### 5. 获奖与荣誉页面 (awards.html)
**主要内容：**
- 按年份倒序排列的奖项
- 奖学金列表
- 学术荣誉
- 服务与领导经历

### 6. 联系方式页面 (contact.html)
**主要内容：**
- 邮箱：dr.jiang.zhai@gmail.com
- 所属机构：清华大学水利工程系（当前）
- Google Scholar链接
- ORCID链接
- 社交媒体链接（如有）
- 联系表单（可选）

## 内容来源

### 个人照片
- **来源**：Google Scholar个人页面
- **URL**：https://scholar.google.com/citations?user=2O8Mr0oAAAAJ
- **保存位置**：`assets/images/profile.jpg`
- **获取方式**：从Google Scholar页面下载个人照片，建议尺寸至少400x400像素

### CV内容
- **文件位置**：`CV_Dongran Zhai.md`
- **格式**：Markdown
- **用途**：作为网站内容的数据源，所有信息应基于此CV文件

## 开发步骤

### 阶段一：项目初始化
1. 创建项目目录结构
2. 设置Git仓库（如需要版本控制）
3. 创建基础HTML文件框架
4. 下载并保存个人照片

### 阶段二：内容开发
1. 从CV文件中提取信息
2. 编写各页面的HTML内容
3. 创建CSS样式文件，实现响应式设计
4. 添加必要的JavaScript交互功能

### 阶段三：样式设计
1. 选择配色方案（建议：学术风格，蓝色/深色系）
2. 设计导航栏和页眉页脚
3. 实现响应式布局（移动端适配）
4. 优化字体和排版

### 阶段四：功能实现
1. 实现平滑滚动导航
2. 添加论文列表的筛选/搜索功能（可选）
3. 实现联系表单（如需要）
4. 添加Google Scholar引用统计集成（可选）

### 阶段五：测试与优化
1. 跨浏览器测试
2. 移动端响应式测试
3. 页面加载速度优化
4. SEO优化（添加meta标签等）

### 阶段六：部署
1. 选择托管平台（GitHub Pages、Netlify、Vercel等）
2. 配置域名（可选）
3. 设置HTTPS
4. 提交并发布

## 设计建议

### 视觉风格
- **配色**：深蓝色/海军蓝作为主色调，体现海洋科学主题
- **字体**：使用易读的无衬线字体（如Inter、Roboto、Open Sans）
- **布局**：简洁、专业，避免过度装饰
- **图片**：高质量，适当使用研究相关的科学图表

### 响应式设计
- 移动端优先（Mobile First）
- 断点设置：
  - 移动端：< 768px
  - 平板：768px - 1024px
  - 桌面：> 1024px

### 可访问性
- 使用语义化HTML标签
- 添加alt属性到所有图片
- 确保足够的颜色对比度
- 支持键盘导航

## 部署选项

### 1. GitHub Pages（免费，推荐）
- 适合静态网站
- 自动HTTPS
- 自定义域名支持
- 部署步骤：
  1. 创建GitHub仓库
  2. 推送代码到仓库
  3. 在Settings > Pages中启用GitHub Pages
  4. 选择main分支作为源

### 2. Netlify（免费）
- 自动部署
- 表单处理支持
- 更灵活的构建选项

### 3. Vercel（免费）
- 适合Next.js项目
- 快速CDN
- 自动优化

## 维护与更新

### 定期更新内容
- 新发表的论文
- 新的研究项目
- 更新的联系方式
- 新的获奖信息

### 建议更新频率
- 论文发表：及时更新
- 其他信息：每学期或每半年更新一次

## 技术参考

### 有用的资源
- [Google Scholar API](https://scholar.google.com/) - 获取引用统计（需手动或使用第三方工具）
- [ORCID API](https://info.orcid.org/documentation/api-tutorials/api-tutorial-get-and-authenticated-orcid-id/) - 集成ORCID信息
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 免费字体

### 代码规范
- 使用语义化HTML5标签
- CSS使用BEM命名规范（可选）
- JavaScript遵循ES6+标准
- 代码注释清晰

## 项目状态

- [ ] 项目结构创建
- [ ] HTML页面框架
- [ ] CSS样式设计
- [ ] 内容填充
- [ ] 响应式设计实现
- [ ] 功能测试
- [ ] 部署上线

## 联系方式

如有问题或建议，请联系：
- 项目维护者：[您的联系方式]

---

**最后更新**：2025年1月

**项目版本**：1.0.0
