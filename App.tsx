import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import AddDevice from './Page/Device/AddDevice/AddDevice';
import DetailDevice from './Page/Device/DetailDevice/DetailDevice';
import UpdateDevice from './Page/Device/UpdateDevice/UpdateDevice';
import AddService from './Page/Service/AddService/AddService';
import DetailService from './Page/Service/DetailService/DetailService';
import UpdateService from './Page/Service/UpdateService/UpdateService';
import AddNumber from './Page/Number/AddNumber/AddNumber';
import DetailNumber from './Page/Number/DetailNumber/DetailNumber';
import PositionManagement from './Page/System/PositionManagement/PositionManagement';
import AccountManagement from './Page/System/AccountManagement/AccountManagement';
import AddPosition from './Page/System/PositionManagement/AddPosition/AddPosition';
import UpdatePosition from './Page/System/PositionManagement/UpdatePosition/UpdatePosition';
import AddAccount from './Page/System/AccountManagement/AddAccount/AddAccount';
import UpdateAccount from './Page/System/AccountManagement/UpdateAccount/UpdateAccount';
import ActiveDiary from './Page/System/ActiveDiary/ActiveDiary';
import UserLogin from './Page/UserLogin/UserLogin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<DashboardTemplate />}>
          <Route index path='' element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='device' element={<Device />} />
          <Route path='device/adddevice' element={<AddDevice />} />
          <Route path='device/detaildevice' element={<DetailDevice />} >
            <Route path=':id'></Route>
          </Route>
          <Route path='device/updatedevice' element={<UpdateDevice />} >
            <Route path=':id'></Route>
          </Route>
          <Route path='service' element={<Service />} />
          <Route path='service/addservice' element={<AddService />} />
          <Route path='service/detailservice' element={<DetailService />} >
            <Route path=':maDichVu'></Route>
          </Route>
          <Route path='service/updateservice' element={<UpdateService />} >
            <Route path=':maDichVu'></Route>
          </Route>
          <Route path='number' element={<Number />} />
          <Route path='number/addnumber' element={<AddNumber />} />
          <Route path='number/detailnumber' element={<DetailNumber />} >
            <Route path=':id'></Route>
          </Route>
          <Route path='report' element={<Report />} />
          <Route path='system' element={<PositionManagement />} />
          <Route path='system/positionmanagement' element={<PositionManagement />} />
          <Route path='system/positionmanagement/addposition' element={<AddPosition />} />
          <Route path='system/positionmanagement/updateposition' element={<UpdatePosition />} >
            <Route path=':id'></Route>
          </Route>
          <Route path='system/accountmanagement' element={<AccountManagement />} />
          <Route path='system/accountmanagement/addaccount' element={<AddAccount />} />
          <Route path='system/accountmanagement/updateaccount' element={<UpdateAccount />} >
            <Route path=':id'></Route>
          </Route>
          <Route path='system/activediary' element={<ActiveDiary />} />
        </Route>
        <Route path='' element={<UserLoginTemplate />}>
          <Route path='login' element={<UserLogin />} />
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
