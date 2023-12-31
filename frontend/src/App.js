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

//adding
import { ProfileAdd } from './Pages/FormProfile';

//auth
import { AuthProvider } from './AuthContext';


function App() {
  return (
   <>
   <Router>
    <AuthProvider>
    <Routes>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
      <Route path='/watch/:id' element={<WatchVideo />}></Route>
      <Route path='/' element={< DasbordPage />}></Route>
      {/* saved */}
      <Route path='/dasbord/upload' element={<UploadPage />}></Route>
      <Route path='/profile/:PrName' element={<ProfilePage />}></Route>
      <Route path='/dasbord/setting' element={<SettingPage />}></Route>
      <Route path='/dasbord/add' element={<ProfileAdd />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
    </AuthProvider>
   </Router>
   </>
  );
}

export default App;
