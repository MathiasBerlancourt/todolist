export const Todo = ({ _id, name, description }) => {
  const todoTimeStamp = new Date().toLocaleDateString();
  return (
    <div>
      <h2 className="text-red-500">{name}</h2>

      <p>{description}</p>
      <p>{todoTimeStamp}</p>
    </div>
  );
};
