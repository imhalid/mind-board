import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { MdDragIndicator } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

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
  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };

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

  return (
    <div className="App">
      <div id="new-item">
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter something..."
          onKeyPress={(e) => keyPress(e)}
        />
        <button onClick={newitem}>ENTER</button>
      </div>
      <div id="items">
        {items.map((item, index) => {
          return (
            <Draggable
              handle="drag"
              key={item.id}
              defaultPosition={item.defaultPos}
              onStop={(e, data) => {
                updatePos(data, index);
              }}
            >
              <div
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0px 0px 10px ${item.color}`,
                }}
                className="hover:ring hover:resize absolute backdrop-blur-md min-w-min w-[128px] min-h-min  rounded overflow-hidden shadow-lg"
              >
                <TextareaAutosize className="m-3 mt-5 rounded">
                  {item.item}
                </TextareaAutosize>

                <button
                  className=" shadow-inner absolute w-[10px] h-[10px] hover:bg-[#EC6A5E] bg-[#a0a0a0] rounded-full left-1 top-1 "
                  id="delete"
                  onClick={(e) => deleteNote(item.id)}
                ></button>
                <drag className="cursor-move">
                  <MdDragIndicator className=" hover:fill-gray-600 absolute fill-gray-400 right-2 top-[1.4px] rotate-90" />
                </drag>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}

export default App;
