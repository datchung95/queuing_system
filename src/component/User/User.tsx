import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../Template/DashboardTemplate/DashboardTemplate.scss"
import "./User.scss"
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { USER_LOGIN_ID } from '../../util/Const/Const';
import { getUserProfileReducer } from '../../redux/Reducers/UserReducer/UserReducer';
import { getDetailDataAction } from '../../redux/Actions/GetDetailDataAction/GetDetailDataAction';
import { USER } from '../../redux/Const/Const';

export default function User() {

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    useEffect(() => {
        let userId: string = JSON.stringify(localStorage.getItem(USER_LOGIN_ID)).slice(1, -1)
        dispatch(getDetailDataAction(USER, getUserProfileReducer, userId))
    }, [])

    return (
        <div id="user" className='d-flex dashBoardTemplate__header padding-title'>
            <div className='d-flex dashBoardTemplate__headerNavigate' onClick={() => { navigate("/profile") }}>
                <img src={userProfile.img} alt="avatar" className='dashBoardTemplate__avatar' />
                <div className='dashBoardTemplate__profileText'>
                    <p className='dashBoardTemplate__hello'>Xin chào</p>
                    <p className='dashBoardTemplate__name'>{userProfile.tenNguoiDung}</p>
                </div>
            </div>
        </div>
    )
}
