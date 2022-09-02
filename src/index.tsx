import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {FetchPlugin} from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);



const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        iframe.current.srcdoc = baseHtml;

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

        // setCode(result.outputFiles[0].text);
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
    };

    const baseHtml = `
    <html> 
        <head>
        <body>
            <div id="root"></div>
                <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector("#root");
                        root.innerHTML = '<div style="color:red;">' + err + '</div>';
                        throw err;
                    }
                }, false);
                </script>
        </body>
        </head>
    </html>
    `;

    return (
        <div>
            <div>
                <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)}/>
                <textarea value={input} onChange={e => setInput(e.target.value)}>Input here:</textarea>
            </div>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe title="preview" ref={iframe} srcDoc={baseHtml} sandbox='allow-scripts'></iframe>
        </div>
    );
};


root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


