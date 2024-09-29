import { produce } from 'immer';
import { useState } from 'react'
import './App.css'

import TodoList from './components/TodoList'
import TodoWriteForm from './components/TodoWriteForm'

type setTodosType = {
  id: number
  title: string
}

// immer
// ルールとしては名の前にuseを付ける
// 今まで息子コンポーネント達に渡していた
// 様々なデータと関数などを一つにまとめて送る
const useTodoState = () => {
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
      // 既存のコード
      setTodos([...todos, newTodo])

      // immer produce
      // setTodos(produce(todos , (draft: setTodosType[]) => {
      //   draft.push(newTodo)
      // }))

      setLastTodoId(id)
    }
  
    // 削除関数
    const removeTodo = (id: number) => {
      // 既存のコード
      // const newTodos = todos.filter((_, _index) => index != _index)

      // immer produce
      setTodos(produce(todos, (draft: setTodosType[]) => {
        const index = draft.findIndex((todo) => todo.id === id)
        draft.splice(index, 1)
      }))
    }
  
    // 修正関数
    const modifyTodo = (todo: setTodosType) => {
      // 既存のコード
      // mapでpropertyを出力しながら
      // 修正するtodoのindexと既存のtodoのindexが一致した場合
      // その修正したtodoをnewTodosに保存する
      // const newTodos = todos.map((_todo, _index) => 
      //   _todo.id != id ? 
      //   { id: _todo.id, title:_todo.title} : 
      //   { id: todo.id, title: todo.title}
      // )      
      // setTodos(newTodos)

      // immer produce
      setTodos(produce(todos, (draft: setTodosType[]) => {
        const index = draft.findIndex((_todo) => _todo.id == todo.id)
        draft[index].title = todo.title
      }))
    }

    return {
      todos,
      lastTodoId,
      addTodo, 
      removeTodo,
      modifyTodo
    }

}

// App
const App = () => {
  const todoStatus = useTodoState()

  return (
    <>
      <div>
        <TodoWriteForm 
          todoStatus={todoStatus}
        />
      </div>
      <hr />
      <TodoList 
        todoStatus={todoStatus}
      />
    </>
  )
}

export default App
