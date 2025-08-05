// 粘滞键状态管理
const stickyKeys = {
    'leftshift': 'inactive',
    'rightshift': 'inactive',
    'leftctrl': 'inactive',
    'rightctrl': 'inactive',
    'leftalt': 'inactive',
    'rightalt': 'inactive',
    'win': 'inactive'
};

// 当前键盘模式（默认为数字键模式）
let currentMode = 'number';

// 当前操作模式（默认为通用模式）
let operationMode = 'general'; // 'general' 或 'simulation'

// 功能键布局定义
const functionKeyLayout = [
    { key: 'esc', label: 'Esc', classes: 'function' },
    { key: 'f1', label: 'F1', classes: 'function' },
    { key: 'f2', label: 'F2', classes: 'function' },
    { key: 'f3', label: 'F3', classes: 'function' },
    { key: 'f4', label: 'F4', classes: 'function' },
    { key: 'f5', label: 'F5', classes: 'function' },
    { key: 'f6', label: 'F6', classes: 'function' },
    { key: 'f7', label: 'F7', classes: 'function' },
    { key: 'f8', label: 'F8', classes: 'function' },
    { key: 'f9', label: 'F9', classes: 'function' },
    { key: 'f10', label: 'F10', classes: 'function' },
    { key: 'f11', label: 'F11', classes: 'function' },
    { key: 'f12', label: 'F12', classes: 'function' }
];

// 数字键布局定义
const numberKeyLayout = [
    { key: '`', label: '`', classes: 'function' },
    { key: '1', label: '1', classes: 'function' },
    { key: '2', label: '2', classes: 'function' },
    { key: '3', label: '3', classes: 'function' },
    { key: '4', label: '4', classes: 'function' },
    { key: '5', label: '5', classes: 'function' },
    { key: '6', label: '6', classes: 'function' },
    { key: '7', label: '7', classes: 'function' },
    { key: '8', label: '8', classes: 'function' },
    { key: '9', label: '9', classes: 'function' },
    { key: '0', label: '0', classes: 'function' },
    { key: '-', label: '-', classes: 'function' },
    { key: '=', label: '=', classes: 'function' }
];

// 键盘布局定义
const keyboardLayout = [
    [
        // 功能键占位，将在createKeyboard中替换
        { key: 'esc', label: 'Esc', classes: 'function' },
        { key: 'f1', label: 'F1', classes: 'function' },
        { key: 'f2', label: 'F2', classes: 'function' },
        { key: 'f3', label: 'F3', classes: 'function' },
        { key: 'f4', label: 'F4', classes: 'function' },
        { key: 'f5', label: 'F5', classes: 'function' },
        { key: 'f6', label: 'F6', classes: 'function' },
        { key: 'f7', label: 'F7', classes: 'function' },
        { key: 'f8', label: 'F8', classes: 'function' },
        { key: 'f9', label: 'F9', classes: 'function' },
        { key: 'f10', label: 'F10', classes: 'function' },
        { key: 'f11', label: 'F11', classes: 'function' },
        { key: 'f12', label: 'F12', classes: 'function' },
        { key: 'backspace', label: '⌫', classes: 'control' }
    ],
    [
        { key: 'tab', label: 'Tab', classes: 'control' },
        { key: 'q', label: 'Q' },
        { key: 'w', label: 'W' },
        { key: 'e', label: 'E' },
        { key: 'r', label: 'R' },
        { key: 't', label: 'T' },
        { key: 'y', label: 'Y' },
        { key: 'u', label: 'U' },
        { key: 'i', label: 'I' },
        { key: 'o', label: 'O' },
        { key: 'p', label: 'P' },
        { key: '[', label: '[' },
        { key: ']', label: ']' },
        { key: '\\', label: '\\' }
    ],
    [
        { key: 'capslock', label: 'Caps', classes: 'control' },
        { key: 'a', label: 'A' },
        { key: 's', label: 'S' },
        { key: 'd', label: 'D' },
        { key: 'f', label: 'F' },
        { key: 'g', label: 'G' },
        { key: 'h', label: 'H' },
        { key: 'j', label: 'J' },
        { key: 'k', label: 'K' },
        { key: 'l', label: 'L' },
        { key: ';', label: ';' },
        { key: "'", label: "'" },
        { key: 'enter', label: 'Enter', classes: 'control' }
    ],
    [
        { key: 'leftshift', label: 'Shift', classes: 'shift' },
        { key: 'z', label: 'Z' },
        { key: 'x', label: 'X' },
        { key: 'c', label: 'C' },
        { key: 'v', label: 'V' },
        { key: 'b', label: 'B' },
        { key: 'n', label: 'N' },
        { key: 'm', label: 'M' },
        { key: ',', label: ',' },
        { key: '.', label: '.' },
        { key: '/', label: '/' },
        { key: 'rightshift', label: 'Shift', classes: 'shift' }
    ],
    [
        { key: 'leftctrl', label: 'Ctrl' },
        { key: 'win', label: 'Win' },
        { key: 'leftalt', label: 'Alt' },
        { key: 'space', label: 'Space', classes: 'space' },
        { key: 'rightalt', label: 'Alt' },
        { key: 'win', label: 'Win' },
        { key: 'rightctrl', label: 'Ctrl' }
    ],
    [
        { key: 'arrowleft', label: '←', classes: 'arrow' },
        { key: 'arrowup', label: '↑', classes: 'arrow' },
        { key: 'arrowdown', label: '↓', classes: 'arrow' },
        { key: 'arrowright', label: '→', classes: 'arrow' }
    ]
];

