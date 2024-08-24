import PythonApi from './python_types';

function asPromise<T>(value: T): Promise<T> {
    return new Promise((resolve) => resolve(value));
}

const MockApi: PythonApi = {
    plot_api: {
        load_file: () => {
            return asPromise({
                file_path: 'dummy.csv',
                columns: ['col1', 'col2', 'col3'],
            });
        },
        // @ts-ignore
        plot_histogram: (axis: string) => {
            return asPromise(`{
                data: [{ type: 'histogram', x: [0, 1, 2] }],
                layout: {},
            }`);
        },
    },
};

export default MockApi;
