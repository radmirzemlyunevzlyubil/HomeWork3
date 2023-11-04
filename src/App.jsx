import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
  const [newTaskInput, setNewTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskInput, setEditingTaskInput] = useState("");
  const dispatch = useDispatch();
  const { todos, favorites } = useSelector((state) => state);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
      dispatch({
        type: "GET_TODOS",
        payload: data.slice(0, 3),
      });
    };
    getData();
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      payload: newTaskInput,
    });
    setNewTaskInput(""); 
  };

  const handleAddToFavorites = (item) => {
    dispatch({
      type: "ADD_TO_FAVORITES",
      payload: item,
    });
  };

  const handleClearFavorites = () => {
    dispatch({
      type: "CLEAR_FAVORITES",
    });
  };

  const handleEditTodo = (id, title) => {
    dispatch({
      type: "EDIT_TODO",
      payload: { id, title: editingTaskInput }, 
    });
    setEditingTaskId(null);
    setEditingTaskInput("");
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: { id },
    });
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <form onSubmit={handleAddTodo}>
          <input
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            type="text"
            placeholder="Type something..."
          />
          <button className="add-button">Добавить</button>
        </form>
      </div>

      <div className="content-container">
        <div className="favorites">
          {favorites.length ? (
            <div className="favorites-container">
              <button className="clear-button" onClick={handleClearFavorites}>Clear Favorites</button>
              {favorites.map((item) => (
                <div className="task" key={item.id}>
                  {item.id + "." + item.title}
                </div>
              ))}
            </div>
          ) : (
            <h3 className="empty-favorites-text">Favorites is empty:( </h3>
          )}
        </div>

        <div className="tasks">
          {todos?.map((item) => (
            <div key={item.id}>
              {editingTaskId === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editingTaskInput}
                    onChange={(e) => setEditingTaskInput(e.target.value)}
                  />
                  <button onClick={() => handleEditTodo(item.id, editingTaskInput)}>Save</button>
                </div>
              ) : (
                <div className="task" onClick={() => setEditingTaskId(item.id)}>
                  {item.id + "." + item.title}
                </div>
              )}
              <button onClick={() => handleAddToFavorites(item)}>Like</button>
              <button onClick={() => setEditingTaskId(item.id)}>Edit</button>
              <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
