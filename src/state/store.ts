import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import combinedReducers from "./reducers";
import {ActionType} from "./action-types";

export const store = createStore(combinedReducers, {}, applyMiddleware(thunk));

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
});
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
});
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
});
store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
});

