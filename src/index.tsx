import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";
import {Provider} from "react-redux";
import {store} from "./state";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


const App = () => {
    return (
        <Provider store={store}>
            <div>
                {/*<CodeCell/>*/}
                <TextEditor />
            </div>
        </Provider>
    );
};


root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);


