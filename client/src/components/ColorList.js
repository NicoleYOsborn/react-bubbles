import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useParams, useHistory} from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const initialNewColor = {
  color: "",
  code: { hex: "" },
  id: Date.now()
};

const ColorList = ({ colors, updateColors }) => {
  console.log('these are colors', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialNewColor);
  const {id} = useParams(colors.id);
  const {push} = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('this is the result', res)
        document.querySelector('form').reset()
        updateColors(colors.map((c)=>{
          return c.id === res.data.id ? res.data : c
        }

        ))
        
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`, colorToEdit)
    .then(res => {
      console.log('this is the delete result', res)
      document.querySelector('form').reset()
      updateColors(colors.filter((c)=>{
        return c.id !== res.data
      }

      ))
      
    })
    .catch(err => console.log(err))
  };

  const saveNew = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .post(`/api/colors/${newColor.id}`, newColor)
      .then(res => {
        console.log('this is the result', res)
        document.querySelector('form').reset()
        updateColors(res.data)
        }

        )
        
      .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
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
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
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
      <div className="spacer" />
      <form onSubmit={saveNew}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            
          </div>
        </form>
    </div>
  );
};

export default ColorList;
