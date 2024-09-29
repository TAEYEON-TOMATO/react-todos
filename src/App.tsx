import { useState } from 'react'
import './App.css'

import TodoList from './components/TodoList'
import TodoWriteForm from './components/TodoWriteForm'

// App
const App = () => {
  const [todos, setTodos] = useState<string[]>([])

  
  // Todoを追加する関数
  const addTodo = (newTitle: string) => {
    if(newTitle.trim().length === 0) return;
    
    setTodos([...todos, newTitle.trim()])
    // 아래와 같이 쓰는건 연속적을 useState를 쓰고싶을떄다 
    // setTodos((_todos) => [..._todos, newTitle.trim()])
  }

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, _index) => index != _index)
    setTodos(newTodos)
  }

  const modifyTodo = (index: number, todo: string) => {
    const newTodos = todos.map((_todo, _index) => index != _index ? _todo : todo)
    setTodos(newTodos)
  }

  return (
    <>
      <div>
        <TodoWriteForm 
          addTodo={addTodo}
        />
      </div>
      <hr />
      <TodoList 
        todos={todos} 
        removeTodo={removeTodo}
        modifyTodo={modifyTodo}
      />
    </>
  )
}

export default App
