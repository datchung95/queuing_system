import React, { Fragment } from 'react'
import User from '../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretDownOutlined, SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import "./Device.scss"
import { Input, Select, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { dropdownTextServiceReducer, getAllDevices, searchActiveReducer, searchConectReducer, searchKeyWordName } from '../../redux/Reducers/DeviceReducer/DeviceReducer';
import { collection, getDocs } from 'firebase/firestore';
import database from '../../configFirebase';
import { useFormik } from 'formik';

interface DataType {
    maThietBi: string;
    tenThietBi: string;
    diaChiIP: string;
    hoatDong: string;
    ketNoi: string;
    dichVuSuDung: string[];
}

export default function Device() {

    const dispatch = useAppDispatch();

    const arrDevice = useAppSelector(state => state.DeviceReducer.arrDevice);

    const dropdownTextService = useAppSelector(state => state.DeviceReducer.dropdownTextService);

    let device: any[] = []

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã thiết bị',
            dataIndex: 'maThietBi',
        },
        {
            title: 'Tên thiết bị',
            dataIndex: 'tenThietBi',
        },
        {
            title: 'Địa chỉ IP',
            dataIndex: 'diaChiIP',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'hoatDong',
            render: (text) => {
                if (text === "Hoạt động") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../assets/dashboard/dotgreen.png")} alt="dot" />Hoạt động</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../assets/dashboard/dotred.png")} alt="dot" />Ngưng hoạt động</div>
                }
            }
        },
        {
            title: 'Trạng thái kết nối',
            dataIndex: 'ketNoi',
            render: (text) => {
                if (text === "Kết nối") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../assets/dashboard/dotgreen.png")} alt="dot" />Kết nối</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../assets/dashboard/dotred.png")} alt="dot" />Mất kết nối</div>
                }
            }
        },
        {
            title: 'Dịch vụ sử dụng',
            dataIndex: 'dichVuSuDung',
            render: (text: string[]) => {
                if (text.length < 2) {
                    return <Fragment>
                        <span>{text[0]}</span>
                    </Fragment>
                } else {
                    if (dropdownTextService) {
                        return <div>
                            {text.map((item, index) => {
                                return <Fragment key={index}>
                                    <span>{item}, </span>
                                </Fragment>
                            })}
                            <button className='d-block button--blue' onClick={() => {
                                dispatch(dropdownTextServiceReducer(false))
                            }}>Thu nhỏ</button>
                        </div>
                    } else {
                        return <div>
                            <span>{text[0]}, </span>
                            <span>{text[1]}, </span>
                            <span>...</span>
                            <button className='d-block button--blue' onClick={() => {
                                dispatch(dropdownTextServiceReducer(true))
                            }}>Xem Thêm</button>
                        </div>
                    }
                }
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <NavLink to={`/device/detaildevice/${text.id}`} className='button--blue'>Chi tiết</NavLink>
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <NavLink to={`/device/updatedevice/${text.id}`} className='button--blue'>Cập nhật</NavLink>
            }
        },
    ];

    const getDevice = async () => {
        const getDevice = await getDocs(collection(database, "Devices"));
        getDevice.forEach((doc) => {
            device.push({ ...doc.data(), id: doc.id })
        });
        dispatch(getAllDevices(device))
    }

    const handleChangeActive = async (value: string) => {
        await getDevice()
        dispatch(searchActiveReducer(value));
    }

    const hadleChangeConnect = async (value: string) => {
        await getDevice()
        dispatch(searchConectReducer(value))
    }

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await getDevice()
            dispatch(searchKeyWordName(value))
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
        <div id="device" className='container-page'>
            <div className='container-fluid device__header'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Danh sách thiết bị
                        </h4>
                        <h4 className='text--titleBottom'>Danh sách thiết bị</h4>
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
            <div className='device__bottom'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-11'>
                            <div className='device__select d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <div style={{ marginRight: "24px" }}>
                                        <p className='label-input m-0'>Trạng thái hoạt động</p>
                                        <Select
                                            className='device__input'
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
                                    <div>
                                        <p className='label-input m-0'>Trạng thái kết nối</p>
                                        <Select
                                            className='device__input'
                                            defaultValue="Tất cả"
                                            style={{ width: 300 }}
                                            onChange={hadleChangeConnect}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: "Tất cả",
                                                    label: "Tất cả",
                                                },
                                                {
                                                    value: "Kết nối",
                                                    label: "Kết nối",
                                                },
                                                {
                                                    value: "Mất kết nối",
                                                    label: "Mất kết nối",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className='label-input m-0'>Tìm từ khóa</p>
                                    <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                        <Input
                                            className='device__input'
                                            style={{ width: 300 }}
                                            placeholder="Nhập từ khóa"
                                            name="keyWord"
                                            onChange={formik.handleChange}
                                        />
                                        <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "25%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                    </form>
                                </div>
                            </div>
                            <div className='device__table'>
                                <Table
                                    className='device__tableLayout'
                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'} columns={columns}
                                    dataSource={arrDevice}
                                    rowKey="id"
                                    pagination={{
                                        itemRender: itemRender
                                    }} />
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <NavLink to="/device/adddevice" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Thêm thiết bị</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
