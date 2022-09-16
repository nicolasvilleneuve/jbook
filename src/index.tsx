import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import CodeCell from "./components/code-cell";
// import TextEditor from "./components/text-editor";
import {Provider} from "react-redux";
import {store} from "./state";
import CellList from "./components/cell-list";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


const App = () => {
    return (
        <Provider store={store}>
            <div>
                {/*<CodeCell/>*/}
                {/*<TextEditor />*/}
                <CellList />
            </div>
        </Provider>
    );
};


root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);


