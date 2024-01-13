import { useState } from "react";
// import { useTodo } from "../contexts";

function TodoItem() {
  const todos = [
    { id: 1, todo: "Todo msg" },
    { id: 2, todo: "Todo msg2" },
    { id: 3, todo: "Todo msg3" },
    { id: 4, todo: "Todo msg4" },
  ];

  const getMyFiles = async () => {
        

  };

  // const [todoMsg, setTodoMsg] = useState(todo.todo);
  // const { deleteTodo, updateTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    // updateTodo(todo.id, { ...todo, todo: todo.todoMsg })
    // setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    // toggleTodo(todo.id)
  };

  return (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4/5">
      {todos.map((todo) => (
        <ul key={todo.id} className="list-none m-0 px-10">
          <li className="flex items-center justify-between border border-black rounded-lg px-3 py-1.5 shadow-sm shadow-white/50 duration-300 text-black mb-2">
            <span className="flex-grow">{todo.todo}</span>
            <button
              className="w-20 h-10 rounded-lg text-sm text-rose-600 border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              // onClick={() => deleteTodo(todo.id)}
            >
              Manage access
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default TodoItem;
