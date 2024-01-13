import { useContext, useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import { CloudContext } from "../ContextAPI/Provider";
// import { useTodo } from "../contexts";

function TodoItem() {
  const { signer } = useContext(CloudContext);

  // File Has options
  // [] of { tokenURI(HashValue):"-/-", name:"-/-", owner:address }
  const [myFiles, setmyFiles] = useState([]);

  const getMyFiles = async () => {
    const ethres = require("ethers");

    console.log(signer);

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    const result = await contractInstance.getMyData();

    setmyFiles(result);

    console.log(Array.from(result));
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

  useEffect(() => {
    getMyFiles();
    signer ? <></> : (window.location.href = "/");
  }, []);

  return (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4/5">
      {myFiles.map((file, i) => (
        <ul key={i} className="list-none m-0 px-10">
          <li className="flex items-center justify-between border border-black rounded-lg px-3 py-1.5 shadow-sm shadow-white/50 duration-300 text-black mb-2">
            <div>
              <a
                href={"https://gateway.pinata.cloud/ipfs/" + file.tokenURI}
                target="_blank"
              >
                Open File
              </a>
            </div>
            <div>File Name: {file.name}</div>
            <div>Owner: {file.owner}</div>

            <button className="w-20 h-10 rounded-lg text-sm text-rose-600 border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0">
              Manage access
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default TodoItem;
