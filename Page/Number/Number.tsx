import React from 'react'
import User from '../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretDownOutlined, SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import "./Number.scss"
import { Input, Select, Table, DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { collection, getDocs } from 'firebase/firestore';
import database from '../../configFirebase';
import { useFormik } from 'formik';
import moment from "moment"
import { getAllNumberReducer, searchActiveNumberReducer, searchKeyWordNumberReducer, searchNameServicerNumberReducer, searchPowerNumberReducer, searchTimeNumberReducer } from '../../redux/Reducers/NumberReducer/NumberReducer';

interface DataType {
    stt: string;
    khachHang: string;
    thoiGianCap: string;
    hanSuDung: string;
    trangThai: string;
    nguonCap: string;
}

export default function Number() {

    const dispatch = useAppDispatch();

    const arrNumber = useAppSelector(state => state.NumberReducer.arrNumber);

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    let number: any[] = [];

    moment.updateLocale('en', {
        weekdaysMin: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'khachHang',
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'dichVu',
        },
        {
            title: 'Thời gian cấp',
            dataIndex: 'thoiGianCap',
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'hanSuDung',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            render: (text) => {
                if (text === "Đang chờ") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../assets/dashboard/dotblue.png")} alt="dot" />Đang chờ</div>
                } else if (text === "Đã sử dụng") {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../assets/dashboard/dotgray.png")} alt="dot" />Đã sử dụng</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../assets/dashboard/dotred.png")} alt="dot" />Bỏ qua</div>
                }
            }
        },
        {
            title: 'Nguồn cấp',
            dataIndex: 'nguonCap',
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <NavLink to={`/number/detailnumber/${text.id}`} className='button--blue'>Chi tiết</NavLink>
            }
        }
    ];

    const renderSelectSevice = () => {
        return arrService.map((item, index) => {
            return {
                value: item.maDichVu,
                label: item.tenDichVu
            }
        })
    }

    const renderAllSelectSevice = () => {
        let arrSelect: any[] = renderSelectSevice();
        arrSelect.unshift({ value: "Tất cả", label: "Tất cả" })
        return arrSelect
    }

    const getArrNumber = async () => {
        const getNumber = await getDocs(collection(database, "Numbers"));
        getNumber.forEach((doc) => {
            number.push({ ...doc.data(), id: doc.id })
        });
        dispatch(getAllNumberReducer(number))
    }

    const onChange = async (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        await getArrNumber();
        dispatch(searchTimeNumberReducer(dateString))
    };

    const handleChangeActive = async (value: string) => {
        await getArrNumber();
        dispatch(searchActiveNumberReducer(value));
    }

    const handleChangePower = async (value: string) => {
        await getArrNumber();
        dispatch(searchPowerNumberReducer(value));
    }

    const handleChangeNameService = async (value: string) => {
        await getArrNumber();
        let index = arrService.findIndex(item => item.maDichVu === value);
        if (index !== -1) {
            dispatch(searchNameServicerNumberReducer(arrService[index].tenDichVu));
        }
    }

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await getArrNumber();
            dispatch(searchKeyWordNumberReducer(value))
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
        <div id="number" className='container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Danh sách cấp số
                        </h4>
                        <h4 className='text--titleBottom'>Quản lý cấp số</h4>
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
            <div className='number__bottom'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-11'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div style={{ marginRight: "24px" }}>
                                    <p className='label-input m-0'>Tên dịch vụ</p>
                                    <Select
                                        className='number__input'
                                        defaultValue="Tất cả"
                                        style={{ width: 154 }}
                                        listHeight={198}
                                        onChange={handleChangeNameService}
                                        suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                        options={renderAllSelectSevice()}
                                    />
                                </div>
                                <div style={{ marginRight: "24px" }}>
                                    <p className='label-input m-0'>Tình trạng</p>
                                    <Select
                                        className='number__input'
                                        defaultValue="Tất cả"
                                        style={{ width: 154 }}
                                        onChange={handleChangeActive}
                                        suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                        options={[
                                            {
                                                value: "Tất cả",
                                                label: "Tất cả",
                                            },
                                            {
                                                value: "Đang chờ",
                                                label: "Đang chờ",
                                            },
                                            {
                                                value: "Đã sử dụng",
                                                label: "Đã sử dụng",
                                            },
                                            {
                                                value: "Bỏ qua",
                                                label: "Bỏ qua",
                                            }
                                        ]}
                                    />
                                </div>
                                <div style={{ marginRight: "24px" }}>
                                    <p className='label-input m-0'>Nguồn cấp</p>
                                    <Select
                                        className='number__input'
                                        defaultValue="Tất cả"
                                        style={{ width: 154 }}
                                        onChange={handleChangePower}
                                        suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                        options={[
                                            {
                                                value: "Tất cả",
                                                label: "Tất cả",
                                            },
                                            {
                                                value: "Kisok",
                                                label: "Kisok",
                                            },
                                            {
                                                value: "Hệ thống",
                                                label: "Hệ thống",
                                            },
                                        ]}
                                    />
                                </div>
                                <div>
                                    <p className='label-input m-0'>Chọn thời gian</p>
                                    <div className='number__input d-flex'>
                                        <DatePicker.RangePicker className='position-relative' onChange={onChange} suffixIcon={null} showTime format="DD/MM/YYYY" />
                                        <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "622px" }} src={require("../../assets/icon/calendar.png")} alt="calendar" />
                                        <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "786px" }} src={require("../../assets/icon/calendar.png")} alt="calendar" />
                                    </div>
                                </div>
                                <div>
                                    <p className='label-input m-0'>Tìm từ khóa</p>
                                    <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                        <Input
                                            className='number__input'
                                            style={{ width: 240 }}
                                            placeholder="Nhập từ khóa"
                                            name="keyWord"
                                            onChange={formik.handleChange}
                                        />
                                        <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "25%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                    </form>
                                </div>
                            </div>
                            <div className='number__table'>
                                <Table
                                    className='number__tableLayout'
                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'} columns={columns}
                                    dataSource={arrNumber}
                                    rowKey="id"
                                    pagination={{
                                        itemRender: itemRender
                                    }} />
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <NavLink to="/number/addnumber" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Cấp số mới</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
