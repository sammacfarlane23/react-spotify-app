import { combineReducers } from "redux";

import topItemsReducer from "../slices/topItems";
import playlistReducer from "../slices/playlistSlice";

export default combineReducers({
  topItems: topItemsReducer,
  playlist: playlistReducer,
});