// 创建键盘UI
function createKeyboard() {
    const keyboardElement = document.getElementById('keyboard');
    keyboardElement.innerHTML = '';

    // 根据当前模式选择功能键布局
    const functionKeys = currentMode === 'function' ? functionKeyLayout : numberKeyLayout;

    keyboardLayout.forEach((row, rowIndex) => {
        row.forEach((keyDef, colIndex) => {
            // 如果是功能键位置（ESC-F12），则使用当前模式的键布局
            let actualKeyDef = keyDef;
            if (rowIndex === 0 && colIndex >= 0 && colIndex <= 12) {
                // F1-F12的位置（索引1-12）
                actualKeyDef = functionKeys[colIndex];
            }

            const keyElement = document.createElement('div');
            keyElement.className = `key ${actualKeyDef.classes || ''}`;
            keyElement.dataset.key = actualKeyDef.key;
            keyElement.textContent = actualKeyDef.label;

            // 在仿真模式下，我们需要跟踪按键状态
            if (operationMode === 'simulation') {
                keyElement.dataset.pressed = 'false';
            }

            keyElement.addEventListener('touchstart', handleKeyPress, { passive: false });
            keyElement.addEventListener('touchend', handleKeyRelease, { passive: false });
            keyElement.addEventListener('mousedown', handleKeyPress);
            keyElement.addEventListener('mouseup', handleKeyRelease);
            keyElement.addEventListener('mouseleave', handleKeyRelease);
            keyboardElement.appendChild(keyElement);
        });
    });

    updateStickyKeyUI();
}

// 切换键盘模式
function toggleKeyboardMode() {
    currentMode = currentMode === 'function' ? 'number' : 'function';
    const modeToggleBtn = document.getElementById('modeToggleBtn');
    modeToggleBtn.textContent = currentMode === 'function' ? '功能键' : '数字键';
    createKeyboard();
}

// 切换操作模式
function toggleOperationMode() {
    operationMode = operationMode === 'general' ? 'simulation' : 'general';
    const simulationModeBtn = document.getElementById('simulationModeBtn');
    simulationModeBtn.textContent = operationMode === 'general' ? '通用模式' : '仿真模式';

    // 在切换到通用模式时，确保所有按键状态重置
    if (operationMode === 'general') {
        document.querySelectorAll('.key').forEach(keyElement => {
            keyElement.dataset.pressed = 'false';
            keyElement.classList.remove('pressed');
        });
    }

    // 更新状态栏显示
    document.getElementById('statusBar').textContent =
        operationMode === 'general' ? '已连接 - 通用模式' : '已连接 - 仿真模式';
}

