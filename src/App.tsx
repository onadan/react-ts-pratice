import { useRef, useState } from "react";

export default function App() {
  return (
    <>
      <div>
        <h1>Hello world</h1>
        <p>
          this app doesn't contain any css, mainly to pratice React typescript
        </p>
        <p>It includes a counter and a todo creator</p>
      </div>

      <Counter />
      <Todo />
      <h1>Unrelated</h1>
      <p>to pratice generic</p>
      <UserList />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setCount((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleIncrementBy = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(e.defaultPrevented);
    setCount((prev) => prev + Number(inputRef.current?.value));
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleDecrement}>Decrease Count</button>
      <button onClick={handleIncrement}>Increase Count</button>
      <br />
      <input type="number" placeholder="Enter number to add" ref={inputRef} />
      <button onClick={handleIncrementBy}>Increase</button>
    </div>
  );
}

function Todo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<string[]>([]);
  const addTodo = (): void => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      let todo = inputRef.current.value;
      setTodos((prev) => [...prev, todo]);
      inputRef.current.value = "";
    }
  };
  return (
    <>
      <h1>Todo</h1>
      <input type="text" placeholder="Enter your Todo" ref={inputRef} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </>
  );
}

interface ListItemProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
}

function ListItem<T>({ item, renderItem }: ListItemProps<T>): JSX.Element {
  return <div>{renderItem(item)}</div>;
}

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList(): JSX.Element {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
    // ...
  ];

  return (
    <div>
      {users.map((user) => (
        <ListItem<User> key={user.id} item={user} renderItem={renderUserItem} />
      ))}
    </div>
  );
}

function renderUserItem(user: User): React.ReactNode {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
