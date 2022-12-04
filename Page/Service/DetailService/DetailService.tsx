import React, { useEffect, useRef } from 'react'
import User from '../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom';
import "./DetailService.scss"
import "../Service.scss"
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { doc, getDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import { CaretDownOutlined, SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { getServiceDetailReducer, searchDetailServiceKeywordReducer, searchDetailServiceTimeReducer, searchDetailServiceTrangThaiReducer } from '../../../redux/Reducers/ServiceReducer/ServiceReducer';
import { DatePicker, Input, Select, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { useFormik } from 'formik';

interface DataType {
    stt: string;
    trangThai: string;
}

export default function DetailService() {

    const maDichVuParam = useParams();

    const dispatch = useAppDispatch();

    const serviceDetail = useAppSelector(state => state.ServiceReducer.serviceDetail);

    const detailPrintNumber = useAppSelector(state => state.ServiceReducer.detailPrintNumber);

    let serviceDetailRef = useRef({})

    const getDataDetailDevice = async () => {
        let maDichVu: string = maDichVuParam.maDichVu as string
        const docSnap = await getDoc(doc(database, "Services", maDichVu));
        if (docSnap.exists()) {
            serviceDetailRef.current = { ...docSnap.data(), id: docSnap.id }
            dispatch(getServiceDetailReducer(serviceDetailRef.current))
        }
    }

    useEffect(() => {
        getDataDetailDevice();
    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Số thứ tự',
            dataIndex: 'stt',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            render: (text) => {
                if (text === "Đang chờ") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotblue.png")} alt="dot" />Đang thực hiện</div>
                } else if (text === "Bỏ qua") {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../../assets/dashboard/dotgray.png")} alt="dot" />Vắng</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../../assets/dashboard/dotgreen.png")} alt="dot" />Đã thực hiện</div>
                }
            }
        }
    ];

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            console.log(value)
            await getDataDetailDevice();
            dispatch(searchDetailServiceKeywordReducer(value))
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

    const onChange = async (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        await getDataDetailDevice();
        dispatch(searchDetailServiceTimeReducer(dateString))
    };


    const handleChangeTrangThai = async (value: string) => {
        await getDataDetailDevice();
        if (value === "Đang thực hiện") {
            value = "Đang chờ"
            dispatch(searchDetailServiceTrangThaiReducer(value))
        } else if (value === "Đã thực hiện") {
            value = "Đã sử dụng"
            dispatch(searchDetailServiceTrangThaiReducer(value))
        } else if (value === "Vắng") {
            value = "Bỏ qua"
            dispatch(searchDetailServiceTrangThaiReducer(value))
        } else {
            dispatch(searchDetailServiceTrangThaiReducer(value))
        }
    }

    return (
        <div id="detailService" className='container-page formService'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Dịch vụ <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh sách dịch vụ <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Chi tiết
                        </h4>
                        <h4 className='text--titleBottom'>Quản lý dịch vụ</h4>
                    </div>
                    <div className='col-4'>
                        <div className='addService__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='detailService__bottom formInput__bottom'>
                <div className='container-fluid pl-0 h-100'>
                    <div className='row h-100'>
                        <div className='col-11 h-100'>
                            <div className='row h-100'>
                                <div className='col-4 h-100 detailService__colLeft'>
                                    <div className='content--padding--block h-100'>
                                        <div className='detailService__infoService'>
                                            <h4 className='text--title--small p-0'>Thông tin dịch vụ</h4>
                                            <div className='row detailService__info'>
                                                <div className='col-5 detailService__infoTitle'>Mã dịch vụ:</div>
                                                <div className='col-7 detailService__infoText'>{serviceDetail.maDichVu}</div>
                                            </div>
                                            <div className='row detailService__info'>
                                                <div className='col-5 detailService__infoTitle'>Tên dịch vụ:</div>
                                                <div className='col-7 detailService__infoText'>{serviceDetail.tenDichVu}</div>
                                            </div>
                                            <div className='row detailService__info'>
                                                <div className='col-5 detailService__infoTitle'>Mô tả:</div>
                                                <div className='col-7 detailService__infoText'>{serviceDetail.moTa}</div>
                                            </div>
                                        </div>
                                        <div className='detailService__infoService m-0'>
                                            <h4 className='text--title--small p-0'>Quy tắc cấp số</h4>
                                            {serviceDetail.quyTacCapSo.tangTuDong ? <div className='row detailService__info'>
                                                <div className='col-5 detailService__infoTitle d-flex align-items-center'>Tăng tự động:</div>
                                                <div className='col-7 formService__checboxContent d-flex align-items-center'>
                                                    <div className='d-flex align-items-center formService__checboxText mb-0'>
                                                        <p>0001</p>
                                                        <h5 className='font-weight-normal'>đến</h5>
                                                        <p>9999</p>
                                                    </div>
                                                </div>
                                            </div> : ""}
                                            {serviceDetail.quyTacCapSo.prefix ? <div className='row detailService__info'>
                                                <div className='col-5 detailService__infoTitle d-flex align-items-center'>Prefix:</div>
                                                <div className='col-7 formService__checboxContent d-flex align-items-center'>
                                                    <div className='d-flex align-items-center formService__checboxText mb-0'>
                                                        <p>0001</p>
                                                    </div>
                                                </div>
                                            </div> : ""}
                                            {serviceDetail.quyTacCapSo.surfix ? <div className='row detailService__info'>
                                                <div className='col-5 detailService__infoTitle d-flex align-items-center'>Surfix:</div>
                                                <div className='col-7 formService__checboxContent d-flex align-items-center'>
                                                    <div className='d-flex align-items-center formService__checboxText mb-0'>
                                                        <p>0001</p>
                                                    </div>
                                                </div>
                                            </div> : ""}
                                            {serviceDetail.quyTacCapSo.reset ? <div className='row detailService__info'>
                                                <div className='col-5 detailService__infoTitle d-flex align-items-center'>Reset mỗi ngày</div>
                                            </div> : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-8 h-100 detailService__colRight'>
                                    <div className='content--padding--block h-100'>
                                        <div className='d-flex justify-content-between'>
                                            <div style={{ marginRight: "24px" }}>
                                                <p className='label-input m-0'>Trạng thái</p>
                                                <Select
                                                    className='input-selectActive'
                                                    defaultValue="Tất cả"
                                                    style={{ width: 300 }}
                                                    onChange={handleChangeTrangThai}
                                                    suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                                    options={[
                                                        {
                                                            value: "Tất cả",
                                                            label: "Tất cả",
                                                        },
                                                        {
                                                            value: "Đã hoàn thành",
                                                            label: "Đã hoàn thành",
                                                        },
                                                        {
                                                            value: "Đang thực hiện",
                                                            label: "Đang thực hiện",
                                                        },
                                                        {
                                                            value: "Vắng",
                                                            label: "Vắng",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div>
                                                <p className='label-input m-0'>Chọn thời gian</p>
                                                <div className='service__input d-flex'>
                                                    <DatePicker.RangePicker onChange={onChange} suffixIcon={null} showTime format="DD/MM/YYYY" className='input-selectDate position-relative' />
                                                    <img style={{ width: "20px", height: "20px", position: "absolute", top: "51px", left: "264px" }} src={require("../../../assets/icon/calendar.png")} alt="calendar" />
                                                    <img style={{ width: "20px", height: "20px", position: "absolute", top: "51px", left: "415px" }} src={require("../../../assets/icon/calendar.png")} alt="calendar" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className='label-input m-0'>Tìm từ khóa</p>
                                                <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                                    <Input
                                                        className='input-search'
                                                        style={{ width: 300 }}
                                                        placeholder="Nhập từ khóa"
                                                        name="keyWord"
                                                        onChange={formik.handleChange}
                                                    />
                                                    <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "25%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className='detailService__table'>
                                            <Table
                                                className='service__tableLayout'
                                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'}
                                                columns={columns}
                                                dataSource={detailPrintNumber}
                                                rowKey="stt"
                                                pagination={{
                                                    itemRender: itemRender
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='button--addUpdate col-1 p-0'>
                            <div>
                                <NavLink to={`/service/updateservice/${serviceDetail.maDichVu}`} className='d-flex justify-content-center align-items-center h-100'>
                                    <div className='button--addUpdateContent'>
                                        <div className='d-flex justify-content-center'>
                                            <img src={require("../../../assets/icon/Edit Square.png")} alt="add" />
                                        </div>
                                        <p className='text-center button--addUpdateText'>Cập nhật danh sách</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className='mt-0 button--addUpdate w-100'>
                                <NavLink to="/service" className='d-flex justify-content-center align-items-center h-100'>
                                    <div className='button--addUpdateContent'>
                                        <div className='d-flex justify-content-center'>
                                            <img src={require("../../../assets/icon/back-square.png")} alt="add" />
                                        </div>
                                        <p className='text-center button--addUpdateText'>Quay lại</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
