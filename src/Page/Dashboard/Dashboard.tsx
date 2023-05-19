import React, { useEffect } from 'react'
import User from '../../component/User/User'
import "./Dashboard.scss"
import NumberBlock from './NumberBlock/NumberBlock';
import CalendarDashboard from './Calendar/CalendarDashboard';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { getAllDataAction } from '../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { DEVICES, SERVICES } from '../../redux/Const/Const';
import { getAllDevices } from '../../redux/Reducers/DeviceReducer/DeviceReducer';
import { getAllServiceReducer } from '../../redux/Reducers/ServiceReducer/ServiceReducer';

export default function Dashboard() {

    const arrDevice = useAppSelector(state => state.DeviceReducer.arrDevice)

    const arrService = useAppSelector(state => state.ServiceReducer.arrService)

    const arrDeviceFill = arrDevice.filter(item => item.hoatDong === "Hoạt động")
    
    const arrSeviceFill = arrService.filter(item => item.trangThaiHoatDong === "Hoạt động")

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllDataAction(DEVICES, getAllDevices))
        dispatch(getAllDataAction(SERVICES, getAllServiceReducer))
    }, [])

    return (
        <div id="dashboard" className='container-page'>
            <div className='container-fluid dashboard__header'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title'>Dashboard</h4>
                        <div className='dashboard__left'>
                            <div className='dashboard__leftContent'>
                                <h4 className='text--titleBottom'>Tổng quan</h4>
                                <NumberBlock quantityDevice={arrDevice.length} quantityService={arrService.length} quantityDeviceAction={arrDeviceFill.length} quantitySeviceAction={arrSeviceFill.length} />
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='dashboard__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                            <div className='dashboard__rightContent'>
                                <h4 className='text--titleBottom'>Lịch</h4>
                                <CalendarDashboard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
