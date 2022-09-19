import {combineReducers} from "redux";
import cellsReducer from "./cellsReducer";
import bundlesReducer from "./bundlesReducer";

const combinedReducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer
});

export default combinedReducers;

export type RootState = ReturnType<typeof combinedReducers>;