// 更新粘滞键UI状态
function updateStickyKeyUI() {
    // 只在通用模式下显示粘滞键状态
    if (operationMode === 'general') {
        document.querySelectorAll('.key').forEach(keyElement => {
            const keyName = keyElement.dataset.key;
            if (stickyKeys.hasOwnProperty(keyName)) {
                keyElement.classList.remove('sticky-active', 'sticky-locked');

                if (stickyKeys[keyName] === 'active') {
                    keyElement.classList.add('sticky-active');
                } else if (stickyKeys[keyName] === 'locked') {
                    keyElement.classList.add('sticky-locked');
                }
            }
        });
    }
}

// 处理按键按下
function handleKeyPress(e) {
    e.preventDefault();
    const keyElement = e.target;
    const keyName = keyElement.dataset.key;

    if (operationMode === 'general') {
        // 通用模式：使用粘滞键特性
        keyElement.classList.add('pressed');
        sendKeyEvent(keyName, 'down');
    } else {
        // 仿真模式：模拟按下的行为
        keyElement.classList.add('pressed');
        keyElement.dataset.pressed = 'true';
        sendKeyEvent(keyName, 'down');
    }
}

// 处理按键释放
function handleKeyRelease(e) {
    e.preventDefault();
    const keyElement = e.target;
    const keyName = keyElement.dataset.key;

    if (operationMode === 'general') {
        // 通用模式：使用粘滞键特性
        keyElement.classList.remove('pressed');
        sendKeyEvent(keyName, 'up');
    } else {
        // 仿真模式：模拟释放的行为
        keyElement.classList.remove('pressed');
        keyElement.dataset.pressed = 'false';
        sendKeyEvent(keyName, 'up');
    }
}

// 更新粘滞键状态
async function updateStickyKeyState() {
    // 只在通用模式下更新粘滞键状态
    if (operationMode === 'general') {
        try {
            const response = await fetch('/sticky_keys');
            if (!response.ok) {
                throw new Error('获取粘滞键状态失败');
            }
            const data = await response.json();
            Object.keys(stickyKeys).forEach(key => {
                if (data.hasOwnProperty(key)) {
                    stickyKeys[key] = data[key];
                }
            });
            updateStickyKeyUI();
        } catch (error) {
            console.error('更新粘滞键状态失败:', error);
            document.getElementById('statusBar').textContent = `错误: ${error.message}`;
        }
    }
}

// 发送按键事件到后端
async function sendKeyEvent(key, action) {
    try {
        const response = await fetch('/keypress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key,
                action,
                mode: operationMode  // 发送当前操作模式到后端
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '未知错误');
        }

        // 只在通用模式下更新粘滞键状态
        if (operationMode === 'general') {
            await updateStickyKeyState();
        }
    } catch (error) {
        console.error('发送按键事件失败:', error);
        document.getElementById('statusBar').textContent = `错误: ${error.message}`;
    }
}

// 全屏功能
function toggleFullscreen() {
    const elem = document.documentElement;
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    if (!document.fullscreenElement) {
        // 进入全屏
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
        fullscreenBtn.textContent = '退出全屏';
    } else {
        // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        fullscreenBtn.textContent = '进入全屏';
    }
}

// 监听全屏状态变化
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
document.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
document.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE/Edge

function handleFullscreenChange() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) {
        fullscreenBtn.textContent = '退出全屏';
    } else {
        fullscreenBtn.textContent = '进入全屏';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('statusBar').textContent = '已连接 - 通用模式';
    createKeyboard();

    // 添加全屏按钮事件监听器
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // 添加模式切换按钮事件监听器
    const modeToggleBtn = document.getElementById('modeToggleBtn');
    if (modeToggleBtn) {
        modeToggleBtn.addEventListener('click', toggleKeyboardMode);
    }

    // 添加仿真模式切换按钮事件监听器
    const simulationModeBtn = document.getElementById('simulationModeBtn');
    if (simulationModeBtn) {
        simulationModeBtn.addEventListener('click', toggleOperationMode);
    }
});