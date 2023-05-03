import { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  _id: string;
  name: string;
  description: string;
}

const Todos = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
          </div>
        ))}
      </>
    );
  }
};

export default Todos;
