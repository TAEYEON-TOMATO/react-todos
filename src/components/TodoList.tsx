import TodoListItem from "./TodoListItem"

type setTodosType = {
  id: number
  title: string
}


// TodoListパラメータタイプ
type TodoListProps = {
  todos: setTodosType[]
  removeTodo: (index: number) => void
  modifyTodo: (index: number, todo: setTodosType) => void
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

export default TodoList