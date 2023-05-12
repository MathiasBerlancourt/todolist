export const Todo = ({ _id, name, description }) => {
  return (
    <div className="flex flex-col-reverse">
      <div>
        <h2 className="text-red-500">{name}</h2>

        <p>{description}</p>
      </div>
    </div>
  );
};
