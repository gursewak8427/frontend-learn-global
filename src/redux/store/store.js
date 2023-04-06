import { configureStore } from '@reduxjs/toolkit'
import landingPageReducer from '../reducers/landingPage'

export const store = configureStore({
  reducer: {
    landingPage: landingPageReducer
  },
})

