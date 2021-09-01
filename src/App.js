import { useState, useEffect } from "react";
import "./App.css";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";

const getRandomValue = () => {
  console.log(Math.floor(Math.random() * 400) + 1);
  return Math.floor(Math.random() * 400) + 1;
};

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, index) => ({
  title: "Item " + index,
  index: index,
  id: `algo-${index}`,
  imageSrc: `https://picsum.photos/180/180?random=${getRandomValue()}`,
}));

function App() {
  const [Items, setItems] = useState(items);
  useEffect(() => {
    console.log(Items);
  }, [Items]);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      setItems(arrayMove(Items, oldIndex, newIndex));
    }
  };

  const SortableItem = SortableElement(({ item }) => (
    <div className="item">
      <img src={item.imageSrc} />
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <div className="container">
      {items.map((item, index) => (
        <SortableItem key={`${item.id}`} index={index} item={item} />
      ))}
    </div>
  ));

  return (
    <div className="App">
      <SortableList
        items={Items}
        onSortEnd={onSortEnd}
        axis="xy"
        helperClass="SortableHelper"
      />
    </div>
  );
}

export default App;
