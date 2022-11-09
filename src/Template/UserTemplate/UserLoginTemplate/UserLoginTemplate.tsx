import React from 'react'
import { Outlet } from 'react-router-dom'
import '../userTemplate.scss'

export default function UserLoginTemplate() {
    return (
        <div id='userLogin-template'>
            <div className='container-fluid'>
                <div className='row' style={{ minHeight: "100vh" }}>
                    <div className='col-5 d-flex justify-content-center userLogin-template__left'>
                        <div className='userLogin-template__outlet'>
                            <div className='text-center'>
                                <img className='userLogin-template__Logo' src={require("../../../assets/logo/Logo alta.png")} alt="logoalta" />
                            </div>
                            <Outlet />
                        </div>
                    </div>
                    <div className='col-7 userLogin-template__right'>
                        <div className='userLogin-template__right-img'>
                            <img className='userLogin-template__img' src={require("../../../assets/group/Group 341.png")} alt="group" />
                            <div className='userLogin-template__text'>
                                <p className='userLogin-template__textlight'>Hệ thống</p>
                                <h4 className='userLogin-template__textbold'>QUẢN LÝ XẾP HÀNG</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
