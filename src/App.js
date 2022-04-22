import './App.css';
import 'react-bootstrap/dist/react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Navigation from './components/Navigation'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='container-fluid homepage vh-100'>
      <Navigation />
    </div>

  )
}

export default App;
