import { useState } from 'react'
import './App.css'
// Reactの暗黙的ルール
// 最上コンポーネントは最低限の
// 関数とデータはなるべく息子コンポーネントで生成するように

// その理由：父母から渡ってきたuseStateを息子が実行したら
// 父母が実行されその息子たちも実行されることになる

// propsを受ける時、各propsごとにtypeを設定する
interface TodoWriteFormProps {
  // newTodoTitle: string
  // setNewTodoTile: React.Dispatch<React.SetStateAction<string>>
  addTodo: (newTodoTitle: string) => void
  // addTodo: () => void
}

type TodoListProps = {
  todos: string[]
  setTodos: React.Dispatch<React.SetStateAction<string[]>>
}

type TodoListItemProps = {
  todo: string
  index: number
  setTodos: React.Dispatch<React.SetStateAction<string[]>>
  todos: string[]
}

// TodoListの中のTodoListItem　component
const TodoListItem = ({todo, index, setTodos, todos} : TodoListItemProps) => {

  const removeTodo = () => {
    const newTodos = todos.filter((_, _index) => {
      // 削除ボタンを押したtodoのindexとは異なるindexを持つ
      return index !== _index
    });
    // todoの配列をsetTodosに代入する
    setTodos(newTodos)
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
const TodoList = ({todos, setTodos}: TodoListProps) => {
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
            setTodos={setTodos}
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
    console.log("addTodo2");
    
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
  // const [newTodoTitle, setNewTodoTile] = useState('')
  // string型の配列のタイプに設定
  const [todos, setTodos] = useState<string[]>([])

  
  // Todoを追加する関数
  const addTodo = (newTitle: string) => {
    // 前と後ろのスペースや空白を入力した時リターンする
    if(newTitle.trim().length === 0) return;
    
    setTodos([...todos, newTitle.trim()])
    // 入力後にはinputの中身を消す
    
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
        setTodos={setTodos}  
      />
    </>
  )
}

export default App
