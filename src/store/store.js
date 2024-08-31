import { configureStore } from '@reduxjs/toolkit'
import TaskSlice from '../slices/taskSlice'

const store =  configureStore({
  reducer: {
    task:TaskSlice,
  },
})

export default store;