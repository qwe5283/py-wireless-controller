# Python无线键盘控制器

一个基于Web的虚拟键盘控制器，允许您通过浏览器控制计算机键盘。支持触摸屏设备，特别适合在平板电脑或手机上使用。

## 功能特性

- **虚拟键盘**: 完整的QWERTY键盘布局，包含功能键、数字键、控制键等
- **粘滞键支持**: 在通用模式下支持Ctrl、Alt、Shift、Win等粘滞键操作
- **双模式操作**: 
  - 通用模式：启用粘滞键特性，适合常规文本输入
  - 仿真模式：直接模拟按键按下/释放，适合游戏或特殊应用
- **响应式设计**: 适配各种屏幕尺寸，支持触摸操作
- **全屏模式**: 提供沉浸式键盘体验
- **双键盘布局**: 可在功能键布局和数字键布局之间切换

## 项目结构

```
py-wireless-controller/
├── backend.py          # Flask后端服务
├── frontend/           # 前端静态文件
│   ├── index.html      # 主页面
│   ├── script.js       # JavaScript逻辑
│   └── style.css       # 样式文件
├── README.md           # 项目说明文档
└── LICENSE             # 开源许可证
```

## 快速开始

### 安装依赖

```bash
pip install flask pynput flask-cors
```

### 运行服务

```bash
python backend.py
```

默认情况下，服务器将在 `http://localhost:8000` 上运行。

### 访问界面

在浏览器中打开 `http://localhost:8000` 即可使用虚拟键盘。

## 使用说明

### 操作模式

1. **通用模式（默认）**:
   - Ctrl、Alt、Shift、Win等修饰键具有粘滞功能
   - 单击修饰键激活，再次单击锁定，第三次单击释放
   - 其他按键会自动与激活的修饰键组合

2. **仿真模式**:
   - 所有按键行为与物理键盘一致
   - 按下时发送按下事件，释放时发送释放事件
   - 适合游戏或需要精确按键控制的场景

### 键盘布局

- 点击"数字键"/"功能键"按钮可在两种键盘布局间切换
- 点击"仿真模式"/"通用模式"按钮可切换操作模式
- 点击"进入全屏"/"退出全屏"按钮可切换全屏模式

## API接口

### 发送按键事件

```
POST /keypress
```

请求体:
```json
{
  "key": "a",
  "action": "down",
  "mode": "general"
}
```

### 获取粘滞键状态

```
GET /sticky_keys
```

响应:
```json
{
  "leftshift": "inactive",
  "rightshift": "locked",
  "leftctrl": "active",
  "rightctrl": "inactive",
  "leftalt": "inactive",
  "rightalt": "inactive",
  "win": "inactive"
}
```

## 开发

### 技术栈

- **后端**: Python + Flask
- **前端**: HTML5 + CSS3 + 原生JavaScript
- **键盘模拟**: pynput库

### 项目特点

- 前后端一体化设计，部署简单
- 支持跨域请求，便于集成
- 实时状态反馈和错误处理
- 支持多种操作系统（Windows、macOS、Linux）

## 部署

### 作为系统服务运行

您可以将此应用配置为系统服务，以便在系统启动时自动运行。

### 自定义端口

```bash
python backend.py --port 8080
```

## 安全说明

- 该应用直接控制您的键盘，仅应在受信任的网络环境中使用
- 建议不要在公共网络上暴露此服务
- 默认绑定到所有网络接口，可根据需要修改绑定地址

## 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！