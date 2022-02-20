import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'
import * as Pages from './pages'
import Loading from './components/Loading'

function App() {
  const loading = useSelector(state => state.data.loading)
  
  return (
    <>
       <Routes>
         <Route path='/login' element={<Pages.LoginPage/>}/>
         <Route path='/register' element={<Pages.RegisterPage/>}/>
         <Route path='/store' element={<Pages.StorePage/>}/>
         <Route path='/' element={<Pages.HomePage/>}/>
       </Routes>
       <Loading show={loading}/>
    </>
  )
}

export default App;
