import { combineReducers } from "redux";

import optionsReducer from "./optionsReducer";
import authReducer from "./authReducer";

export default combineReducers({ optionsReducer, authReducer });
