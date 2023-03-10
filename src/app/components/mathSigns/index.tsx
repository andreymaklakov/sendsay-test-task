import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { mathSigns } from "../../constants";
import { chooseSign, getActive } from "../../store/calculator";
import { AppDispatch } from "../../store/createStore";

import styles from "./MathSigns.module.scss";

const MathSigns: React.FC = () => {
  const active: string = useSelector(getActive());

  const dispatch: AppDispatch = useDispatch();

  const handleChooseSign = (sign: string) => {
    dispatch(chooseSign(sign));
  };

  return (
    <div className={`${styles.mathSigns_container} `}>
      {mathSigns.map((sign, i) => (
        <button
          key={i}
          onClick={
            active === "runtime" ? () => handleChooseSign(sign) : undefined
          }
          className={active === "runtime" ? styles.activeButtons : ""}
        >
          {sign}
        </button>
      ))}
    </div>
  );
};

export default MathSigns;
