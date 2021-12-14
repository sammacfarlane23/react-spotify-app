import { combineReducers } from "redux";

import itemsReducer from "../slices/itemsSlice";

export default combineReducers({
  items: itemsReducer,
});
