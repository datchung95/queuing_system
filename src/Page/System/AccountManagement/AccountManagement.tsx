import React from 'react'
import User from '../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretLeftOutlined, CaretRightOutlined, SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import "./AccountManagement.scss";
import { Table, Input, Select } from 'antd';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { collection, getDocs } from 'firebase/firestore';
import database from '../../../configFirebase';
import { getDataUserReducer, searchNameUserAccountUserReducer, searchPositionUserAccountReducer } from '../../../redux/Reducers/UserReducer/UserReducer';

interface DataType {
    tenDangNhap: string;
    tenNguoiDung: string;
    soDienThoai: string;
    email: string;
    vaiTro: string;
    trangThaiHoatDong: string;
}

export default function AccountManagement() {

    const dispatch = useAppDispatch();

    const listPosition = useAppSelector(state => state.PositionManagementReducer.listPosition);

    const arrUser = useAppSelector(state => state.UserReducer.arrUser);

    let user: any[] = [];

    const getAllUser = async () => {
        const querySnapshot = await getDocs(collection(database, "User"));
            querySnapshot.forEach((doc) => {
                user.push({ ...doc.data(), id: doc.id, token: doc.id })
            });
            dispatch(getDataUserReducer(user));
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'tenDangNhap',
        },
        {
            title: 'Họ tên',
            dataIndex: 'tenNguoiDung',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'vaiTro',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThaiHoatDong',
            render: (text) => {
                if (text === "Hoạt động") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotgreen.png")} alt="dot" />Hoạt động</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../../assets/dashboard/dotred.png")} alt="dot" />Ngưng hoạt động</div>
                }
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <NavLink to={`/system/accountmanagement/updateaccount/${text.id}`} className='button--blue'>Cập nhật</NavLink>
            }
        }
    ];

    const renderSelectPosition = () => {
        return listPosition.map((item, index) => {
            return {
                value: item.tenVaiTro,
                label: item.tenVaiTro
            }
        })
    }

    const renderAllSelectPosition = () => {
        let arrSelectPosition: any[] = renderSelectPosition();
        arrSelectPosition.unshift({ value: "Tất cả", label: "Tất cả" })
        return arrSelectPosition
    }

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await getAllUser();
            dispatch(searchNameUserAccountUserReducer(value))
        }
    })

    const handleChangePosition = async (value: string) => {
        await getAllUser();
        dispatch(searchPositionUserAccountReducer(value))
    }

    const itemRender = (_: any, type: any, originalElement: any) => {
        if (type === "prev") {
            return <CaretLeftOutlined />;
        }
        if (type === "next") {
            return <CaretRightOutlined />;
        }
        return originalElement;
    };

    return (
        <div id="accountManagement" className='container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Cài đặt hệ thống <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Quản lý tài khoản
                        </h4>
                        <h4 className='text--titleBottom'>Danh sách tài khoản</h4>
                    </div>
                    <div className='col-4'>
                        <div className='number__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accountManagement__bottom'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-11'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div style={{ marginRight: "24px" }}>
                                    <p className='label-input m-0'>Tên vai trò</p>
                                    <Select
                                        className='accountManagement__input'
                                        defaultValue="Tất cả"
                                        style={{ width: 300 }}
                                        onChange={handleChangePosition}
                                        suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                        options={renderAllSelectPosition()}
                                    />
                                </div>
                                <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                    <p className='label-input m-0'>Từ khóa</p>
                                    <Input
                                        className='accountManagement__input'
                                        style={{ width: 300 }}
                                        placeholder="Nhập từ khóa"
                                        name="keyWord"
                                        onChange={formik.handleChange}
                                    />
                                    <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "48%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                </form>
                            </div>
                            <div className='accountManagement__table'>
                                <Table
                                    className='accountManagement__tableLayout'
                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'} columns={columns}
                                    dataSource={arrUser}
                                    rowKey="id"
                                    pagination={{
                                        itemRender: itemRender
                                    }} />
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <NavLink to="/system/accountmanagement/addaccount" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Thêm tài khoản</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
