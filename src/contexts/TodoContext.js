import React, { createContext, useReducer, useContext, useEffect, useState } from "react";

// 초기 상태
const initialState = {
  todos: [], // 초기 Todo는 빈 배열로 설정
};

const defaultCategory = "전체";

// 리듀서 함수
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "MODI_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    case "SET_TODOS":
      return { ...state, todos: action.payload }; // API에서 가져온 Todos로 업데이트
    default:
      return state;
  }
};

// TodoContext 생성
const TodoContext = createContext();

// TodoProvider 컴포넌트
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // API에서 Todo 목록 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        dispatch({ type: "SET_TODOS", payload: data });
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); // 컴포넌트가 마운트 될 때 한 번만 실행

  // todos 상태가 변경될 때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch, selectedCategory, setSelectedCategory }}>
      {children}
    </TodoContext.Provider>
  );
};

// useTodos 훅
export const useTodos = () => useContext(TodoContext);