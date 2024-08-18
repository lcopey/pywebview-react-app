export type LoadFileResultsT = { file_path: string; columns: Array<string> };
interface PlotApi {
    load_file: () => Promise<LoadFileResultsT>;
}

export default interface PythonApi {
    plot_api: PlotApi;
}
