import { useState } from 'react'
import './App.css'

import TodoList from './components/TodoList'
import TodoWriteForm from './components/TodoWriteForm'

type setTodosType = {
  id: number
  title: string
}


// App
const App = () => {
  // string[]だったuseStateをobject[]に変更
  const [ todos, setTodos ] = useState<setTodosType[]>([])
  const [ lastTodoId, setLastTodoId ] = useState(0)
  
  // Todoを追加する関数
  const addTodo = (newTodoTitle: string) => {
    if(newTodoTitle.trim().length === 0) return;
    
    const id = lastTodoId + 1;
    const title = newTodoTitle
    const newTodo = {
      id,
      title
    }

    setTodos([...todos, newTodo])
    setLastTodoId(id)
  }

  // 削除関数
  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, _index) => index != _index)
    setTodos(newTodos)
  }

  // 修正関数
  const modifyTodo = (index: number, todo: setTodosType) => {
    const newTodos = todos.map((_todo, _index) => 
      _index != index ? 
      { id: _todo.id, title:_todo.title} : 
      { id: todo.id, title: todo.title}
    )

    console.log("newTodos = ", newTodos);
    
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
