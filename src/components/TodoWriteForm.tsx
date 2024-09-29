import { useState } from 'react'

// TodoWriteFormパラメータタイプ
interface TodoWriteFormProps {
  addTodo: (newTodoTitle: string) => void
  
}
// todo入力フォーム component
// addTodoの名が被るので別名を付けてみよう
const TodoWriteForm = ({ addTodo: _addTodo }: TodoWriteFormProps) => { 
  const [ newTodoTitle, setNewTodoTitle ] = useState("")

  // 関数の名前をリネームしよう
  const addTodo = () => {
    if(newTodoTitle.trim().length == 0) return;
    const title = newTodoTitle.trim()
    _addTodo(title)
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

export default TodoWriteForm