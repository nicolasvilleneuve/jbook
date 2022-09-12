import React, {useEffect, useRef} from "react";

interface PreviewProps {
    code: string;
}

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

const Preview: React.FC<PreviewProps> = ({code}) => {
    const iframe = useRef<any>();

    useEffect(()=>{
        iframe.current.srcdoc = baseHtml;
        iframe.current.contentWindow.postMessage(code, '*');
    }, [code]);

    return <iframe title="preview" ref={iframe} srcDoc={baseHtml} sandbox='allow-scripts'/>
};

export default Preview;