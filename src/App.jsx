import React,{useState,useEffect} from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import Todo from './components/Todo';
import {db} from './FirebaseSetting/firebase'
import { query,collection, doc,onSnapshot, QuerySnapshot, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { useCallback } from 'react';
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {

  const [todos,setTodos]=useState([])
  const [input,setInput]=useState('')

  //Create todo

const createTodo=useCallback(async(e)=>{
  e.preventDefault(e)//새로고침방지
  if(input===''){
    alert('아무것도없습니다')
    return
  }
  await addDoc(collection(db,'todos'),{
    text:input,
    completed:false,
  })
  setInput('')

})

const deleteTodo=useCallback(async(Id)=>{ 
  const ok =window.confirm('삭제할꺼야?')
  if(ok){
    await deleteDoc(doc(db,'todos',Id))
  }
  
})


  useEffect(()=>{
    const q=query(collection(db,'todos'))
    const unsubscribe=onSnapshot(q,(querySnapshot)=>{
      let todosArr=[]
      querySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(),id:doc.id})
      })
      setTodos(todosArr)
        })
        return()=>unsubscribe()
  },[])

  const toggleComplete=useCallback(async(todo)=>{
      await updateDoc(doc(db,'todos',todo.id),{
        completed: !todo.completed
      })
  },[])
  

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>TODO APP</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type="text" placeholder="ADD TODO"></input>
          <button type='submit' className={style.button}><AiOutlinePlusCircle size={30}></AiOutlinePlusCircle></button>
        </form>
        <ul>
          <li>
            {todos.map((todo,index)=>(
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}></Todo> 
            ))}  
          </li>
        </ul>
        {todos.length<1?null: <p className={style.count}>{`yo have ${todos.length} todos`}</p>}
             
      </div>
   
    </div>
  );
}

export default App;
