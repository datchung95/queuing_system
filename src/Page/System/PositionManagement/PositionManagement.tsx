import React, { useEffect } from 'react'
import User from '../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretLeftOutlined, CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import "./PositionManagement.scss"
import { Table, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { getListPositionManagementReducer, searchNamePositionReducer } from '../../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';
import { getAllDataAction } from '../../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { LIST_POSITION } from '../../../redux/Const/Const';
import openNotificationWithIcon from '../../../Notification/Notification';
import { ID_LIST_POSITION } from '../../../util/Const/Const';

interface DataType {
    tenVaiTro: string;
    soNguoiDung: number;
    moTa: string;
}

export default function PositionManagement() {

    const dispatch = useAppDispatch();

    const listPosition = useAppSelector(state => state.PositionManagementReducer.listPosition);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllDataAction(LIST_POSITION, getListPositionManagementReducer))
    }, [])

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await dispatch(getAllDataAction(LIST_POSITION, getListPositionManagementReducer))
            dispatch(searchNamePositionReducer(value))
        }
    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên vai trò',
            dataIndex: 'tenVaiTro',
        },
        {
            title: 'Số người dùng',
            dataIndex: 'soNguoiDung',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <button className='button--blue' onClick={() => {
                    if (userProfile.vaiTro === "Admin") {
                        navigate(`/system/positionmanagement/updateposition/${text.id}`)
                        localStorage.setItem(ID_LIST_POSITION, text.id)
                    } else {
                        openNotificationWithIcon("error", "Bạn không có quyền chỉnh sửa")
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
        <div id="positionManagement" className='container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Cài đặt hệ thống <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Quản lý vai trò
                        </h4>
                        <h4 className='text--titleBottom'>Danh sách vai trò</h4>
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
            <div className='positionManagement__bottom'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-11'>
                            <div className='d-flex justify-content-end align-items-center'>
                                <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                    <p className='label-input m-0'>Tìm tên vai trò</p>
                                    <Input
                                        className='positionManagement__input'
                                        style={{ width: 240 }}
                                        placeholder="Nhập từ khóa"
                                        name="keyWord"
                                        onChange={formik.handleChange}
                                    />
                                    <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "48%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                </form>
                            </div>
                            <div className='positionManagement__table'>
                                <Table
                                    className='positionManagement__tableLayout'
                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'} columns={columns}
                                    dataSource={listPosition}
                                    rowKey="id"
                                    pagination={{
                                        itemRender: itemRender
                                    }} />
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <button className='d-flex justify-content-center align-items-center h-100 positionManagement__buttonAdd' onClick={() => {
                                if (userProfile.vaiTro === "Admin") {
                                    navigate("/system/positionmanagement/addposition")
                                } else {
                                    openNotificationWithIcon("error", "Bạn không có quyền thêm vai trò")
                                }
                            }}>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Thêm vai trò</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
