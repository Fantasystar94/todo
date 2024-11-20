import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { useTodos } from "../contexts/TodoContext";  // TodoContext에서 가져오기
import Modal from './Modal';
const Main = () => {
  const { state,selectedCategory,dispatch } = useTodos();
  const [filterTodoList,setFilterTodolist] = useState([]);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [editId,setEditId] = useState(null);
  const [editContent,setEditContent] = useState('');
  const [category, setCategory] = useState("전체");

  const openModal = ()=>{
    setIsModalOpen(true);
  }

  const closeModal = ()=>{
    setIsModalOpen(false);
  }

  const todoModi = (id,content)=>{
    setEditId(id);
    setEditContent(content); 
  }

  const modiCompl = async (id)=>{
    if(category==='전체'){
      alert('카테고리를 선택해주세요')
      return
    }

    const updatedTodo = {
      id: id,
      content: editContent,
      category: category,
    };
  
    try {
      // 서버에 PUT 요청 보내기
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
  
      if (response.ok) {
        const modifiedTodo = await response.json();
  
        // 리듀서에 수정된 todo 전달
        dispatch({ type: "MODI_TODO", payload: modifiedTodo });
  
        // 수정 완료 후 상태 초기화
        setEditId(null);
        setEditContent("");
      } else {
        alert("할 일 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error modifying todo:", error);
      alert("서버와의 연결에 문제가 있습니다.");
    }
    setEditId(null)
  }

  const todoDel = async (id)=>{
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        // 서버에 DELETE 요청 보내기
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          // 서버에서 삭제 성공 시, 리듀서에 DELETE_TODO 액션 보내기
          dispatch({ type: "DELETE_TODO", payload: id });
        } else {
          alert("할 일 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
        alert("서버와의 연결에 문제가 있습니다.");
      }
    }
  
    
  }
  useEffect(() => {
    const filterTodoList = [...state.todos].sort((a,b)=>b.id-a.id);
    if(selectedCategory==='전체'){
      setFilterTodolist(filterTodoList)
    }
    else{
      setFilterTodolist(
        filterTodoList.filter((todo)=>todo.category === selectedCategory)
      )
    }
  }, [state,selectedCategory]);

  return (
    <div className={styles.main}>
      <div className={styles.mainBox}>
      <div className={styles.modalBtn}>
        <button type="button" onClick={openModal} className={styles.addButton}>일정 등록하기</button>
      </div>
        <ul className={styles.todoLists}>
          {filterTodoList.map((todo) => (
            <li className={styles.listsLi } key={todo.id}>
              <div className={styles.List}>
                
                {editId===todo.id?<input type="text" className={styles.content} value={editContent} onChange={(e)=>setEditContent(e.target.value)}></input> : <h1 className={styles.content}>{todo.content}</h1>}
                <div className={styles.dateWrap}>
                  <div className={styles.date}>{todo.date}</div>
                  {editId===todo.id? 
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
                  :
                  <div className={styles.cate}>{todo.category}</div>
                  }
                </div>
                <div className={styles.buttonWrap}>
{                 editId===todo.id? <button type="button" onClick={()=>modiCompl(todo.id)} className={styles.modi}>
                    완료
                  </button>:<button type="button" onClick={()=>todoModi(todo.id,todo.content)} className={styles.modi}>
                    수정
                  </button>}
                  <button type="button" onClick={()=>todoDel(todo.id)} className={styles.del}>
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default Main;