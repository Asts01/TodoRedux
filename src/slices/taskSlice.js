import { createSlice } from '@reduxjs/toolkit'
import { retry } from '@reduxjs/toolkit/query';
import { act } from 'react';

export const TaskSlice = createSlice({
    name: 'task',
    initialState: {
      tasks: [],//all the tasks {data,date(id)}
    },
    reducers: {
        //data,id(date)
        addTask:(state,action)=>{
            state.tasks.push(action.payload);
        },
        //id(date)
        removeTask:(state,action)=>{
            //here on action we come with action.payload
            //assign new value to the tasks
            //in callback we have the values we want to keep
            //these task are tasks - []
            // console.log(task.data, action.payload)
            // state.tasks=state.tasks.filter((task,index)=>task.data!==action.payload);
            const filtered = state.tasks.filter((task) => {
                // console.log(task.date, action.payload);
                return task.date !== action.payload;
            });
            // console.log(filtered);
            state.tasks = filtered;            
        },
        //action.payload={newData,date}
        //since action.payload contains object
        //bring old-id and newData form action.payload and update the state
        updateTask:(state,action)=>{
            const updatedTasks=state.tasks.map((task)=>{
                if(task.date===action.payload.date){
                    return  action.payload;
                }else{
                    return task;
                }
            })
            state.tasks=updatedTasks;
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { addTask,removeTask,updateTask } = TaskSlice.actions
  
  export default TaskSlice.reducer