import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  RemoveRedEyeOutlined as EyeIcon,
  UnfoldMoreOutlined as ConstructorIcon,
} from "@mui/icons-material";

import styles from "./ToggleButtons.module.scss";

import { getActive, toggleCalcOrConstructor } from "../../store/calculator";
import { AppDispatch } from "../../store/createStore";

const ToggleButtons: React.FC = () => {
  const active: string = useSelector(getActive());

  const dispatch: AppDispatch = useDispatch();

  const onChangeActive = (btn: string) => {
    dispatch(toggleCalcOrConstructor(btn));
  };

  return (
    <div className={styles.buttons_container}>
      <button
        className={`${styles.button_run} ${
          active === "runtime" ? styles.button_active : ""
        }`}
        onClick={() => onChangeActive("runtime")}
      >
        <EyeIcon />
        Runtime
      </button>
      <button
        className={`${styles.button_constr}  ${
          active === "constructor" ? styles.button_active : ""
        }`}
        onClick={() => onChangeActive("constructor")}
      >
        <ConstructorIcon className={styles.button_constr_icon} />
        Constructor
      </button>
    </div>
  );
};

export default ToggleButtons;
