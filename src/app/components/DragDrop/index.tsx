import React from "react";

import ColumnsWrapper from "../columnsWrapper";

import MathSigns from "../mathSigns";
import Numbers from "../numbers";
import Screen from "../screen";
import Equal from "../equal";

import { Item, DataObject } from "../../../interfaces";

import styles from "./DragDrop.module.scss";

const draggableItems: Item[] = [
  { id: 1, draggable: true, content: <Screen /> },
  { id: 2, draggable: true, content: <MathSigns /> },
  { id: 3, draggable: true, content: <Numbers /> },
  { id: 4, draggable: true, content: <Equal /> },
];

const board: never | Item[] = [];

const data: DataObject[] = [
  { title: "left", items: draggableItems },
  { title: "right", items: board },
];

const DragDrop: React.FC = () => {
  return (
    <div className={styles.colsWrapper_container}>
      <ColumnsWrapper data={data} />
    </div>
  );
};

export default DragDrop;
