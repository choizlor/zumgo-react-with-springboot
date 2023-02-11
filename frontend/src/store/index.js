import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

<<<<<<< HEAD
import { user } from "./userSlice";

const reducers = combineReducers({
  user: user.reducer,
});
=======
import user from "./userSlice";

const reducers = combineReducers({
    user: user.reducer,
});


>>>>>>> 56151e1553914f8b1021f6d262bc5eeb1e7b313b

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

<<<<<<< HEAD
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
=======
const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
})

 export default store;
>>>>>>> 56151e1553914f8b1021f6d262bc5eeb1e7b313b
