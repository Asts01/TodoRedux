import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addTask, removeTask, updateTask } from './slices/taskSlice';
import { useState } from 'react';

export default function App() {
  const [editData, setEditData] = useState(''); // Separate state for editing
  const [editId, setEditId] = useState(null); // To track the task being edited and send to slice for updation
  const task = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch(); // for sending the input text data
  const [isDialogboxOpen, setIsDialogBoxOpen] = useState(false);
  const [data, setData] = useState('');

  const handleDelete = (id) => {
    dispatch(removeTask(id)); // Pass the id (date) to remove
  };

  const handleEditClick = (item) => {
    setEditId(item.date); // Set the task being edited
    setEditData(item.newdata); // Set the current task data in edit field
    setIsDialogBoxOpen(true); // Open dialog box
  };

  const handleEditSubmit = () => {
    if (editId && editData) {
      dispatch(updateTask({ date: editId, newdata: editData })); // Dispatch updated task
      setIsDialogBoxOpen(false); // Close dialog box
      setEditId(null); // Reset editing state
    }
  };

  const handleClick = () => {
    const date = Date.now();
    const alldata = {
      newdata: data,
      date,
    };
    dispatch(addTask(alldata));
    setData(''); // Clear input after adding task
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="bg-slate-500 text-white text-2xl font-bold p-3 rounded-md text-center">Todo-React-Redux</h1>
        <h2 className="bg-slate-300 text-xl font-semibold p-3 my-4 rounded-md text-center w-full">All Tasks</h2>
        <div className="flex justify-center items-center space-x-2 my-4">
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter task"
            className="border px-4 py-2 rounded-md w-full md:w-1/2"
          />
          <button
            onClick={(e) => handleClick(e)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-violet-700 pt-5">List of all the tasks</h3>
          {task.map((item, index) => (
            <div className="flex justify-between items-center w-full md:w-1/2 bg-slate-100 p-3 my-3 rounded-md shadow-md" key={index}>
              <p className="font-medium">{index + 1}. {item.newdata}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(item.date)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>

                {/* Dialog box for editing */}
                {isDialogboxOpen && item.date === editId ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={editData}
                      onChange={(e) => setEditData(e.target.value)} 
                      placeholder="Edit task"
                      className="border px-2 py-1 rounded-md mb-2"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleEditSubmit}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsDialogBoxOpen(false)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
