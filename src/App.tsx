import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLogin from './Page/UserLogin/UserLogin';
import UserLoginTemplate from './Template/UserTemplate/UserLoginTemplate/UserLoginTemplate';
import ForgetPasswordTemplate from './Template/UserTemplate/ForgetPasswordTemplate/ForgetPasswordTemplate';
import EnterEmail from './Page/PasswordForget/EnterEmail/EnterEmail';
import ChangePassword from './Page/PasswordForget/ChangePassword/ChangePassword';
import DashboardTemplate from './Template/DashboardTemplate/DashboardTemplate';
import Dashboard from './Page/Dashboard/Dashboard';
import Profile from './Page/Profile/Profile';
import Device from './Page/Device/Device';
import Service from './Page/Service/Service';
import Number from './Page/Number/Number';
import Report from './Page/Report/Report';
import System from './Page/System/System';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='' element={<DashboardTemplate />}>
          <Route index path='' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/device' element={<Device />} />
          <Route path='/service' element={<Service />} />
          <Route path='/number' element={<Number />} />
          <Route path='/report' element={<Report />} />
          <Route path='/system' element={<System />} />
        </Route>
        <Route path='' element={<UserLoginTemplate />}>
          <Route path='/login' element={<UserLogin />} />
        </Route>
        <Route path='' element={<ForgetPasswordTemplate />}>
          <Route path='enteremail' element={<EnterEmail />} />
          <Route path='changepass' element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
