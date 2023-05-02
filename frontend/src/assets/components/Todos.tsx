import React, { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const responseTodos = await axios.get("http://localhost:3000/todos");
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
