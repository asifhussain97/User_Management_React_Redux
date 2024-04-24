import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal, Button } from 'react-bootstrap';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Router>
        <div className='container-fluid'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/profile' element={<Profile/>} />

          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
