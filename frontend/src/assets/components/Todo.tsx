export const Todo = ({ _id, name, description, completed }) => {
  const todoTimeStamp = new Date().toLocaleDateString();
  return (
    <div>
      <h2 className={completed ? "text-2xl line-through " : "text-2xl  "}>
        {name}
      </h2>

      <p className={completed ? "hidden " : "text-xs text-gray-600"}>
        {description}
      </p>
      <p className="text-xs text-gray-400 italic ">{todoTimeStamp}</p>
    </div>
  );
};
