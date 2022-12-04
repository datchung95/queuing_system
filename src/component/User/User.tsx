import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import "../../Template/DashboardTemplate/DashboardTemplate.scss"
import "./User.scss"
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { USER_LOGIN_ID } from '../../util/Const/Const';
import { getUserProfileReducer } from '../../redux/Reducers/UserReducer/UserReducer';
import { doc, getDoc } from 'firebase/firestore';
import database from '../../configFirebase';

export default function User() {

    const navigate = useNavigate();

    const [click, setClick] = useState(false);

    let userLogin: any = useRef({})

    const dispatch = useAppDispatch()

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    useEffect(() => {
        const getDataUserLogin = async () => {
            let userLoginID: string = localStorage.getItem(USER_LOGIN_ID) as string
            const docSnap = await getDoc(doc(database, "User", userLoginID));
            if (docSnap.exists()) {
                userLogin.current = docSnap.data()
                dispatch(getUserProfileReducer(userLogin.current))
            }
        }
        getDataUserLogin();
    }, [])

    const renderSelectNotification = () => {
        if (userProfile.thoiGianCap.length >= 2) {
            let arrThoiGianCap = [...userProfile.thoiGianCap]
            arrThoiGianCap.splice(0, 1)
            return arrThoiGianCap.map((item, index) => {
                return {
                    key: index + 1,
                    label: (<div className='itemDropdown-bottom'>
                        <h4>Người dùng: {item.nguoiNhan}</h4>
                        <p>Thời gian nhận số: {item.thoiGianNhanSo.substring(0, 2)}h{item.thoiGianNhanSo.substring(3, 5)} ngày: {item.thoiGianNhanSo.slice(8)}</p>
                        <hr />
                    </div>),
                    disabled: true
                }
            })
        } else {
            return []
        }
    }
    renderSelectNotification()

    const renderAllSelectSevice = () => {
        let arrDropdown: any[] = renderSelectNotification();
        arrDropdown?.unshift({ key: 0, label: (<div className='itemDropdown-top'>Thông báo</div>), disabled: true })
        return arrDropdown
    }

    const items: MenuProps['items'] = renderAllSelectSevice()

    return (
        <div id="user" className='d-flex dashBoardTemplate__header padding-title'>
            <div className='d-flex align-items-center'>
                <Dropdown menu={{ items }} trigger={['click']} onOpenChange={() => { setClick(!click) }}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            {click ? <img src={require("../../assets/icon/Component 3.png")} alt="logo" className='dashBoardTemplate__notifi' /> : <img src={require("../../assets/icon/notification.png")} alt="logo" className='dashBoardTemplate__notifi' />}
                        </Space>
                    </a>
                </Dropdown>
            </div>
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
