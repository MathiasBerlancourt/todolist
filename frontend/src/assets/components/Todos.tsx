import { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "./Todo";
import {
  BsFillTrashFill,
  BsFillPlusCircleFill,
  BsFillCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

interface Todo {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
}

const Todos = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        const responseTodos = await axios.get<Todo[]>(
          "http://localhost:3000/todos"
        );
        console.log(responseTodos.data);
        setTodos(responseTodos.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTodos();
  }, [todos]);

  const handleAddTodo = async (): Promise<void> => {
    try {
      const newTodo = { name: newTodoName, description: newTodoDescription };
      const responseTodo = await axios.post<Todo>(
        "http://localhost:3000/add",
        newTodo
      );
      setTodos([...todos, responseTodo.data]);
      setNewTodoName("");
      setNewTodoDescription("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveTodo = async (_id: string): Promise<void> => {
    try {
      const responseTodo = await axios.put<Todo>(
        `http://localhost:3000/delete/`,

        { _id: _id }
      );
      console.log(responseTodo.data);
      const responseGetTodos = await axios.get<Todo[]>(
        "http://localhost:3000/todos"
      );

      setTodos(responseGetTodos.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTodo = async (_id: string): Promise<void> => {
    try {
      const responseTodo = await axios.put<Todo>(
        `http://localhost:3000/complete/`,

        { _id: _id }
      );
      console.log(responseTodo.data);
      const responseGetTodos = await axios.get<Todo[]>(
        "http://localhost:3000/todos"
      );

      setTodos(responseGetTodos.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="  flex flex-col items-center space-y-16 ">
        <div className="">
          <div>
            <h1 className="text-3xl text-gray-500 py-4">☑︎ MY TODO LIST</h1>
          </div>
          <div className="flex  ">
            <div className="space-y-1 flex flex-col py-4 ">
              <input
                type="text"
                maxLength={30}
                required={true}
                className="text-md text-slate-500 w-80 pl-2 rounded-md focus:outline-none "
                placeholder="Tâche"
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
                aria-describedby="name-error"
              />
              {infoMessage && (
                <span className="text-orange-600">{infoMessage}</span>
              )}
              <textarea
                className="text-md text-slate-500 h-16 w-80 pl-2 rounded-md focus:outline-none "
                placeholder="Description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
              />
            </div>
            <button
              className="text-3xl text-blue-400 p-4 hover:text-blue-600"
              onClick={handleAddTodo}
            >
              <BsFillPlusCircleFill />
            </button>
          </div>
        </div>
        <div className="flex flex-col-reverse ">
          {todos.map((todo) => {
            return (
              <div className="flex items-center justify-between bg-gray-100 bg-opacity-70 py-2 px-4 border-gray-400 border rounded-xl w-96 my-0.5">
                <section className="flex items-center">
                  <div
                    className="text-red-400 text-2xl hover:text-red-500 pr-4"
                    onClick={() => handleRemoveTodo(todo._id)}
                  >
                    <BsFillTrashFill />
                  </div>
                  <Todo
                    key={todo._id}
                    _id={todo._id}
                    name={todo.name}
                    description={todo.description}
                    completed={todo.completed}
                  />
                </section>
                <section>
                  <div
                    className={
                      todo.completed
                        ? "text-green-500 text-2xl "
                        : "text-gray-400 text-2xl hover:text-gray-500 "
                    }
                    onClick={() => handleCompleteTodo(todo._id)}
                  >
                    {todo.completed ? (
                      <BsFillCheckCircleFill />
                    ) : (
                      <BsFillCircleFill />
                    )}
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Todos;
