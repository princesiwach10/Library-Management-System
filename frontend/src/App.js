import './App.css';
import AllRoutes from './components/routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

export default App