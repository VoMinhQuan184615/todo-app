import { configureStore } from "@reduxjs/toolkit";
import { addTodo } from "@/features/todo/todoSlice";

export default configureStore({
  reducer: { addTodo },
});
