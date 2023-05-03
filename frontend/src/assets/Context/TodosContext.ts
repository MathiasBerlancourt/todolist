import { createContext, useReducer, useContext } from "react";

const listReducer = (state, action) => {
  const stateCopy = structuredClone(state);
  const { tasks, lastState } = stateCopy;
  const { payload } = action;
  stateCopy.lastState = { ...state, lastState: null };
  switch (action.type) {
    case "ADD_TASK":
      stateCopy.tasks = [...tasks, action.payload];
      stateCopy.numberOfUndoneTasks++;
      return stateCopy;
    case "REMOVE_TASK":
      stateCopy.tasks = tasks.filter((elem) => elem.name !== payload.name);
      if (payload.isDone) stateCopy.numberOfDoneTasks--;
      else stateCopy.numberOfUndoneTasks--;
      return stateCopy;
    case "TOGGLE_TASK":
      stateCopy.tasks[payload.index].isDone =
        !stateCopy.tasks[payload.index].isDone;
      if (payload.isDone) {
        stateCopy.numberOfDoneTasks--;
        stateCopy.numberOfUndoneTasks++;
      } else {
        stateCopy.numberOfDoneTasks++;
        stateCopy.numberOfUndoneTasks--;
      }
      return stateCopy;
    case "RESET":
      return {
        tasks: [],
        numberOfDoneTasks: 0,
        numberOfUndoneTasks: 0,
        lastState: null,
        sortTasks: false,
      };
    case "TOGGLE_SORT_TASKS":
      stateCopy.sortTasks = !state.sortTasks;
      return stateCopy;
    case "UNDO_LAST_EVENT":
      return { ...lastState };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  numberOfDoneTasks: 0,
  numberOfUndoneTasks: 0,
  lastState: null,
  sortTasks: false,
};

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, initialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;

export const useTodosContext = () => {
  return useContext(TodosContext);
};
