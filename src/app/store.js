import { configureStore } from '@reduxjs/toolkit'
import flightSlice from './flightSlice'

export default configureStore({
  reducer: {
      flight: flightSlice   
  },
})