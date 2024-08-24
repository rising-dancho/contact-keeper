import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

// Context
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
// import AlertState from './context/alert/AlertState';
// auth
import setAuthToken from './utils/setAuthToken';

// load token into global headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        {/* <AlertState> */}
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                  </Route>
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </Router>
        {/* </AlertState> */}
      </ContactState>
    </AuthState>
  );
}

export default App;
