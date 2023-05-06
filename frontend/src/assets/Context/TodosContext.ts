import { createContext, useReducer, useContext } from "react";

interface Task {
  name: string;
  isDone: boolean;
}

interface TodosState {
  tasks: Task[];
  numberOfDoneTasks: number;
  numberOfUndoneTasks: number;
  lastState: TodosState | null;
  sortTasks: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const listReducer = (state: TodosState, action: Action) => {
  const stateCopy = { ...state };
  const { tasks, lastState } = stateCopy;
  const { payload } = action;
  stateCopy.lastState = { ...state, lastState: null };
  switch (action.type) {
    case "ADD_TASK":
      stateCopy.tasks = [...tasks, payload];
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
      return { ...(lastState as TodosState) };
    default:
      return state;
  }
};

const initialState: TodosState = {
  tasks: [],
  numberOfDoneTasks: 0,
  numberOfUndoneTasks: 0,
  lastState: null,
  sortTasks: false,
};

const TodosContext = createContext<{
  state: TodosState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const TodosProvider: React.FC = ({ children }) => {
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
