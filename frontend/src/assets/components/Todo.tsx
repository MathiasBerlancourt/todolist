export const Todo = ({ _id, name, description }) => {
  return (
    <div>
      <h2>{name}</h2>

      <p>{description}</p>
    </div>
  );
};
