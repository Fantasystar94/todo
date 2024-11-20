import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css"; 
import { useTodos } from "../contexts/TodoContext";
const Modal = ({ closeModal }) => {
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("전체");
  const { state, dispatch } = useTodos();

  // 오늘 날짜 계산
  const today = new Date().toISOString().split("T")[0];
  useEffect(()=>{

  },[todo]);
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(category==='전체'){
      alert('카테고리를 선택해주세요')
      return
    }

    const newTodo = {
      content: todo,
      date: today,
      category: category,
    };

    try {
      // 서버에 POST 요청 보내기
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const addedTodo = await response.json();
        // 새롭게 추가된 Todo를 리듀서로 전달
        dispatch({ type: "ADD_TODO", payload: addedTodo });
        closeModal();
      } else {
        alert("할 일을 추가하는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("서버와의 연결에 문제가 있습니다.");
    }


    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>할 일 추가</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="todo" className={styles.label}>
              할 일
            </label>
            <input
              type="text"
              id="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className={styles.input}
              placeholder="할 일을 입력하세요"
              required
            />
          </div>

          {/* 숨겨진 날짜 입력 */}
          <input type="hidden" id="date" value={today} />

          {/* 카테고리 선택 */}
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              카테고리
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="전체">전체</option>
              <option value="운동">운동</option>
              <option value="구매목록">구매목록</option>
              <option value="취미">취미</option>
              <option value="자기개발">자기개발</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* 버튼 */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              추가
            </button>
            <button type="button" onClick={closeModal} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;