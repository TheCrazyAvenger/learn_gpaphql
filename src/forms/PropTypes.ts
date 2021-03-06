export type TodoFormProps = {
  createTodo: (...args: any) => void;
};

export type TodoEditFormProps = {
  updateTodo: (...args: any) => void;
  title: string;
  loading: boolean;
  setIsEditing: (...args: any) => void;
};
