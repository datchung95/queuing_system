import React, { useEffect } from 'react'
import User from '../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretDownOutlined, SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import "./Service.scss"
import { Input, Select, Table } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { getAllServiceReducer, searchActiveServiceReducer, searchKeyWordNameServiceReducer } from '../../redux/Reducers/ServiceReducer/ServiceReducer';
import { getAllDataAction } from '../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { DIARY, SERVICES } from '../../redux/Const/Const';
import openNotificationWithIcon from '../../Notification/Notification';
import { deleteDataAction } from '../../redux/Actions/DeleteDataAction/DeleteAction';
import { addHistoryAction } from '../../redux/Actions/AddHistoryAction/AddHistoryAction';
import moment from 'moment';
import { getAllListDiaryReducer } from '../../redux/Reducers/DiaryReducer/DiaryReducer';
import { ID_SERVICE } from '../../util/Const/Const';


interface DataType {
    maDichVu: string;
    tenDichVu: string;
    moTa: string;
    trangThaiHoatDong: string;
}

export default function Service() {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    useEffect(() => {    
        dispatch(getAllDataAction(SERVICES, getAllServiceReducer))
    }, [])


    const handleChangeActive = async (value: string) => {
        await dispatch(getAllDataAction(SERVICES, getAllServiceReducer))
        dispatch(searchActiveServiceReducer(value));
    }

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await dispatch(getAllDataAction(SERVICES, getAllServiceReducer))
            dispatch(searchKeyWordNameServiceReducer(value))
        }
    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã dịch vụ',
            dataIndex: 'maDichVu',
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'tenDichVu',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThaiHoatDong',
            render: (text) => {
                if (text === "Hoạt động") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../assets/dashboard/dotgreen.png")} alt="dot" />Hoạt động</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../assets/dashboard/dotred.png")} alt="dot" />Ngưng hoạt động</div>
                }
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <button className='button--blue' onClick={() => {
                    if (text.email === userProfile.email || userProfile.vaiTro === "Admin") {
                        navigate(`/service/updateservice/${text.id}`)
                        localStorage.setItem(ID_SERVICE, text.id)
                    } else {
                        openNotificationWithIcon("error", "Bạn không có quyền chỉnh sửa")
                    }
                }}>Cập nhật</button>
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <button className='button--blue' onClick={() => {
                    if (text.email === userProfile.email || userProfile.vaiTro === "Admin") {
                        dispatch(deleteDataAction(SERVICES, text.id, getAllServiceReducer))
                        dispatch(addHistoryAction(DIARY, { tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Xóa dịch vụ ${text.tenDichVu}`, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss") }, getAllListDiaryReducer))
                    } else {
                        openNotificationWithIcon("error", "Bạn không có quyền xóa")
                    }
                }}>Xóa</button>
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
        <div id="service" className='container-page'>
            <div className='container-fluid device__header'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Danh sách dịch vụ
                        </h4>
                        <h4 className='text--titleBottom'>Quản lý dịch vụ</h4>
                    </div>
                    <div className='col-4'>
                        <div className='device__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='service__bottom'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-11'>
                            <div className='device__select d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <div style={{ marginRight: "24px" }}>
                                        <p className='label-input m-0'>Trạng thái hoạt động</p>
                                        <Select
                                            className='service__input'
                                            defaultValue="Tất cả"
                                            style={{ width: 300 }}
                                            onChange={handleChangeActive}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: "Tất cả",
                                                    label: "Tất cả",
                                                },
                                                {
                                                    value: "Hoạt động",
                                                    label: "Hoạt động",
                                                },
                                                {
                                                    value: "Ngưng hoạt động",
                                                    label: "Ngưng hoạt động",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className='label-input m-0'>Tìm tên dịch vụ</p>
                                    <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                        <Input
                                            className='device__input'
                                            style={{ width: 300 }}
                                            placeholder="Nhập từ khóa"
                                            name="keyWord"
                                            onChange={formik.handleChange}
                                        />
                                        <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "15%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                    </form>
                                </div>
                            </div>
                            <div className='service__table'>
                                <Table
                                    className='service__tableLayout'
                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'} columns={columns}
                                    dataSource={arrService}
                                    rowKey="maDichVu"
                                    pagination={{
                                        itemRender: itemRender
                                    }} />
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <NavLink to="/service/addservice" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Thêm dịch vụ</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
