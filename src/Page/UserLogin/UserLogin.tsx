import React from 'react'
import "./UserLogin.scss"
import { NavLink, useNavigate } from 'react-router-dom'

export default function UserLogin() {

    const navigate = useNavigate();

    return (
        <form id="userLogin">
            <div className='userLogin__formTop'>
                <label className='userLogin__formTextLabel'>Tên đăng nhập*</label>
                <input className='form-control' type="text" />
            </div>
            <div>
                <label className='userLogin__formTextLabel'>Mật khẩu*</label>
                <input className='form-control' type="password" />
            </div>
            <div className='userLogin__formTextNav'>
                <NavLink className='userLogin__formTextForget' to="/enteremail">Quên mật khẩu ?</NavLink>
            </div>
            <div className='text-center userLogin__bottom'>
                <button className='button--orange userLogin__button' onClick={() => {navigate("/profile")}}>Đăng nhập</button>
            </div>
        </form>
    )
}
