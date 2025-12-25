const TodoCreatePage = () => {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Enter todo title"
        style={{ padding: 8, width: "80%" }}
      ></input>

      <button>Add</button>
    </div>
  );
};

export default TodoCreatePage;
