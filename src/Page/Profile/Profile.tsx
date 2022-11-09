import React from 'react'
import User from '../../component/User/User'
import './Profile.scss'

export default function Profile() {
    return (
        <div id='profile' className='container-page'>
            <div className='d-flex justify-content-between align-items-center profile__header container-page-header'>
                <h4 className='text--titleDashboard profile__title'>Thông tin cá nhân</h4>
                <User />
            </div>
            <div className='profile__content position-relative container-fluid'>
                <div className='row'>
                    <div className='profile__contentLeft col-3 d-flex justify-content-center'>
                        <div>
                            <div>
                                <div>
                                    <img className='profile__contentLeftAvatar' src={require("../../assets/group/unsplash_Fyl8sMC2j2Q.png")} alt="camera" />
                                </div>
                                <img className='profile__contentLeftIcon' src={require("../../assets/icon/Camera.png")} alt="camera" />
                            </div>
                            <p className='profile__contentLeftName'>Lê Quỳnh Ái Vân</p>
                        </div>
                    </div>
                    <div className='profile__contentRight col-9'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div style={{ marginBottom: "24px" }}>
                                        <label>Tên người dùng</label>
                                        <input value="Lê Quỳnh Ái Vân" disabled={true} className="form-control" />
                                    </div>
                                    <div style={{ marginBottom: "24px" }}>
                                        <label>Số điện thoại</label>
                                        <input value="0767375921" disabled={true} className="form-control" />
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <input value="adminSS01@domain.com" disabled={true} className="form-control" />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div style={{ marginBottom: "24px" }}>
                                        <label>Tên đăng nhập</label>
                                        <input value="lequynhaivan01" disabled={true} className="form-control" />
                                    </div>
                                    <div style={{ marginBottom: "24px" }}> 
                                        <label>Mật khẩu</label>
                                        <input value="311940211" disabled={true} className="form-control" />
                                    </div>
                                    <div>
                                        <label>Vai trò</label>
                                        <input value="Kế toán" disabled={true} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
