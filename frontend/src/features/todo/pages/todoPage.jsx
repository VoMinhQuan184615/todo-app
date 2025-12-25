import TodoCreatePage from "./todoCreatePage";

const TodoPage = () => {
  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Todo App</h2>

      {/* Input thêm task */}
      <TodoCreatePage />
    </div>
  );
};

export default TodoPage;
