import React from 'react'
import User from '../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretLeftOutlined, CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import "./PositionManagement.scss"
import { Table, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { getListPositionManagementReducer, searchNamePositionReducer } from '../../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';
import { collection, getDocs } from 'firebase/firestore';
import database from '../../../configFirebase';

interface DataType {
    tenVaiTro: string;
    soNguoiDung: number;
    moTa: string;
}

export default function PositionManagement() {

    const dispatch = useAppDispatch();

    const listPosition = useAppSelector(state => state.PositionManagementReducer.listPosition);

    let listPositiom: any[] = [];

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
                return <NavLink to={`/system/positionmanagement/updateposition/${text.id}`} className='button--blue'>Cập nhật</NavLink>
            }
        }
    ];

    const getAllListPosition = async () => {
        const getListPosition = await getDocs(collection(database, "ListPosition"));
        getListPosition.forEach((doc) => {
            listPositiom.push({ ...doc.data(), id: doc.id })
        });
        dispatch(getListPositionManagementReducer(listPositiom))
    }

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await getAllListPosition();
            dispatch(searchNamePositionReducer(value))
        }
    })

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
                                    <p className='label-input m-0'>Từ khóa</p>
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
                            <NavLink to="/system/positionmanagement/addposition" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Thêm vai trò</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
