import React, { useEffect } from 'react'
import User from '../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretLeftOutlined, CaretRightOutlined, SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import "./AccountManagement.scss";
import { Table, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { getDataUserReducer, searchNameUserAccountUserReducer, searchPositionUserAccountReducer } from '../../../redux/Reducers/UserReducer/UserReducer';
import { getAllDataAction } from '../../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { USER } from '../../../redux/Const/Const';
import openNotificationWithIcon from '../../../Notification/Notification';
import { ID_DETAIL_USER } from '../../../util/Const/Const';

interface DataType {
    tenDangNhap: string;
    tenNguoiDung: string;
    soDienThoai: string;
    vaiTro: string;
    trangThaiHoatDong: string;
}

export default function AccountManagement() {

    const dispatch = useAppDispatch();

    const listPosition = useAppSelector(state => state.PositionManagementReducer.listPosition);

    const arrUser = useAppSelector(state => state.UserReducer.arrUser);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllDataAction(USER, getDataUserReducer))
    }, [])

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
            await dispatch(getAllDataAction(USER, getDataUserReducer))
            dispatch(searchNameUserAccountUserReducer(value))
        }
    })

    const handleChangePosition = async (value: string) => {
        await dispatch(getAllDataAction(USER, getDataUserReducer))
        dispatch(searchPositionUserAccountReducer(value))
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
                return <button className='button--blue' onClick={() => {
                    if (text.vaiTro === "Admin") {
                        if (text.email === userProfile.email) {
                            navigate(`/system/accountmanagement/updateaccount/${text.id}`)
                        } else {
                            openNotificationWithIcon("error", "Bạn không có quyền chỉnh sửa user này")
                        }
                    } else {
                        if (userProfile.email === text.email || userProfile.vaiTro === "Admin") {
                            navigate(`/system/accountmanagement/updateaccount/${text.id}`)
                            localStorage.setItem(ID_DETAIL_USER, text.id)
                        } else {
                            openNotificationWithIcon("error", "Bạn không có quyền chỉnh sửa")
                        }
                    }
                }}>Cập nhật</button>
            }
        }
    ];

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
                                    <p className='label-input m-0'>Tìm tên người dùng</p>
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
                            <button className='d-flex justify-content-center align-items-center h-100 accoutManagement__buttonAdd' onClick={() => {
                                if (userProfile.vaiTro === "Admin") {
                                    navigate("/system/accountmanagement/addaccount")
                                } else {
                                    openNotificationWithIcon("error", "Bạn không có quyền thêm tài khoản")
                                }
                            }}>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Thêm tài khoản</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
