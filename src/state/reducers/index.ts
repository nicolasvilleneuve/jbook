import {combineReducers} from "redux";
import cellsReducer from "./cellsReducer";

const combinedReducers = combineReducers({
    cells: cellsReducer,
});

export default combinedReducers;

export type RootState = ReturnType<typeof combinedReducers>;