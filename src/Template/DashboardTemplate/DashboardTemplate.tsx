import React from 'react'
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import "./DashboardTemplate.scss"

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

const items: MenuItem[] = [
    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white" } : { color: "#7E7D88" }
    } to="/dashboard">Dashboard</NavLink>, '/dashboard', <img src={require("../../assets/icon/element-4.png")} alt="logo" />),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white" } : { color: "#7E7D88" }
    } to="/device">Thiết bị</NavLink>, '/device', <img src={require("../../assets/icon/monitor.png")} alt="logo" />),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white" } : { color: "#7E7D88" }
    } to="/service">Dịch vụ</NavLink>, '/service', <img src={require("../../assets/icon/Frame 332.png")} alt="logo" />),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white" } : { color: "#7E7D88" }
    } to="/number">Cấp số</NavLink>, '/number', <img src={require("../../assets/icon/icon dasboard03.png")} alt="logo" />),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white" } : { color: "#7E7D88" }
    } to="/report">Báo cáo</NavLink>, '/report', <img src={require("../../assets/icon/Frame (1).png")} alt="logo" />),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white" } : { color: "#7E7D88" }
    } to="/system">Cài đặt hệ thống <MoreOutlined /></NavLink>, '/system', <img src={require("../../assets/icon/setting.png")} alt="logo" />),
];

export default function DashboardTemplate() {

    const location = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }} id="dashBoardTemplate">
            <Sider className='dashBoardTemplate__sider'>
                <div className='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <div className="dashBoardTemplate__logo text-center">
                            <img src={require("../../assets/logo/Logo alta.png")} alt="logoalta" />
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
                    </div>
                    <div className='text-center dashBoardTemplate__button'>
                        <button className='button--orange--light'><img className='dashBoardTemplate__buttonImg' src={require("../../assets/icon/fi_log-out.png")} alt="logo" /> <span className='dashBoardTemplate__buttonText'>Đăng xuất</span></button>
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
