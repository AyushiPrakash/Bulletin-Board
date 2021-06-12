//STEP 1
import React, { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { FaMoon, FaSun } from "react-icons/fa";
var randomColor = require("randomcolor");

function App() {
  //STEP 2: Initialize states
  const [item, setItem] = useState(""); //array destructuring(items:state, setItem:function of state)
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );

  //DarkTheme
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  //Step 4: newitem
  const newitem = () => {
    if (item.trim() !== "") {
      const newitem = {
        id: uuidv4(),
        item: item,
        color: randomColor({ luminosity: "light" }),
        defaultPos: { x: 100, y: 0 },
      };
      //add this new item object to the items array
      setItems((items) => [...items, newitem]);
      //reset item value to empty string
      setItem("");
    } else {
      alert("Enter an item");
      setItem("");
    }
  };

  //Step 3: Create input element
  const keyPress = (e) => {
    var code = e.keyPress || e.which;
    if (code === 13) {
      newitem();
    }
  };

  //Step 4: newitem
  //useEffect: updates our localStorage every time our items array is updated
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  //Step 6: updatePos
  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  //Step 7: deleteNote
  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    //STEP 3: Create input element
    <div
      style={{
        backgroundColor: theme === "dark" ? "#282c34" : "#ffffff",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="App">
        <div id="new-item">
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter something..."
            onKeyPress={(e) => keyPress(e)}
          />
          <button
            style={{
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
            className="addButton"
            onClick={newitem}
          >
            ENTER
          </button>
          <span className="toggleButton" onClick={toggleTheme}>
            {theme === "light" && <FaMoon />}
            {theme === "dark" && <FaSun />}
          </span>
        </div>
        {items.map((item, index) => {
          //Step 5: Display items
          return (
            <Draggable
              key={item.id}
              defaultPosition={item.defaultPos}
              onStop={(e, data) => {
                updatePos(data, index);
              }}
            >
              <div style={{ backgroundColor: item.color }} className="box">
                {`${item.item}`}
                <button id="delete" onClick={(e) => deleteNote(item.id)}>
                  X
                </button>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}

export default App;
