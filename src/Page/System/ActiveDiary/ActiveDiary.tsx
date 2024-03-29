import React, { useEffect } from 'react'
import User from '../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretLeftOutlined, CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import "./ActiveDiary.scss";
import { Table, Input, DatePicker } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { getAllListDiaryReducer, searchNameUserDiaryReducer, searchTimeDiaryReducer } from '../../../redux/Reducers/DiaryReducer/DiaryReducer';
import { getAllDataAction } from '../../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { DIARY } from '../../../redux/Const/Const';
import moment from 'moment';

interface DataType {
    tenDangNhap: string;
    thoiGianTacDong: string;
    thaoTacThucHien: string;
}

export default function ActiveDiary() {

    const dispatch = useAppDispatch();

    const arrDiary = useAppSelector(state => state.DiaryReducer.arrDiary);

    const arrDiarySort = [...arrDiary].sort((a, b) => moment(b.thoiGianTacDong, "DD/MM/YYYY hh:mm:ss").diff(moment(a.thoiGianTacDong, "DD/MM/YYYY hh:mm:ss")))

    useEffect(() => {
        dispatch(getAllDataAction(DIARY, getAllListDiaryReducer))
    }, [])

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await dispatch(getAllDataAction(DIARY, getAllListDiaryReducer))
            dispatch(searchNameUserDiaryReducer(value))
        }
    })

    const onChange = async (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        if (dateString[0] !== "" && dateString[1] !== "") {
            await dispatch(getAllDataAction(DIARY, getAllListDiaryReducer))
            dispatch(searchTimeDiaryReducer(dateString));
        } else {
            console.log("d")
            dispatch(getAllDataAction(DIARY, getAllListDiaryReducer))
        }
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'tenDangNhap',
        },
        {
            title: 'Thời gian tác động',
            dataIndex: 'thoiGianTacDong',
        },
        {
            title: 'Thao tác thực hiện',
            dataIndex: 'thaoTacThucHien',
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
        <div id="diary" className='container-page'>
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
            <div className='diary__bottom'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-11'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div style={{ marginRight: "24px" }}>
                                    <p className='label-input m-0'>Chọn thời gian</p>
                                    <DatePicker.RangePicker className='position-relative diary__input' onChange={onChange} suffixIcon={null} showTime format="DD/MM/YYYY" />
                                    <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "32px" }} src={require("../../../assets/icon/calendar.png")} alt="calendar" />
                                    <img style={{ width: "20px", height: "20px", position: "absolute", top: "40px", left: "196px" }} src={require("../../../assets/icon/calendar.png")} alt="calendar" />
                                </div>
                                <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                    <p className='label-input m-0'>Từ khóa</p>
                                    <Input
                                        className='diary__input'
                                        style={{ width: 300 }}
                                        placeholder="Nhập từ khóa"
                                        name="keyWord"
                                        onChange={formik.handleChange}
                                    />
                                    <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "48%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                </form>
                            </div>
                            <div className='diary__table'>
                                <Table
                                    className='diary__tableLayout'
                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'} columns={columns}
                                    dataSource={arrDiarySort}
                                    rowKey="id"
                                    pagination={{
                                        itemRender: itemRender
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
