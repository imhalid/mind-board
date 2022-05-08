import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
// import TextareaAutosize from "react-textarea-autosize";

var randomColor = require("randomcolor");

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const randomNumber = Math.floor(Math.random() * 250);

  //yeni öğre burada oluşturuluyor
  const newitem = () => {
    if (item.trim() !== "") {
      //yeni item özellikleri
      const newitem = {
        id: uuidv4(),
        item: item,
        edit: false,
        color: randomColor({
          luminosity: "light",
          hue: "random",
          alpha: 0.4,
          format: "hsla",
        }),
        defaultPos: { x: randomNumber, y: randomNumber },
      };
      setItems((items) => [...items, newitem]);
      setItem("");
    } else {
      alert("Enter a item");
      setItem("");
    }
  };

  //enter basma kkodu
  // const keyPress = (event) => {
  //   var code = event.keyCode || event.which;
  //   if (code === 13) {
  //     newitem();
  //   }
  // };

  //localde olan verileri burada gösteriyor
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  //itemlerin kkonuumlarını  burada tutuyor
  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  //itemleri silmek için
  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  //itemleri güncellemek için
  // const handleEdit = (id, item) => {
  //   setItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, edit: !item.edit } : item
  //     )
  //   );
  //   setEdit(item);
  // };

  console.log(items);

  return (
    <div className="App">
      <div id="new-item">
        <textarea
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter something..."
          // onKeyPress={(e) => keyPress(e)}
        />
        <button onClick={newitem}>ENTER</button>
      </div>
      <div id="items">
        {items.map((item, index) => {
          return (
            <Draggable
              cancel="#textarea, button"
              key={item.id}
              defaultPosition={item.defaultPos}
              onStop={(e, data) => {
                updatePos(data, index);
              }}
            >
              <div
                onDoubleClick={() => deleteNote(item.id)}
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0px 0px 10px ${item.color}`,
                }}
                className="hover:ring select-none cursor-grab absolute backdrop-blur-md min-w-min w-[128px] min-h-min  rounded overflow-hidden shadow-lg"
              >
                <p
                  id="textarea"
                  className="m-3 w-fit h-full mt-5 cursor-default relative rounded"
                >
                  {item.item}
                </p>

                <button
                  className=" shadow-inner absolute w-[10px] h-[10px] hover:bg-[#EC6A5E] bg-[#a0a0a0] rounded-full left-1 top-1 "
                  id="delete"
                  onClick={() => deleteNote(item.id)}
                ></button>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}

export default App;
