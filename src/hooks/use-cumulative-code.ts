import {useTypedSelector} from "./use-typed-selector";

export const useCumulativeCode = (cellId: String) => {
    return useTypedSelector((state) => {
        const {data, order} = state.cells;
        const orderedCells = order.map(id => data[id]);
        const showFunc = `
            import _ReactDOM from 'react-dom/client';
            import _React from 'react';
            const root = document.querySelector("#root");
            var show = (value) => {
                if (typeof value === 'object') {
                    if (value.$$typeof && value.props) {
                        const rootDOM = _ReactDOM.createRoot(root); 
                        rootDOM.render(value);
                    } else {
                        root.innerHTML = JSON.stringify(value);
                    }
                } else {
                    root.innerHTML = value;
                }
            };
            `;

        const showFuncNoOp = `var show = () => {}`;

        const cumulativeCode = [];

        for (let c of orderedCells) {
            if (c.type === 'code') {
                if (c.id === cellId) {
                    cumulativeCode.push(showFunc);
                } else  {
                    cumulativeCode.push(showFuncNoOp);
                }
                cumulativeCode.push(c.content);
            }
            if (c.id === cellId) {
                break;
            }
        }
        return cumulativeCode;
    }).join('\n');
};