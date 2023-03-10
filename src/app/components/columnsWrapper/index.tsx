import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Item, DataObject } from "../../../interfaces";
import { getActive } from "../../store/calculator";
import { ReactComponent as AddIcon } from "../../../icons/add.svg";

import styles from "./ColumnsWrapper.module.scss";

interface Props {
  data: DataObject[];
}

const ColumnsWrapper: React.FC<Props> = ({ data }) => {
  const [content, setContent] = useState<DataObject[]>(data);
  const [currentBoard, setCurrentBorder] = useState<DataObject | null>(null);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const active: string = useSelector(getActive());

  const boardRef = useRef<undefined | HTMLDivElement>();

  const makeItemUndraggabe = (boardTitle: string): void => {
    setContent(
      content.map((board) => {
        if (board.title === boardTitle) {
          board.items = board.items.map((i) =>
            currentItem?.id === i.id ? { ...i, draggable: false } : i
          );
          return board;
        }

        return board;
      })
    );
  };

  const makeItemDraggabe = (item: Item): void => {
    setContent(
      content.map((board) => {
        if (board.title === "left") {
          board.items = board.items.map((i) =>
            item.id === i.id ? { ...i, draggable: true } : i
          );
          return board;
        }

        return board;
      })
    );
  };

  const handleDragOver = (e: React.DragEvent, board: DataObject) => {
    e.preventDefault();

    if (board.title === "right") {
      if (e.target instanceof HTMLElement) {
        if (
          e.target.classList.contains(styles.draggableItemsContainer) &&
          !board.items.length
        ) {
          e.target.style.backgroundColor = "#f0f9ff";
        }
      }
    }
  };

  const handleDragStart = (board: DataObject, item: Item) => {
    setCurrentBorder(board);
    setCurrentItem(item);
  };

  const handleDrop = (e: React.DragEvent, board: DataObject, item?: Item) => {
    e.preventDefault();

    if (board.title === "right") {
      if (currentItem && currentBoard) {
        const currentItemIndex: number | false =
          currentBoard?.items.indexOf(currentItem);

        if (currentBoard?.title === "right") {
          currentBoard?.items.splice(currentItemIndex, 1);
        }

        if (item) {
          const dropItemIndex =
            currentItem?.id === 1
              ? 0
              : item.id === 1
              ? 1
              : board.items.indexOf(item);

          board.items.splice(dropItemIndex, 0, currentItem);

          if (currentBoard?.title === "right") {
            board.items.splice(dropItemIndex, 0, currentItem);
          }
        }

        setContent(
          content.map((b) => {
            if (b.title === board.title) {
              return board;
            }
            if (b.title === currentBoard?.title) {
              return currentBoard;
            }

            return b;
          })
        );

        //makes dragged items undraggable on left board
        makeItemUndraggabe("left");

        //makes screen item undraggable on right board
        if (currentItem.id === 1) {
          makeItemUndraggabe("right");
        }
      }
    }
  };

  const handleDropOnEmptyBoard = (e: React.DragEvent, board: DataObject) => {
    if (board.title === "right") {
      if (e.target instanceof HTMLElement) {
        if (
          e.target.classList.contains(styles.draggableItemsContainer) ||
          !board.items.length
        ) {
          if (currentItem) {
            if (currentItem?.id !== 1) {
              board.items.push(currentItem);
            } else if (currentItem?.id === 1) {
              board.items.unshift(currentItem);
            }
          }

          e.target.style.border = "none";
          e.target.style.backgroundColor = "white";
          e.target.style.justifyContent = "flex-start";
        }
      }
    }

    handleDrop(e, board);
  };

  const handleDragLeave = (e: React.DragEvent, board: DataObject) => {
    if (board.title === "right") {
      if (e.target instanceof HTMLElement) {
        if (
          e.target.classList.contains(styles.draggableItemsContainer) ||
          !board.items.length
        ) {
          e.target.style.backgroundColor = "white";
        }
      }
    }
  };

  const handleDeleteItem = (
    e: React.MouseEvent<HTMLElement>,
    board: DataObject,
    item: Item
  ) => {
    const filteredItems = content[1].items.filter((it) => it.id !== item.id);
    content[1].items = filteredItems;

    setContent([content[0], content[1]]);

    if (board.title === "right") {
      if (e.target instanceof HTMLElement) {
        if (!board.items.length && boardRef.current) {
          boardRef.current.style.border = "2px dashed #c4c4c4";

          boardRef.current.style.justifyContent = "center";
        }
      }
    }

    makeItemDraggabe(item);
  };

  const getItemStyles = (item: Item) => {
    const isDropped = !!content[1].items.find((i) => i.id === item.id);

    if (isDropped) {
      return styles.isOnBoard;
    }

    return styles.border;
  };

  const getBoardStyles = (board: DataObject) => {
    if (board.title === "left") {
      if (active === "runtime") {
        return styles.runtimeActive;
      }
    }
  };

  //make button calc active,cursor, put on screen type nums
  return (
    <>
      {content.map((board: DataObject, boardInd: number) => (
        <div
          onDragOver={(e) => handleDragOver(e, board)}
          onDrop={(e) => handleDropOnEmptyBoard(e, board)}
          onDragLeave={(e) => handleDragLeave(e, board)}
          ref={boardRef as React.RefObject<HTMLDivElement>}
          key={boardInd}
          className={`${styles.draggableItemsContainer} ${getBoardStyles(
            board
          )} ${
            board.title === "right" && active === "constructor"
              ? styles.dropArea_container
              : ""
          }`}
        >
          {board.items.map((item: Item) => (
            <div
              draggable={active === "constructor" ? item.draggable : false}
              onDragOver={(e) => handleDragOver(e, board)}
              onDragStart={() => handleDragStart(board, item)}
              onDrop={(e) => handleDrop(e, board, item)}
              onDoubleClick={
                board.title === "right"
                  ? active === "constructor"
                    ? (e) => handleDeleteItem(e, board, item)
                    : undefined
                  : undefined
              }
              key={item.id}
              className={`${styles.item_container} ${
                boardInd === 0
                  ? getItemStyles(item)
                  : item.id !== 1
                  ? active === "constructor"
                    ? styles.border_hovered
                    : ""
                  : ""
              } `}
            >
              {item?.content}
            </div>
          ))}

          {!board.items.length && active === "constructor" && (
            <>
              <AddIcon />
              <span className={styles.dropArea_bigText}>Перетащите сюда</span>
              <span className={styles.dropArea_smallText}>
                любой элемент <br />
                из левой панели
              </span>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ColumnsWrapper;
