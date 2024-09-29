import TodoListItem from "./TodoListItem"

// TodoListパラメータタイプ
type todoStatusProps = {
  todoStatus : {
    todos: {
      id: number
      title: string
    }[];
    lastTodoId: number;
    addTodo: (newTodoTitle: string) => void;
    removeTodo: (id: number) => void;
    modifyTodo: (todo: {
      id: number
      title: string
    }) => void;
  }
}

// todoList component
const TodoList = ({ todoStatus }: todoStatusProps) => {
  return (
    <div>
      {/* todoの表記をulとliで表す */}
      <ul>
        {todoStatus.todos.map((todo, index) => (
          // indexとkeyをpropsで渡す
          <TodoListItem 
            key={index} 
            id={todo.id} 
            todo={todo}
            removeTodo={todoStatus.removeTodo}
            modifyTodo={todoStatus.modifyTodo}
          />
        ))}
      </ul>
    </div>

  )
}

export default TodoList