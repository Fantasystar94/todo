import styles from "./List.module.css";
import "../default.css";
import { useEffect, useState } from "react";
import { useTodos } from "../contexts/TodoContext";  // TodoContext에서 가져오기

const List = () => {
const {selectedCategory, setSelectedCategory} = useTodos();
const categories = ['전체', '운동', '구매목록', '취미', '자기개발','기타'];
console.log(selectedCategory);
const categoryClick=(category)=>{
    setSelectedCategory(category);
}

useEffect(()=>{

},[selectedCategory]);
  return (
    <div className={styles.ListBox}>
      <ul className={styles.lists}>
        {
            categories.map((categories)=>(
                <li className={selectedCategory === categories ? styles.on : ""} key={categories} onClick={()=>categoryClick(categories)}>
                    {categories}
                </li>
            
            ))
        }
      </ul>
    </div>
  );
};
export default List;
