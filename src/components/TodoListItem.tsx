import { useState } from 'react'


// TodoListItemPropsパラメータタイプ
type TodoListItemProps = {
  todo: {
    id: number
    title: string
  }
  id: number
  removeTodo: (id: number) => void
  modifyTodo: (todo: {
    id: number
    title: string
  }) => void
}

// TodoListの中のTodoListItem　component
const TodoListItem = ({todo, id, removeTodo: _removeTodo, modifyTodo: _modifyTodo} : TodoListItemProps) => {
  
  const [ editMode, setEditMode ] = useState(false)
  const [ newTodoTitle, setNewTodoTitle ] = useState(todo)
  
  // 修正関数
  const modifyTodo = () => {
    if(newTodoTitle.title.trim().length == 0) return
    
    _modifyTodo(newTodoTitle)
    setEditMode(false)
  }
  // 削除関数
  const removeTodo = () => {
    _removeTodo(id)
  }
  // 修正入力欄をonにする関数
  const changeToEditMode = () => {
    setEditMode(true)
  }
  // 修正入力欄をoffにする関数
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
            value={newTodoTitle.title}
            onChange={(e) => setNewTodoTitle({
              id: todo.id,
              title: e.target.value
            })} 
          />
          &nbsp;
          <button onClick={modifyTodo}>修正完了</button>
          &nbsp;
          <button onClick={changeToReadMode}>キャンセル</button>
        </> :
        <>
          {`${todo.id}: ${todo.title}`}
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