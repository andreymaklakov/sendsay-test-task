import { combineReducers, configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./calculator";

const rootReducer = combineReducers({
  calculator: calculatorReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default createStore;
