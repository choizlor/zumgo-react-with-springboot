import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userSlice"],
};


const reducers = combineReducers({
    userSlice
});

export default persistReducer(persistConfig, reducers)