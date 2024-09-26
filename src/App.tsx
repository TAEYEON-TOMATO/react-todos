import { useState } from 'react'
import './App.css'

function App() {
  const [newTodoTitle, setNewTodoTile] = useState('')
  // string型の配列のタイプに設定
  const [todos, setTodos] = useState<string[]>([])

  const addTodo = () => {
    console.log(todos);
    
    setTodos([...todos, newTodoTitle])
    // 入力後にはinputの中身を消す
    setNewTodoTile('')
  }
  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder='Todoを入力してください' 
          value={newTodoTitle}
          onChange={(e) => setNewTodoTile(e.target.value)}
        />
        &nbsp;
        <button onClick={addTodo}>追加</button>
      </div>
      <hr />
      <div>{JSON.stringify(todos)}</div>
    </>
  )
}

export default App
