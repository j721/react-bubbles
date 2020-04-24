import React, { useState } from "react";
// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ props, colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addedColor, setAddedColor] = useState({
    color: '',
    code:{hex: ''}
  })
  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  // Make a put request to save your updated color
  // think about where will you get the id from...
  // where is is saved right now?

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    props.history.push('/bubble-page');
  };

  // make a delete request to delete this color
  const deleteColor = (color) => {
    axiosWithAuth().delete(`/api/colors/${color.id}`)
    props.history.push('/bubble-page');
  };

  //stretch add color
  const addColor =e =>{
    e.preventDefault();
    console.log(addColor);

    axiosWithAuth()
    .post('/api/colors', addColor)
    .then(res=>{
        console.log(res)
        updateColors([...colors, addedColor])
      })
      .catch(err=>{
        console.log(err)
      })
    }


  const handleChange = e=>{
    setAddedColor({...addColor, [e.target.name]:e.target.value})
  }

  const handleHexChange = e =>{
    setAddedColor({...addColor, code: {hex: e.target.value}})
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      
      {/* stretch - build another form here to add a color */}
      <form onSubmit ={addColor}>
              <p>New Color</p>
              <input
                type="text"
                name="color"
                placeholder="color"
                value={addedColor.color}
                onChange ={handleChange}
              />
              <p>Hex Code</p>
              <input
                type="text"
                placeholder="hex"
                value = {addedColor.code.hex}
                name="hex"
                onChange ={handleHexChange}
              />
              <button>Add New Color</button>
      </form>
    </div>
  );
};

export default ColorList;
