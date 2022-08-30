import * as esbuild from 'esbuild-wasm';
import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {FetchPlugin} from "./plugins/fetch-plugin";



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);



const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if (!ref.current) {
            return;
        }
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), FetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        });

        setCode(result.outputFiles[0].text);
        // console.log(result);
    }

    return (
        <div>
            <div>
                <textarea value={input} onChange={e => setInput(e.target.value)}>Input here:</textarea>
            </div>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


