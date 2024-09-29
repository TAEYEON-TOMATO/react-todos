import { useState } from 'react'

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

export default TodoListItem