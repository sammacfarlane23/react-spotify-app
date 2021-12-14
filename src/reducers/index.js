import { combineReducers } from "redux";

import topItemsReducer from "../slices/itemsSlice";

export default combineReducers({
  items: topItemsReducer,
});
