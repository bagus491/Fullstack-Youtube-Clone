import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { NotFound } from './Pages/NotFound';
import { HomeWeb } from './Pages/HomeWeb';
import { LoginPage } from './Pages/Login';
import { RegisterPage } from './Pages/Register';
import { WatchVideo } from './Pages/WatchVideo';

//saved
import { DasbordPage } from './Pages/Dasbord';
import { UploadPage } from './Pages/Upload';
import { ProfilePage } from './Pages/Profile';
import { SettingPage } from './Pages/Setting';


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
      <Route path='/watch/:id' element={<WatchVideo />}></Route>
      {/* saved */}
      <Route path='/dasbord' element={< DasbordPage />}></Route>
      <Route path='/dasbord/upload' element={<UploadPage />}></Route>
      <Route path='/dasbord/profile' element={<ProfilePage />}></Route>
      <Route path='/dasbord/setting' element={<SettingPage />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
    </AuthProvider>
   </Router>
   </>
  );
}

export default App;
