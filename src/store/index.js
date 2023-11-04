import { createStore } from "redux";

const initialState = {
  todos: [],
  isLoaded: false,
  favorites: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TODOS":
      console.log("ACTION IS SUCCESS", action.payload);
      return {
        ...state,
        todos: [...action.payload],
      };
    case "ADD_TODO":
      const todo = {
        id: state.todos.length + 1,
        title: action.payload,
        user_id: 1,
        completed: false,
      };
      console.log(todo);
      return {
        ...state,
        todos: [...state.todos, todo],
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "CLEAR_FAVORITES":
      return {
        ...state,
        favorites: [],
      };
    case "EDIT_TODO":
      const editedTodos = state.todos.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title }
          : item
      );
      return {
        ...state,
        todos: editedTodos,
      };
    case "DELETE_TODO":
      const filteredTodos = state.todos.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        todos: filteredTodos,
      };
    default:
      return state;
  }
};

const store = createStore(todosReducer);

export default store;
