import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as Pages from './pages'
import './App.css'

function App() {
  
  return (
    <>
       <Routes>
         <Route path='/login' element={<Pages.LoginPage/>}/>
         <Route path='/register' element={<Pages.RegisterPage/>}/>
         <Route path='/store' element={<Pages.StorePage/>}/>
         <Route path='/' element={<Pages.HomePage/>}/>
       </Routes>
    </>
  )
}

export default App;
