import React, {useState, useEffect} from 'react';
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Bundler from "../bundler";
import Resizable from "./resizable";
import {Cell} from "../state";
import {useActions} from "../hooks/use-actions";


interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const  {updateCell} = useActions();

    useEffect(()=> {
        const timer = setTimeout(async ()=> {
            const output = await Bundler(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 1000)

        return () => {
            clearTimeout(timer);
        }
    }, [cell.content]);


    return (
        <Resizable direction={'vertical'}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'row', width: '100%'}}>
                <Resizable direction={'horizontal'}>
                    <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)}/>
                </Resizable>
                <Preview code={code} bundlingStatus={err} />
            </div>
        </Resizable>
    );
};


export default CodeCell;


