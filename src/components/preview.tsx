import React, {useEffect, useRef} from "react";
import './preview.css';


interface PreviewProps {
    code: string;
    bundlingStatus: string;
}

const baseHtml = `
    <html> 
        <head>
            <style>
                html {background-color: white}
            </style>
        </head>
        <body>
            <div id="root"></div>
                <script>
                const handleError = (err) => {
                    const root = document.querySelector("#root");
                    root.innerHTML = '<div style="color:red;">' + err + '</div>';
                    throw err;
                };
                window.addEventListener('error', (event) => {
                    event.preventDefault();
                    handleError(event.error);
                });
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        handleError(err);
                    }
                }, false);
                </script>
        </body>
    </html>
    `;

const Preview: React.FC<PreviewProps> = ({code, bundlingStatus}) => {
    const iframe = useRef<any>();

    useEffect(()=>{
        iframe.current.srcdoc = baseHtml;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code]);

    return (
        <div className={'preview-wrapper'}>
            <iframe title="preview" ref={iframe} srcDoc={baseHtml} sandbox='allow-scripts'/>
            {bundlingStatus && <div className={'preview-error'}>{bundlingStatus}</div>}
        </div>)
};

export default Preview;