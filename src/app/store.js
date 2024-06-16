import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../feautres/todo/todoSlice'



export const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  })