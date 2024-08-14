interface PlotApi {
    load_file: () => Promise<{ file_path: string; columns: Array<string> }>;
}

export default interface PythonApi {
    plot_api: PlotApi;
}
