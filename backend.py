from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pynput
from pynput.keyboard import Key, Controller
import logging
import argparse
import os

app = Flask(__name__, static_folder='./frontend')
CORS(app)  # 允许跨域请求

class KeyboardController:
    """封装键盘控制逻辑"""
    
    def __init__(self):
        self.keyboard = Controller()
        self.sticky_keys = {
            'leftshift': 'inactive',
            'rightshift': 'inactive',
            'leftctrl': 'inactive',
            'rightctrl': 'inactive',
            'leftalt': 'inactive',
            'rightalt': 'inactive',
            'win': 'inactive'
        }
        self.KEY_MAP = {
            'leftshift': Key.shift_l,
            'rightshift': Key.shift_r,
            'leftctrl': Key.ctrl_l,
            'rightctrl': Key.ctrl_r,
            'leftalt': Key.alt_l,
            'rightalt': Key.alt_r,
            'win': Key.cmd,
            'esc': Key.esc,
            'tab': Key.tab,
            'enter': Key.enter,
            'backspace': Key.backspace,
            'delete': Key.delete,
            'space': Key.space,
            'capslock': Key.caps_lock,
            'f1': Key.f1,
            'f2': Key.f2,
            'f3': Key.f3,
            'f4': Key.f4,
            'f5': Key.f5,
            'f6': Key.f6,
            'f7': Key.f7,
            'f8': Key.f8,
            'f9': Key.f9,
            'f10': Key.f10,
            'f11': Key.f11,
            'f12': Key.f12,
            'arrowup': Key.up,
            'arrowdown': Key.down,
            'arrowleft': Key.left,
            'arrowright': Key.right,
        }
    
    def get_pynput_key(self, key_name):
        """获取键值"""
        if key_name in self.KEY_MAP:
            return self.KEY_MAP[key_name]
        if len(key_name) == 1:
            return key_name
        return None
    
    def press_sticky_key(self, key_name):
        """切换粘滞键状态"""
        current_state = self.sticky_keys.get(key_name, 'inactive')
        
        if current_state == 'inactive':
            self.sticky_keys[key_name] = 'active'
            logging.info(f"Sticky key '{key_name}' activated (active)")
        elif current_state == 'active':
            self.sticky_keys[key_name] = 'locked'
            logging.info(f"Sticky key '{key_name}' locked")
        elif current_state == 'locked':
            self.sticky_keys[key_name] = 'inactive'
            pynput_key = self.get_pynput_key(key_name)
            if pynput_key:
                self.keyboard.release(pynput_key)
            logging.info(f"Sticky key '{key_name}' deactivated")
    
    def reset_active_sticky_keys(self, exclude_key=None):
        for key_name, state in self.sticky_keys.items():
            if state == 'active' and key_name != exclude_key:
                self.sticky_keys[key_name] = 'inactive'
                pynput_key = self.get_pynput_key(key_name)
                if pynput_key:
                    self.keyboard.release(pynput_key)
                logging.info(f"Sticky key '{key_name}' deactivated (auto-reset)")
    
    def process_key_event(self, key_name, action):
        """处理按键事件"""
        pynput_key = self.get_pynput_key(key_name)
        if not pynput_key:
            logging.error(f"Unsupported key: {key_name}")
            return {"error": f"Unsupported key: {key_name}"}, 400
        
        try:
            if key_name in self.sticky_keys:
                # 按下粘滞键
                if action == 'down':
                    self.press_sticky_key(key_name)
                    if self.sticky_keys[key_name] == 'locked':
                        # 按住粘滞键
                        self.keyboard.press(pynput_key)
            else:
                # 按下其他键
                if action == 'down':
                    active_modifiers = []
                    for mod_key, state in self.sticky_keys.items():
                        if state in ['active', 'locked']:
                            mod_pynput_key = self.get_pynput_key(mod_key)
                            if mod_pynput_key:
                                active_modifiers.append((mod_key, mod_pynput_key))
                    
                    for mod_key, mod_pynput_key in active_modifiers:
                        self.keyboard.press(mod_pynput_key)
                    
                    self.keyboard.press(pynput_key)
                    self.keyboard.release(pynput_key)
                    
                    for mod_key, mod_pynput_key in active_modifiers:
                        self.keyboard.release(mod_pynput_key)
                    
                    self.reset_active_sticky_keys()
                    
                    logging.info(f"Key '{key_name}' pressed with modifiers: {[mod[0] for mod in active_modifiers]}")
            
            return {"status": "success"}, 200
        except Exception as e:
            logging.error(f"Failed to simulate key press: {e}")
            return {"error": "Failed to simulate key press"}, 500

# 初始化键盘控制器
keyboard_controller = KeyboardController()

@app.route('/keypress', methods=['POST'])
def keypress():
    """读取传入键值"""
    data = request.get_json()
    if not data or 'key' not in data or 'action' not in data:
        logging.error("Invalid request: missing key or action")
        return jsonify({"error": "Missing key or action"}), 400
    
    key_name = data['key'].lower()
    action = data['action'].lower()
    
    result, status_code = keyboard_controller.process_key_event(key_name, action)
    return jsonify(result), status_code

@app.route('/sticky_keys', methods=['GET'])
def get_sticky_keys():
    return jsonify(keyboard_controller.sticky_keys), 200

# 前端服务路由
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s: %(message)s')
    parser = argparse.ArgumentParser(description='Touch Keyboard Backend')
    parser.add_argument('--port', type=int, default=8000, help='Port to run the server on (default: 8000)')
    args = parser.parse_args()
    
    logging.info(f"Starting server on port {args.port}")
    app.run(host='0.0.0.0', port=args.port, debug=False)