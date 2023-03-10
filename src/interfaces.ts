export interface Item {
  id: number;
  draggable: boolean;
  content: React.ReactElement;
}

export interface DataObject {
  title: string;
  items: Item[];
}
