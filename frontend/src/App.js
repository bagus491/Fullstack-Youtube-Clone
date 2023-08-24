import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { NotFound } from './Pages/NotFound';
import { HomeWeb } from './Pages/HomeWeb';
import { LoginPage } from './Pages/Login';
import { RegisterPage } from './Pages/Register';

//saved
import { DasbordPage } from './Pages/Dasbord';

//auth
import { AuthProvider } from './AuthContext';


function App() {
  return (
   <>
   <Router>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<HomeWeb />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>

      {/* saved */}
      <Route path='/dasbord' element={< DasbordPage />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
    </AuthProvider>
   </Router>
   </>
  );
}

export default App;
