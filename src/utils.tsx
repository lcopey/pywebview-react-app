import { useEffect, useState } from 'react';
import PythonApi from './python_types';

export function python_api(): undefined | PythonApi {
    if ((window as any).pywebview) {
        return (window as any).pywebview.api;
    } else {
        console.log('No instance of pywebview in window was found');
    }
}

export function useWVGlobalState(init: any, name: string) {
    const [value, setValue] = useState(init);

    useEffect(() => {
        window.addEventListener('pywebviewready', function () {
            const pywebview = (window as any).pywebview;
            if (!pywebview.state) {
                pywebview.state = {};
            }
            pywebview.state[name] = setValue;
        });
    });

    return [value, setValue];
}
