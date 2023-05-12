import { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "./Todo";

interface Todo {
  _id: string;
  name: string;
  description: string;
}

const Todos = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");

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
  }, [newTodoName]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="">
        <div className="flex ">
          <h1>My Todo List</h1>

          <input
            type="text"
            placeholder="Name"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <div className="flex flex-col-reverse">
          {todos.map((todo) => {
            return (
              <div>
                <Todo
                  key={todo._id}
                  _id={todo._id}
                  name={todo.name}
                  description={todo.description}
                />
                <div onClick={() => handleRemoveTodo(todo._id)}>X</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Todos;
