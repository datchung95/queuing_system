import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import "../../Template/DashboardTemplate/DashboardTemplate.scss"
import "./User.scss"

export default function User() {

    const navigate = useNavigate();

    const [click, setClick] = useState(false);

    const items: MenuProps['items'] = [
        {
            label: "Thông báo",
            style: {backgroundColor: "#FF9138", color: "white"},
            key: '0',
        },
        {
            label: <div className='item-dropdown'>
                <h4>Người dùng</h4>
                <p>Thời gian nhận số: 12h20</p>
            </div>,
            key: '1',
        },
        {
            label: <div className='item-dropdown'>
                <h4>Người dùng</h4>
                <p>Thời gian nhận số: 12h20</p>
            </div>,
            key: '1',
        },
        {
            label: <div className='item-dropdown'>
                <h4>Người dùng</h4>
                <p>Thời gian nhận số: 12h20</p>
            </div>,
            key: '1',
        },
        {
            label: <div className='item-dropdown'>
                <h4>Người dùng</h4>
                <p>Thời gian nhận số: 12h20</p>
            </div>,
            key: '1',
        },
    ];

    return (
        <div id="user" className='d-flex dashBoardTemplate__header h-100'>
            <div className='d-flex align-items-center'>
                <Dropdown menu={{ items }} trigger={['click']} onOpenChange={() => {setClick(!click)}}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            {click ? <img src={require("../../assets/icon/Component 3.png")} alt="logo" className='dashBoardTemplate__notifi' /> : <img src={require("../../assets/icon/notification.png")} alt="logo" className='dashBoardTemplate__notifi' />}
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <div className='d-flex dashBoardTemplate__headerNavigate' onClick={() => { navigate("/profile") }}>
                <img src={require("../../assets/group/unsplash_Fyl8sMC2j2Q.png")} alt="avatar" className='dashBoardTemplate__avatar' />
                <div className='dashBoardTemplate__profileText'>
                    <p className='dashBoardTemplate__hello'>Xin chào</p>
                    <p className='dashBoardTemplate__name'>Lê Quỳnh Ái Vân</p>
                </div>
            </div>
        </div>
    )
}
