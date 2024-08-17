import { useEffect, useMemo, useState } from 'react';
import PythonApi from './python_types';
import MockApi from './mock_python_api';

type PyWebViewWindow = Window &
    typeof globalThis & {
        pywebview: { api: PythonApi; state: { [key: string]: unknown } };
    };

export function python_api(): PythonApi {
    if ((window as PyWebViewWindow).pywebview) {
        return (window as PyWebViewWindow).pywebview.api;
    } else {
        console.log(
            'No instance of pywebview in window was found, mocking api',
        );
        return MockApi;
    }
}

export function useWVGlobalState(init: unknown, name: string) {
    const [value, setValue] = useState(init);

    useEffect(() => {
        window.addEventListener('pywebviewready', function () {
            const pywebview = (window as PyWebViewWindow).pywebview;
            if (!pywebview.state) {
                pywebview.state = {};
            }
            pywebview.state[name] = setValue;
        });
    });

    return [value, setValue];
}

export function usePersistedState<T>(
    initial_value: T,
    id: string,
    storage: 'session' | 'local',
): [T, React.Dispatch<T>] {
    let _storage = null;
    if (storage == 'session') {
        _storage = window.sessionStorage;
    } else {
        _storage = window.localStorage;
    }

    const _initial_value = useMemo(() => {
        const memoized = _storage.getItem(id);
        if (memoized) {
            return JSON.parse(memoized) as T;
        } else {
            return initial_value;
        }
    }, [id, initial_value, _storage]);

    const [state, setState] = useState<T>(_initial_value);
    useEffect(() => {
        _storage.setItem(id, JSON.stringify(state));
    }, [state, _storage, id]);

    return [state, setState];
}
