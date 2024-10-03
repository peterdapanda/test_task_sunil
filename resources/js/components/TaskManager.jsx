import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    const addTask = async () => {
        await axios.post('/api/tasks', { title, description });
        setTitle('');
        setDescription('');
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Task Manager</h1>
            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Task Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="btn btn-primary w-100" onClick={addTask}>
                        Add Task
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <ul className="list-group">
                        {tasks.map((task) => (
                            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{task.title}</h5>
                                    <p>{task.description}</p>
                                </div>
                                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaskManager;
