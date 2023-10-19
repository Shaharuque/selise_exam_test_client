import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import Toss from './pages/Toss';

function App() {

  return (
    <div>
      <Router>
          <Routes>
            <Route path='/test' element={<Test/>}></Route>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home></Home>}></Route>
              <Route path='dashboard' element={<Dashboard></Dashboard>}></Route>
              <Route path='toss' element={<Toss></Toss>}></Route>
            </Route>
          </Routes>
      </Router>
    </div>
  )
}

export default App
