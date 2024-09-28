import { useState } from 'react'
import './App.css'
// Reactの暗黙的ルール

// propsを受ける時、各propsごとにtypeを設定する

// TodoWriteFormパラメータタイプ
interface TodoWriteFormProps {
  addTodo: (newTodoTitle: string) => void

}
// TodoListパラメータタイプ
type TodoListProps = {
  todos: string[]
  removeTodo: (index: number) => void
  modifyTodo: (index: number, todo: string) => void
}
// TodoListItemPropsパラメータタイプ
type TodoListItemProps = {
  todo: string
  index: number
  removeTodo: (index: number) => void
  modifyTodo: (index: number, todo: string) => void
}

// TodoListの中のTodoListItem　component
const TodoListItem = ({todo, index, removeTodo: _removeTodo, modifyTodo: _modifyTodo} : TodoListItemProps) => {
  
  const [ editMode, setEditMode ] = useState(false)
  const [ newTodoTitle, setNewTodoTitle ] = useState(todo)
  

  const modifyTodo = () => {
    if(newTodoTitle.trim().length == 0) return
    _modifyTodo(index, newTodoTitle)
    setEditMode(false)
  }
  
  const removeTodo = () => {
    _removeTodo(index)
  }

  const changeToEditMode = () => {
    setEditMode(true)
  }
  
  const changeToReadMode = () => {    
    setNewTodoTitle(todo)
    setEditMode(false)
  }
  



  return (

    <li>
      &nbsp;
      {
        editMode ? 
        <>
          <input 
            type='text' 
            placeholder="入力してください"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)} 
          />
          &nbsp;
          <button onClick={modifyTodo}>修正完了</button>
          &nbsp;
          <button onClick={changeToReadMode}>キャンセル</button>
        </> :
        <>
          {`${index + 1}: ${todo}`}
          &nbsp;
          <button onClick={changeToEditMode}>修正</button>
        </> 
      }
      &nbsp;
      <button onClick={removeTodo}>削除</button>  
    </li>
  )
}

// todoList component
const TodoList = ({todos, removeTodo, modifyTodo}: TodoListProps) => {
  return (
    <div>
      {/* todoの表記をulとliで表す */}
      <ul>
        {todos.map((todo, index) => (
          // indexとkeyをpropsで渡す
          <TodoListItem 
            key={index} 
            index={index} 
            todo={todo}
            removeTodo={removeTodo}
            modifyTodo={modifyTodo}
          />
        ))}
      </ul>
    </div>

  )
}

// todo入力フォーム component
// addTodoの名が被るので別名を付けてみよう
const TodoWriteForm = ({ addTodo: _addTodo }: TodoWriteFormProps) => { 
  const [ newTodoTitle, setNewTodoTitle ] = useState("")

  // 関数の名前をリネームしよう
  const addTodo = () => {
    if(newTodoTitle.trim().length == 0) return;

    _addTodo(newTodoTitle)

    setNewTodoTitle("")
  }

  return (
    <>
      <input 
        type="text" 
        placeholder='Todoを入力してください' 
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      &nbsp;

      <button onClick={addTodo}>
        追加
      </button>
    </>


  )
}


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
