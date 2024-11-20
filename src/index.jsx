import React from "react";
import ReactDOM from "react-dom";
import { TodoProvider } from "./context/TodoContext"; // TodoProvider 가져오기
import App from "./App";

ReactDOM.render(
  <TodoProvider>
    <App />
  </TodoProvider>,
  document.getElementById("root")
);