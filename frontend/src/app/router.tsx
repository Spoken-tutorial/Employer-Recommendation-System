import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@features/home/HomePage'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <HomePage /> }]
  }
])
