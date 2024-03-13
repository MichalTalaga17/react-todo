import React, { useState } from 'react';

const App = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Ukończyć kurs React',
      done: false,
    },
    {
      id: 2,
      text: 'Zrobić zakupy',
      done: false,
    },
    {
      id: 3,
      text: 'Napisać artykuł',
      done: true,
    },
  ]);

  const [filter, setFilter] = useState('all');

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: '',
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    }));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    }));
  };

  const getFilteredTodos = () => {
    if (filter === 'all') {
      return todos;
    }
    return todos.filter((todo) => todo.done === (filter === 'done'));
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  return (
    <div>
      <h1>Lista TODO</h1>
      <div>
        Filtruj:
        <button onClick={() => setFilter('all')}>Wszystkie</button>
        <button onClick={() => setFilter('active')}>Aktywne</button>
        <button onClick={() => setFilter('done')}>Ukończone</button>
      </div>
      <ul>
        {getFilteredTodos().map((todo) => (
          <li key={todo.id} className={isEditing === todo.id ? 'editing' : ''}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleTodo(todo.id)}
            />
            {isEditing === todo.id ? (
              <EditTodo
                todo={todo}
                onCancel={handleCancel}
                onSave={(newText) => handleEditTodo(todo.id, newText)}
                setIsEditing={setIsEditing} // Pass setIsEditing here
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.done ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>
            )}
            <button onClick={() => handleRemoveTodo(todo.id)}>Usuń</button>
            <button onClick={() => setIsEditing(todo.id)}>
              <i className="fa fa-edit"></i>
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddTodo}>Dodaj zadanie</button>
      
    </div>
  );
};

const EditTodo = ({ todo, onCancel, onSave, setIsEditing }) => { // Receive setIsEditing as prop
  const [text, setText] = useState(todo.text);

  const handleCancel = () => {
    onCancel(); // Use onCancel directly
  };

  const handleSave = () => {
    onSave(text);
    setIsEditing(null); // Use setIsEditing passed from props
  };

  return (
    <div className="edit-todo">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleCancel}>Anuluj</button>
      <button onClick={handleSave}>Zapisz</button>
    </div>
  );
};

export default App;
