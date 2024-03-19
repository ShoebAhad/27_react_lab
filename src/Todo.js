import React, { useState } from 'react';
import './index.css';

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const openModal = (id = null) => {
        setModalOpen(true);
        if (id !== null) {
            const taskToEdit = tasks.find(task => task.id === id);
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setSelectedTaskId(id);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setTitle('');
        setDescription('');
        setSelectedTaskId(null);
    };

    const handleTaskAction = () => {
        const action = selectedTaskId ? handleUpdateTask : handleCreateTask;
        action();
    };

    const handleCreateTask = () => {
        setTasks([...tasks, { id: Date.now(), title, description }]);
        closeModal();
    };

    const handleUpdateTask = () => {
        const updatedTasks = tasks.map(task =>
            task.id === selectedTaskId ? { ...task, title, description } : task
        );
        setTasks(updatedTasks);
        closeModal();
    };

    const handleDeleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="p-4">
            <div className='flex justify-evenly'>
                <div className="text-3xl font-mono mb-4">TASK MANAGER</div>
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded shadow hover:bg-blue-600"
                    onClick={() => openModal()}
                >
                    Create Task
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow w-96">
                        <h2 className="text-2xl font-bold mb-4">
                            {selectedTaskId ? 'Update Task' : 'Create Task'}
                        </h2>
                        <input
                            type="text"
                            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea
                            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        <div className="flex justify-between">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                                onClick={handleTaskAction}
                            >
                                {selectedTaskId ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-8">
                {tasks.map(task => (
                    <div key={task.id} className="bg-white p-4 rounded-md shadow-lg border mb-4 flex justify-between mx-2 lg:mx-32">
                        <div>
                            <h2 className="text-xl font-medium">{task.title}</h2>
                            <p className='font-light text-gray-600'>{task.description}</p>
                        </div>
                        <div className="flex justify-between mt-2 gap-x-5">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
                                onClick={() => openModal(task.id)}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-700 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;
