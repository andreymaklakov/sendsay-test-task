import React from "react";
import { useSelector } from "react-redux";
import { getScreenNums } from "../../store/calculator";

import styles from "./Screen.module.scss";

const Screen: React.FC = () => {
  let number: string = useSelector(getScreenNums());

  number = number === "Infinity" ? "Не определено" : number;

  return (
    <div className={`${styles.screen} `}>
      <span
        className={`${styles.screen_content} ${
          number.length > 8 ? styles.screen_smallNums : styles.screen_bigNums
        }`}
      >
        {number}
      </span>
    </div>
  );
};

export default Screen;
