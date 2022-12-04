import React from 'react'
import User from '../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import "../Number/Number.scss"
import { Table, DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { collection, getDocs } from 'firebase/firestore';
import database from '../../configFirebase';
import moment from "moment"
import { getAllNumberReducer, searchTimeNumberReducer } from '../../redux/Reducers/NumberReducer/NumberReducer';


interface DataType {
    stt: string;
    dichVu: string;
    thoiGianCap: string;
    trangThai: string;
    nguonCap: string;
}

export default function Report() {

    const dispatch = useAppDispatch();

    const arrNumber = useAppSelector(state => state.NumberReducer.arrNumber);

    let number: any[] = [];

    moment.updateLocale('en', {
        weekdaysMin: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Số thứ tự',
            dataIndex: 'stt',
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
            title: 'Tình trạng',
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
        }
    ];

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
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Báo cáo <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Lập báo cáo
                        </h4>
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
                                <div>
                                    <p className='label-input m-0'>Chọn thời gian</p>
                                    <div className='number__input d-flex'>
                                        <DatePicker.RangePicker className='position-relative' onChange={onChange} suffixIcon={null} showTime format="DD/MM/YYYY" />
                                        <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "33px" }} src={require("../../assets/icon/calendar.png")} alt="calendar" />
                                        <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "195px" }} src={require("../../assets/icon/calendar.png")} alt="calendar" />
                                    </div>
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
                            <NavLink to="/report" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../assets/icon/document-download.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Tải về</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
