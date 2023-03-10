import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToScreenNums, getActive } from "../../store/calculator";

import styles from "./Numbers.module.scss";

const numbers: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ",",
];

const Numbers: React.FC = () => {
  const active: string = useSelector(getActive());

  const dispatch: Function = useDispatch();

  const saveNums = (num: string) => {
    dispatch(addToScreenNums(num));
  };

  return (
    <div className={`${styles.numbers_container} `}>
      {numbers.map((num, i) => (
        <button
          key={i}
          onClick={active === "runtime" ? () => saveNums(num) : undefined}
          className={`${num === "0" ? `${styles.zeroButton} ` : ""} ${
            active === "runtime" ? styles.activeButtons : ""
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Numbers;
