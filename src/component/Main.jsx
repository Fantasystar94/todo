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

  const modiCompl = (id)=>{
    if(category==='전체'){
      alert('카테고리를 선택해주세요')
      return
    }
    dispatch({type: "MODI_TODO",
      payload:{
        id:id,
        content:editContent,
        category:category
      }
    })
    setEditId(null)
  }

  const todoDel = (id)=>{
    window.confirm('삭제하시겠습니까?') && dispatch({ type: "DELETE_TODO", payload: id });
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