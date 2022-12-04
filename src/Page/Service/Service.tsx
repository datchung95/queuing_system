import React from 'react'
import User from '../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretDownOutlined, SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import "./Service.scss"
import { Input, Select, Table, DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { collection, getDocs } from 'firebase/firestore';
import database from '../../configFirebase';
import { useFormik } from 'formik';
import moment from "moment"
import { getAllServiceReducer, searchActiveServiceReducer, searchKeyWordNameServiceReducer } from '../../redux/Reducers/ServiceReducer/ServiceReducer';


interface DataType {
    maDichVu: string;
    tenDichVu: string;
    moTa: string;
    trangThaiHoatDong: string;
}

export default function Service() {

    const dispatch = useAppDispatch();

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    let service: any[] = [];

    moment.updateLocale('en', {
        weekdaysMin: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    });

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
                return <NavLink to={`/service/detailservice/${text.maDichVu}`} className='button--blue'>Chi tiết</NavLink>
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <NavLink to={`/service/updateservice/${text.maDichVu}`} className='button--blue'>Cập nhật</NavLink>
            }
        },
    ];

    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const getArrService = async () => {
        const getService = await getDocs(collection(database, "Services"));
        getService.forEach((doc) => {
            service.push({ ...doc.data(), id: doc.id })
        });
        dispatch(getAllServiceReducer(service))
    }

    const handleChangeActive = async (value: string) => {
        await getArrService();
        dispatch(searchActiveServiceReducer(value));
    }

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await getArrService();
            dispatch(searchKeyWordNameServiceReducer(value))
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
                                    <div>
                                        <p className='label-input m-0'>Chọn thời gian</p>
                                        <div className='service__input d-flex'>
                                            <DatePicker.RangePicker className='position-relative' onChange={onChange} suffixIcon={null} showTime format="DD/MM/YYYY" />
                                            <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "355px" }} src={require("../../assets/icon/calendar.png")} alt="calendar" />
                                            <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "520px" }} src={require("../../assets/icon/calendar.png")} alt="calendar" />
                                        </div>
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
