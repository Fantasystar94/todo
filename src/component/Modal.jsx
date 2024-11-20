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
  const handleSubmit = (e) => {
    e.preventDefault();

    if(category==='전체'){
      alert('카테고리를 선택해주세요')
      return
    }

    const newTodo = {
      id:JSON.parse(localStorage.getItem('todolist')).length+1,
      content: todo,
      date: today,
      category: category,
    };

    dispatch({ type: "ADD_TODO", payload: newTodo });

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