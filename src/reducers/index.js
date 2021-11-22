import { combineReducers } from "redux";

import topItemsReducer from "../slices/topItems";

export default combineReducers({
  topItems: topItemsReducer,
});
