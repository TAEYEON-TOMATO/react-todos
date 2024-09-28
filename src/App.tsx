import { useState } from 'react'
import './App.css'
// Reactの暗黙的ルール
// 父母コンポーネントでは

// propsを受ける時、各propsごとにtypeを設定する
interface TodoWriteFormProps {
  // newTodoTitle: string
  // setNewTodoTile: React.Dispatch<React.SetStateAction<string>>
  addTodo: (newTodoTitle: string) => void
  // addTodo: () => void
}

type TodoListProps = {
  todos: string[]
  removeTodo: (index: number) => void
}

type TodoListItemProps = {
  todo: string
  index: number
  removeTodo: (index: number) => void
  todos: string[]
}

// TodoListの中のTodoListItem　component
// removeTodoの名前が被るので別名を付けよう
const TodoListItem = ({todo, index, removeTodo: _removeTodo} : TodoListItemProps) => {
  
  const removeTodo = () => {
    console.log("삭제");
    
    _removeTodo(index)
  }


  return (
    // indexを利用して番号を付けよう
    <li>
      {`${index + 1}: ${todo}`}
      <button onClick={removeTodo}>削除</button>  
    </li>
  )
}

// todoList component
const TodoList = ({todos, removeTodo}: TodoListProps) => {
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
            todos={todos}
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


const App = () => {
  const [todos, setTodos] = useState<string[]>([])

  
  // Todoを追加する関数
  const addTodo = (newTitle: string) => {
    if(newTitle.trim().length === 0) return;
    
    setTodos([...todos, newTitle.trim()])
  }

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, _index) => index != _index)
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
      />
    </>
  )
}

export default App
