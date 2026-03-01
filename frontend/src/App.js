import {BrowserRouter,Routes,Route} from 'react-router-dom'

// Pages and Components Imports
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar'

/**
 * App Component
 * Root component of the application
 * Sets up routing and layout structure
 */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation bar displayed on all pages */}
        <Navbar/>
        
        {/* Main content area with routes */}
        <div className='pages'>
          <Routes>
            {/* Default route: displays all workouts and form */}
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
