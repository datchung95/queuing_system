import React, { useEffect } from 'react'
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import "./DashboardTemplate.scss"
import { useAppDispatch } from '../../redux/hook';
import { collection, getDocs } from 'firebase/firestore';
import database from '../../configFirebase';
import { getDataUserReducer } from '../../redux/Reducers/UserReducer/UserReducer';
import { TOKEN } from '../../util/Const/Const';
import { getAllDevices } from '../../redux/Reducers/DeviceReducer/DeviceReducer';
import { getAllServiceReducer } from '../../redux/Reducers/ServiceReducer/ServiceReducer';
import { getAllNumberReducer } from '../../redux/Reducers/NumberReducer/NumberReducer';
import { getListPositionManagementReducer } from '../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';
import { getAllListDiaryReducer } from '../../redux/Reducers/DiaryReducer/DiaryReducer';

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
        isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
    } to="/"><img style={{ marginRight: "10px" }} src={require("../../assets/icon/element-4.png")} alt="logo" /> Dashboard</NavLink>, '/'),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
    } to="/device"><img style={{ marginRight: "10px" }} src={require("../../assets/icon/monitor.png")} alt="logo" /> Thiết bị</NavLink>, '/device'),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
    } to="/service"><img style={{ marginRight: "10px" }} src={require("../../assets/icon/Frame 332.png")} alt="logo" /> Dịch vụ</NavLink>, '/service'),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
    } to="/number"><img style={{ marginRight: "10px" }} src={require("../../assets/icon/icon dasboard03.png")} alt="logo" /> Cấp số</NavLink>, '/number'),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
    } to="/report"><img style={{ marginRight: "10px" }} src={require("../../assets/icon/Frame (1).png")} alt="logo" /> Báo cáo</NavLink>, '/report'),

    getItem(<NavLink style={({ isActive }) =>
        isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
    } to="/system"><img style={{ marginRight: "10px" }} src={require("../../assets/icon/setting.png")} alt="logo" /> Cài đặt hệ thống <MoreOutlined /></NavLink>, '/system', null, [
        getItem(<NavLink style={({ isActive }) =>
            isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
        } to="/system/positionmanagement">Quản lý vai trò</NavLink>, '/system/positionmanagement'),
        getItem(<NavLink style={({ isActive }) =>
            isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
        } to="/system/accountmanagement">Quản lý tài khoản</NavLink>, '/system/accountmanagement'),
        getItem(<NavLink style={({ isActive }) =>
            isActive ? { color: "white", backgroundColor: "#FF7506" } : { color: "#7E7D88", backgroundColor: "transparent" }
        } to="/system/activediary">Nhật ký người dùng</NavLink>, '/system/activediary')
    ])
];

export default function DashboardTemplate() {

    const location = useLocation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    let user: any[] = [];

    let device: any[] = [];

    let service: any[] = [];

    let number: any[] = [];

    let position: any[] = [];

    let diary: any[] = [];

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(database, "User"));
            querySnapshot.forEach((doc) => {
                user.push({ ...doc.data(), id: doc.id, token: doc.id })
            });
            dispatch(getDataUserReducer(user));

            const getDevice = await getDocs(collection(database, "Devices"));
            getDevice.forEach((doc) => {
                device.push({ ...doc.data(), id: doc.id })
            });
            dispatch(getAllDevices(device))

            const getService = await getDocs(collection(database, "Services"));
            getService.forEach((doc) => {
                service.push(doc.data())
            });
            dispatch(getAllServiceReducer(service))

            const getNumber = await getDocs(collection(database, "Numbers"));
            getNumber.forEach((doc) => {
                number.push({ ...doc.data(), id: doc.id })
            });
            dispatch(getAllNumberReducer(number))

            const getPosition = await getDocs(collection(database, "ListPosition"));
            getPosition.forEach((doc) => {
                position.push({ ...doc.data(), id: doc.id })
            });
            dispatch(getListPositionManagementReducer(position))

            const getDiary = await getDocs(collection(database, "ArrDiary"));
            getDiary.forEach((doc) => {
                diary.push({ ...doc.data(), id: doc.id })
            });
            dispatch(getAllListDiaryReducer(diary))
        }
        getData();

        if (!localStorage.getItem(TOKEN)) {
            navigate("/login");
        }

    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }} id="dashBoardTemplate">
            <Sider className='dashBoardTemplate__sider'>
                <div className='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <div className="dashBoardTemplate__logo text-center">
                            <img src={require("../../assets/logo/Logo alta.png")} alt="logoalta" />
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
