# LikeCleanUp Chrome 扩展

这是一个用于自动化清理小红书点赞的 Chrome 扩展，使用 Manifest V3 开发。

## 功能特点

- 自动点击点赞按钮
- 随机延迟操作以模拟人工行为
- Chrome 存储 API 集成
- 活动标签页 API 使用
- 现代化界面设计

## 安装步骤

1. 克隆或下载此仓库
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 在右上角启用"开发者模式"
4. 点击"加载已解压的扩展程序"并选择扩展目录

## 开发文件

扩展包含以下文件：
- `manifest.json`: 扩展配置文件
- `popup.html`: 弹出窗口界面
- `popup.js`: 包含 jQuery 集成的功能代码
- `jquery-3.7.1.min.js`: jQuery 库用于 DOM 操作
- `icons/`: 扩展图标文件夹

## 工作原理

扩展程序会：
1. 将 jQuery 注入目标网页
2. 自动点击第三个标签页内容中的点赞按钮
3. 添加随机延迟以避免被检测
4. 按顺序处理所有笔记项目

## 所需权限

扩展需要以下权限：
- `storage`: 用于使用 Chrome 存储 API
- `activeTab`: 用于访问当前标签页
- `scripting`: 用于在网页中注入和执行脚本
- `host_permissions`: 用于访问目标网站

## 测试方法

1. 修改代码
2. 访问 `chrome://extensions/`
3. 点击扩展卡片上的刷新图标
4. 点击浏览器工具栏中的扩展图标测试更改 