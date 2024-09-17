import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem("todos");

    if (data) {
      let temp = JSON.parse(localStorage.getItem("todos"))
      setTodos(temp)
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);


  const handleAdd = () => {
    setTodos([...todos, { 'id': uuidv4(), 'text': todo, 'isFinished': false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheck = (e, id) => {
    let newTodos = [...todos]
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    newTodos[index].isFinished = !newTodos[index].isFinished;
    setTodos(newTodos);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleEdit = (e, id) => {
    let newTodos = todos.filter(item => {
      if (item.id === id) {
        setTodo(item.text)
      }

      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleShowFinished = ()=>{
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <main className='bg-slate-100 md:mx-auto md:w-1/2 min-h-[80vh] my-8 px-10 mx-2'>
        <h1 className='font-bold text-2xl text-center py-5'>iTask - Manage you todos at one place</h1>
        <h2 className='font-bold text-xl my-5'>Add a Todo</h2>
        <div className='flex gap-x-5'>
          <input className='w-[90%] rounded-full px-2 py-1' type="text" onChange={handleChange} value={todo} />
          <button className='bg-violet-700 text-white rounded-full px-3 py-1 font-bold hover:bg-violet-800 transition-all duration-100' onClick={handleAdd} disabled={todo.length < 1} >Save</button>
        </div>
        <div className="todos">
          <div className='my-5'>
          <input type="checkbox" className='mr-2' checked={showFinished} onChange={handleShowFinished}/>
          <span>Show finished todos</span>
          </div>
          
          <h2 className='font-bold text-xl my-5'>Your Todos</h2>
          {todos.length === 0 && "You have no todos :("}
          {todos.map((item) => {
            return (!item.isFinished || showFinished) && <div className="todo flex justify-between my-5" key={item.id}>
              <div className="container break-all w-[80%]">
                <input className='mr-2' type="checkbox" checked={item.isFinished} name={item.id} onChange={(e) => { handleCheck(e, item.id) }} />
                <span className={item.isFinished ? "line-through" : ""}>{item.text}</span>
              </div>
              <div className="buttons flex gap-x-2 h-9">
                <button className='bg-violet-700 text-white rounded-full px-3 py-1 font-bold hover:bg-violet-800 transition-all duration-100' onClick={(e) => (handleEdit(e, item.id))}><FaEdit /></button>
                <button className='bg-violet-700 text-white rounded-full px-3 py-1 font-bold hover:bg-violet-800 transition-all duration-100' onClick={(e) => (handleDelete(e, item.id))}><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </main>
    </>
  )
}

export default App
