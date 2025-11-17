import React, { useEffect, useState } from "react";

const getItemsFromLocalStorage = ()=>{
  return JSON.parse(localStorage.getItem("todos")) || [];
}

const setItemLocalStorage = (todos)=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

export default function TodoApp(){

  const [task, setTask] = useState("");
  const[todos,setTodos] = useState(getItemsFromLocalStorage());

  useEffect(()=>{
    setItemLocalStorage(todos);
  },[todos]);

  const addTodo = ()=>{
    setTodos((prev)=>[...prev,{id:Date.now(), task: task.trim(), done: false} ])
    setTask("")
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter((item)=>item?.id != id))
  }

  const markAsDoneTodo = (id)=>{
    setTodos((prev)=>prev.map((t)=>(
      t.id === id ? {...t,done:!t.done} : t
    )))
  }

  return(
    <div>
      <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} />
      <button onClick={()=>addTodo()}>Add Todo</button>

      <h1>Todo App</h1>

      {
        todos.map((item,index=0)=>{
          return(
            <div key={index+1}>
              <p>{item?.id}</p>
              <p>{item?.task}</p>
              <p>{item?.done ? "Done" : "Not Done"}</p>
              <button onClick={()=>markAsDoneTodo(item?.id)}>Mark Done</button>
              <button onClick={()=>deleteTodo(item?.id)}>Delete</button>
            </div>
          )
        })
      }
    </div>
  )
}