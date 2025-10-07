import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <header style={{ marginBottom: 16 }}>
        <b>{import.meta.env.VITE_APP_NAME}</b> • <Link to="/">Home</Link>
      </header>
      <Outlet />
    </div>
  )
}
