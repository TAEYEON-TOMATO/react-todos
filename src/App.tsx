import { useState } from 'react'
import './App.css'

// propsを受ける時、各propsごとにtypeを設定する
type TodoWriteFormProps = {
  newTodoTitle: string
  setNewTodoTile: React.Dispatch<React.SetStateAction<string>>
  addTodo: () => void
}

type TodoListProps = {
  todos: string[]
}

type TodoListItem = {
  todo: string
  index: number
}

// TodoListの中のTodoListItem　component
const TodoListItem = ({todo, index} : TodoListItem) => {
  return (
    // indexを利用して番号を付けよう
    <li>{`${index + 1}: ${todo}`}</li>
  )
}

// todoList component
const TodoList = ({todos}: TodoListProps) => {
  return (
    <div>
      {/* todoの表記をulとliで表す */}
      <ul>
        {todos.map((todo, index) => 
          // indexとkeyをpropsで渡す
          (<TodoListItem key={index} index={index} todo={todo} />)
        )}
      </ul>
    </div>

  )
}

//　todo入力フォーム component
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
      <TodoList todos={todos} />
    </>
  )
}

export default App
