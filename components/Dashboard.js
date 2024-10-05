
import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [taskDeleted, setTaskDeleted] = useState('');
  const [editStates, setEditStates] = useState({});

  const fetchTasks = () => {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (taskDeleted) {
      const timer = setTimeout(() => {
        setTaskDeleted('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [taskDeleted]);

  const createTask = () => {
    if (!title || !description) {
      setErrorMessage('Please complete both fields before creating the task.');
      return;
    }
    const newTask = { title, description };

    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    }).then(() => {
      fetchTasks();
      setTitle('');
      setDescription('');
      setErrorMessage('');
    });
  };

  const updateTask = (id, updatedTitle, updatedDescription) => {
    if (!updatedTitle || !updatedDescription) {
      setErrorMessage('Please complete both fields before creating the task.');
      return;
    }

    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
    }).then(() => {
      fetchTasks();
      setErrorMessage('');
      setEditStates({ ...editStates, [id]: false });
    });
  };

  const deleteTask = (id) => {
    fetch(`/tasks/${id}`, {

      method: 'DELETE',

    }).then((response) => {

      return response.json();

    }).then(data => {
      if (data.message) {

        setTaskDeleted(`${data.message} - ${Date.now()}`);

      }

      fetchTasks();

    });
  };

  const handleInputChange = (id, field, value) => {
    const updatedTasks = tasks.map(t =>
      t._id === id ? { ...t, [field]: value } : t
    );
    setTasks(updatedTasks);


    setEditStates({ ...editStates, [id]: true });
  };

  return (
    <div className='comp-test-container-main'>
      <div className="comp-test-container">

        <h1 className="comp-test-title">Task List</h1>
        <div className="comp-test-form">
          <input
            type="text"
            placeholder="Tittle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="comp-test-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="comp-test-input"
          />
          <button onClick={createTask} className="comp-test-button">Make Task</button>
        </div>

        {errorMessage && <p className="comp-test-error">{errorMessage}</p>}
        {taskDeleted && <p className="message-deleted">{taskDeleted.split(' - ')[0]}</p>}
        <h2 className="comp-test-subtitle">Task List</h2>
        <ul className="comp-test-task-list">
          {tasks.map((task) => (
            <li key={task._id} className="comp-test-task-item">
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleInputChange(task._id, 'title', e.target.value)}
                onFocus={() => setEditStates({ ...editStates, [task._id]: true })}
                placeholder="Tittle"
                className="comp-test-input"
              />
              <input
                type="text"
                value={task.description}
                onChange={(e) => handleInputChange(task._id, 'description', e.target.value)}
                onFocus={() => setEditStates({ ...editStates, [task._id]: true })}
                placeholder="Description"
                className="comp-test-input"
              />

              {editStates[task._id] && (
                <button onClick={() => updateTask(task._id, task.title, task.description)} className="comp-test-button">
                  Save
                </button>
              )}
              <button onClick={() => deleteTask(task._id)} className="comp-test-delete-button">Delete</button>

            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Dashboard;
