# 项目结构说明

## 后端 (backend.py)

- 使用Flask框架提供Web服务
- 使用pynput库模拟键盘输入
- 实现了粘滞键功能
- 提供了前端页面和API接口

## 前端

- 前端页面直接嵌入在后端代码中，通过访问根路径`/`即可获取
- 使用原生HTML/CSS/JavaScript实现
- 实现了标准QWERTY键盘布局
- 支持触摸和鼠标操作
- 实现了粘滞键的UI反馈

## 运行方式

1. 安装依赖：`pip install flask pynput`
2. 运行后端：`python backend.py`
3. 访问前端：在浏览器中打开 `http://localhost:8000`


