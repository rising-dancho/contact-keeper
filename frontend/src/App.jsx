import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import ContactState from './components/context/contact/ContactState';
import AuthState from './components/context/auth/AuthState';
import AlertState from './components/context/alert/alertState';

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
