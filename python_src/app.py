import webview
import os
import pandas as pd
from typing import Any, Literal, TypedDict
from dataclasses import dataclass
import plotly.express as px

CALLBACKS = Literal["setFileSource"]


class PlotApi:
    class LoadFileResponse(TypedDict):
        file_path: str
        columns: list[str]


class AppDatas:
    dataframe: pd.DataFrame


def _path(path: str):
    try:
        root = os.path.dirname(__file__)
    except NameError:
        root = "/home/laurent/Documents/Code/pywebview-react-app/src"
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


class PlotApi:
    def __init__(self) -> None:
        self.datas = None

    def load_file(self) -> PlotApi.LoadFileResponse:
        window = webview.windows[0]
        file = window.create_file_dialog(webview.OPEN_DIALOG)
        file = file[0]
        self.datas = pd.read_csv(file)
        return {"file_path": file, "columns": list(self.datas.columns)}

    def plot_histogram(self, xaxis: str):
        results = px.histogram(self.datas, x=xaxis)
        return results.to_json()


class Api:
    plot_api = PlotApi()


DEBUG = False

if __name__ == "__main__":
    gui_path = _path("../dist/index.html")
    window = webview.create_window("ReactApp", gui_path, js_api=Api())
    webview.start(gui="qt", debug=DEBUG)
