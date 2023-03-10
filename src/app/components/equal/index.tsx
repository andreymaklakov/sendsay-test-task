import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { calculateResult, getActive } from "../../store/calculator";
import { AppDispatch } from "../../store/createStore";

import styles from "./Equal.module.scss";

const Equal: React.FC = () => {
  const active: string = useSelector(getActive());

  const dispatch: AppDispatch = useDispatch();

  const handleEqual = () => {
    dispatch(calculateResult());
  };

  return (
    <button
      onClick={handleEqual}
      className={`${styles.equals_container} ${
        active === "runtime" ? styles.activeButtons : ""
      }`}
    >
      =
    </button>
  );
};

export default Equal;
