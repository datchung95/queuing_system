import React, { useEffect } from 'react'
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import "./DashboardTemplate.scss"
import { ID_DETAIL_USER, ID_DEVICE, ID_LIST_POSITION, ID_SERVICE, TOKEN, USER_LOGIN_ID } from '../../util/Const/Const';
import { useAppDispatch } from '../../redux/hook';
import { getDetailDataAction } from '../../redux/Actions/GetDetailDataAction/GetDetailDataAction';
import { USER } from '../../redux/Const/Const';
import { getUserProfileReducer } from '../../redux/Reducers/UserReducer/UserReducer';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

export default function DashboardTemplate() {

    const location = useLocation();

    const idDetailUser = localStorage.getItem(ID_DETAIL_USER)

    const idDetailService = localStorage.getItem(ID_SERVICE)

    const idDetailDecive = localStorage.getItem(ID_DEVICE)

    const idDetailListPosition = localStorage.getItem(ID_LIST_POSITION)

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        let userId: string = JSON.stringify(localStorage.getItem(USER_LOGIN_ID)).slice(1, -1)
        dispatch(getDetailDataAction(USER, getUserProfileReducer, userId))

        if (!localStorage.getItem(TOKEN)) {
            navigate("/login");
        }
    }, [])

    const items: MenuItem[] = [
        getItem(<NavLink style={({ isActive }) =>
            isActive
                ?
                { color: "white", backgroundColor: "#FF7506" }
                :
                { color: "#7E7D88", backgroundColor: "transparent" }
        }
            to="/">{location.pathname === "/"
                ?
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/dashbordlight.png")} alt="logo" />
                :
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/element-4.png")} alt="logo" />} Trang chủ</NavLink>, '/'),


        getItem(<NavLink style={({ isActive }) =>
            isActive
                ?
                { color: "white", backgroundColor: "#FF7506" }
                :
                { color: "#7E7D88", backgroundColor: "transparent" }
        }
            to="/device">{location.pathname === "/device" 
            || 
            location.pathname === "/device/adddevice" 
            || 
            location.pathname === `/device/detaildevice/${idDetailDecive}` 
            || 
            location.pathname === `/device/updatedevice/${idDetailDecive}`
                ?
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/monitorLight.png")} alt="logo" />
                :
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/monitor.png")} alt="logo" />} Thiết bị</NavLink>, '/'),

        getItem(<NavLink style={({ isActive }) =>
            isActive
                ?
                { color: "white", backgroundColor: "#FF7506" }
                :
                { color: "#7E7D88", backgroundColor: "transparent" }
        }
            to="/service">{location.pathname === "/service" 
            || 
            location.pathname === "/service/addservice" 
            || 
            location.pathname === `/service/updateservice/${idDetailService}`
                ?
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/servicelight.png")} alt="logo" />
                :
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/Frame 332.png")} alt="logo" />} Dịch vụ</NavLink>, '/'),


        getItem(<NavLink style={({ isActive }) =>
            isActive
                ?
                { color: "white", backgroundColor: "#FF7506" }
                :
                { color: "#7E7D88", backgroundColor: "transparent" }
        }
            to="/system">{location.pathname === "/system" 
            || 
            location.pathname === "/system/positionmanagement" 
            || 
            location.pathname === "/system/positionmanagement/addposition" 
            || 
            location.pathname === `/system/positionmanagement/updateposition/${idDetailListPosition}` 
            || 
            location.pathname === "/system/accountmanagement" 
            ||
            location.pathname === "/system/accountmanagement/addaccount"  
            ||
            location.pathname === `/system/accountmanagement/updateaccount/${idDetailUser}`
            ||
            location.pathname === "/system/activediary" 
                ?
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/servicelight.png")} alt="logo" />
                :
                <img style={{ marginRight: "15px", width: "18px", height: "20px" }} src={require("../../assets/icon/Frame 332.png")} alt="logo" />} Cài đặt hệ thống <MoreOutlined /></NavLink>, '/system', null, [
            getItem(<NavLink style={({ isActive }) =>
                isActive
                    ?
                    { color: "white", backgroundColor: "#FF7506" }
                    :
                    { color: "#7E7D88", backgroundColor: "transparent" }
            } to="/system/positionmanagement">Quản lý vai trò</NavLink>, '/system/positionmanagement'),
            getItem(<NavLink style={({ isActive }) =>
                isActive
                    ?
                    { color: "white", backgroundColor: "#FF7506" }
                    :
                    { color: "#7E7D88", backgroundColor: "transparent" }
            } to="/system/accountmanagement">Quản lý tài khoản</NavLink>, '/system/accountmanagement'),
            getItem(<NavLink style={({ isActive }) =>
                isActive
                    ?
                    { color: "white", backgroundColor: "#FF7506" }
                    :
                    { color: "#7E7D88", backgroundColor: "transparent" }
            } to="/system/activediary">Nhật ký người dùng</NavLink>, '/system/activediary')
        ])
    ];

    return (
        <Layout style={{ minHeight: '100vh' }} id="dashBoardTemplate">
            <Sider className='dashBoardTemplate__sider'>
                <div className='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <div className="dashBoardTemplate__logo text-center">
                            <img src={require("../../assets/logo/LOgo.png")} alt="logo" />
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="vertical" items={items} />
                    </div>
                    <div className='text-center dashBoardTemplate__button'>
                        <button className='button--orange--light' onClick={() => {
                            localStorage.clear();
                            window.location.reload()
                        }}><img className='dashBoardTemplate__buttonImg' src={require("../../assets/icon/fi_log-out.png")} alt="logo" /> <span className='dashBoardTemplate__buttonText'>Đăng xuất</span></button>
                    </div>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Content >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
