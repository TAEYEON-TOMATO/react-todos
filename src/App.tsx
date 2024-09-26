import { useState } from 'react'
import './App.css'

// propsを受ける時、各propsごとにtypeを設定する
type TodoWriteFormProps = {
  newTodoTitle: string
  setNewTodoTile: React.Dispatch<React.SetStateAction<string>>
  addTodo: () => void
}

const TodoWriteForm = ({newTodoTitle, setNewTodoTile, addTodo}: TodoWriteFormProps) => {
  return (
    <>
      <input 
        type="text" 
        placeholder='Todoを入力してください' 
        value={newTodoTitle}
        onChange={(e) => setNewTodoTile(e.target.value)}
      />
      &nbsp;
      <button onClick={addTodo}>追加</button>
    </>


  )
}


const App = () => {
  const [newTodoTitle, setNewTodoTile] = useState('')
  // string型の配列のタイプに設定
  const [todos, setTodos] = useState<string[]>([])

  // Todoを追加する関数
  const addTodo = () => {
    // 前と後ろのスペースや空白を入力した時リターンする
    if(newTodoTitle.trim().length === 0) return;
    setTodos([...todos, newTodoTitle.trim()])
    // 入力後にはinputの中身を消す
    setNewTodoTile('')
  }

  return (
    <>
      <div>
        <TodoWriteForm 
          newTodoTitle={newTodoTitle} 
          setNewTodoTile={setNewTodoTile} 
          addTodo={addTodo} 
        />
      </div>
      <hr />
      <div>{JSON.stringify(todos)}</div>
    </>
  )
}

export default App
