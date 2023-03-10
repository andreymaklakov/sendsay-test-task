import { AppDispatch, AppThunk, RootState } from "./createStore";
import { createSlice } from "@reduxjs/toolkit";

import { mathSigns } from "../constants";

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    active: "constructor",
    screenNums: "0",
    sign: "",
    calculation: "0",
    result: "",
  },
  reducers: {
    activeChanged(state, action) {
      state.active = action.payload;
    },
    numAdded(state, action) {
      if (state.screenNums === "0" && action.payload !== ".") {
        state.screenNums = action.payload;
      } else {
        state.screenNums = state.screenNums + action.payload;
      }
    },
    clearScreen(state) {
      state.screenNums = "0";
    },
    calculationAdded(state, action) {
      const payload = action.payload === "*" ? "x" : action.payload;
      const payloadIsSing = !!mathSigns.find((sign) => sign === payload);

      let lastSymbol = state.calculation[state.calculation.length - 1];
      lastSymbol = lastSymbol === "*" ? "x" : lastSymbol;

      const lastSymbolIsSign = !!mathSigns.find((sign) => sign === lastSymbol);

      if (
        state.calculation === "0" &&
        action.payload !== "." &&
        !payloadIsSing
      ) {
        state.calculation = action.payload;
      } else {
        if (payloadIsSing && lastSymbolIsSign) {
          state.calculation = state.calculation.slice(0, -1) + action.payload;

          state.sign = action.payload;
        } else if (payloadIsSing && !state.sign) {
          state.calculation = state.calculation + action.payload;
          state.sign = action.payload;
        } else if (payloadIsSing && state.sign) {
          state.result = eval(state.calculation).toString();

          if (state.result.length > 17) {
            if (state.result.includes(".")) {
              const numsAfterComma: number = 17 - state.result.indexOf(".") - 1;

              state.result = Number(state.result)
                .toFixed(numsAfterComma)
                .toString();
            } else {
              state.result = Number(state.result).toPrecision(8).toString();
            }
          }

          state.calculation = state.result + action.payload;
          state.screenNums = state.result;
          state.sign = action.payload;
        } else {
          state.calculation = state.calculation + action.payload;
        }
      }
    },
    clearCalculation(state) {
      state.calculation = "0";
    },
    calculationEquals(state) {
      state.result = eval(state.calculation).toString();

      if (state.result.length > 17) {
        if (state.result.includes(".")) {
          const numsAfterComma: number = 17 - state.result.indexOf(".") - 1;

          state.result = Number(state.result)
            .toFixed(numsAfterComma)
            .toString();
        } else {
          state.result = Number(state.result).toPrecision(8).toString();
        }
      }

      state.calculation = state.result;
      state.screenNums = state.result;
      state.sign = "";
    },
  },
});

const { reducer: calculatorReducer, actions } = calculatorSlice;
const {
  activeChanged,
  numAdded,
  clearScreen,
  calculationAdded,
  clearCalculation,
  calculationEquals,
} = actions;

export const toggleCalcOrConstructor =
  (btn: string): AppThunk =>
  (dispatch, getState): void => {
    dispatch(activeChanged(btn));

    if (getActive()(getState()) !== "0") {
      dispatch(clearScreen());
      dispatch(clearCalculation());
    }
  };

export const addToScreenNums =
  (num: string): AppThunk =>
  (dispatch, getState): void => {
    let lastSymbol = getCalculation()(getState())[
      getCalculation()(getState()).length - 1
    ];
    lastSymbol = lastSymbol === "*" ? "x" : lastSymbol;

    const lastSymbolIsSign = !!mathSigns.find((sign) => sign === lastSymbol);

    if (lastSymbolIsSign) {
      dispatch(clearScreen());
    }

    num = num === "," ? "." : num;

    if (getScreenNums()(getState()).length < 17) {
      dispatch(numAdded(num));
      dispatch(calculationAdded(num));
    }
  };

export const chooseSign =
  (sign: string) =>
  (dispatch: AppDispatch): void => {
    sign = sign === "x" ? "*" : sign;

    dispatch(calculationAdded(sign));
  };

export const calculateResult =
  (): AppThunk =>
  (dispatch, getState): void => {
    let lastSymbol = getCalculation()(getState())[
      getCalculation()(getState()).length - 1
    ];
    lastSymbol = lastSymbol === "*" ? "x" : lastSymbol;

    const lastSymbolIsSign = !!mathSigns.find((sign) => sign === lastSymbol);

    if (!lastSymbolIsSign) {
      dispatch(calculationEquals());
    }
  };

export const getActive = () => (state: RootState) => state.calculator.active;
export const getCalculation = () => (state: RootState) =>
  state.calculator.calculation;
export const getScreenNums = () => (state: RootState) =>
  state.calculator.screenNums;

export default calculatorReducer;
