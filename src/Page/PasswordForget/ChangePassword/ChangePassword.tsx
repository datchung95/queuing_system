import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ChangePassword.scss"

const ChangePassword = () => {

    const navigate = useNavigate();

    return (
        <form id="changePassword">
            <h4 className='text-center changePassword__title'>Đặt lại mật khẩu mới</h4>
            <div className='changePassword__fromTop'>
                <label>Mật khẩu</label>
                <input type="password" className='form-control' />
            </div>
            <div className='changePassword__fromBottom'>
                <label>Nhập lại mật khẩu</label>
                <input type="password" className='form-control' />
            </div>
            <div className='text-center'>
                <button className='button--orange' onClick={() => {navigate("/login")}}>Xác nhận</button>
            </div>
        </form>
    )
}

export default ChangePassword