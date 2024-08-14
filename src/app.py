import webview
import os
from typing import Any, Literal

CALLBACKS = Literal["setFileSource"]


def _path(path: str):
    root = os.path.dirname(__file__)
    path = os.path.join(root, path)
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    return path


def to_js(value: Any):
    if isinstance(value, str):
        value = value.replace("'", "\\'")
        return f"'{value}'"
    else:
        raise ValueError(value)


def setJsValue(value: Any, callback_name: CALLBACKS):
    window.evaluate_js(f"window.pywebview.state.{callback_name}({to_js(value)})")


class Api:
    def load_file(self):
        window = webview.windows[0]
        file = window.create_file_dialog(webview.OPEN_DIALOG)
        setJsValue(file[0], "setFileSource")


DEBUG = True

if __name__ == "__main__":
    gui_path = _path("../dist/index.html")
    window = webview.create_window("ReactApp", gui_path, js_api=Api())
    webview.start(gui="qt", debug=DEBUG)
