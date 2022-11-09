import React from 'react'
import './EnterEmail.scss'
import { useNavigate } from 'react-router-dom'

export default function EnterEmail() {

    const navigate = useNavigate();

    return (
        <form id='enterEmail'>
            <h4 className='text-center enterEmail__title'>Đặt lại mật khẩu</h4>
            <p className='text-center enterEmail__text'>Vui lòng nhập email để đặt lại mật khẩu của bạn*</p>
            <div>
                <input className='form-control' type="email" />
            </div>
            <div className='d-flex enterEmail__button justify-content-center'>
                <button type={'button'} className='button--ouline--orange' onClick={() => {navigate("/login")}}>Hủy</button>
                <button className='button--orange' onClick={() => {navigate("/changepass")}}>Tiếp tục</button>
            </div>
        </form>
    )
}
