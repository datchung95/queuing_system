import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import * as Yup from "yup"
import User from '../../../component/User/User';
import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import "../Service.scss";
import { addServiceReducer, getAllServiceReducer } from '../../../redux/Reducers/ServiceReducer/ServiceReducer';
import moment from 'moment';
import { DIARY, SERVICES } from '../../../redux/Const/Const';
import { addDataAction } from '../../../redux/Actions/AddDataAction/AddDataAction';
import { addHistoryAction } from '../../../redux/Actions/AddHistoryAction/AddHistoryAction';
import { getAllListDiaryReducer } from '../../../redux/Reducers/DiaryReducer/DiaryReducer';
import { getAllDataAction } from '../../../redux/Actions/GetAllDataAction/GetAllDataAction';
import openNotificationWithIcon from '../../../Notification/Notification';

export default function AddService() {

    const dispatch = useAppDispatch();

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllDataAction(SERVICES, getAllServiceReducer))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maDichVu: "",
            moTa: "",
            tenDichVu: "",
            trangThaiHoatDong: "",
            email: ""
        },
        validationSchema: Yup.object().shape({
            maDichVu: Yup.string().trim().required("Mã dịch vụ là trường bắt buộc"),
            tenDichVu: Yup.string().trim().required("Tên dịch vụ là trường bắt buộc")
        }),
        onSubmit: async (value) => {
            let indexDeviceCode = arrService.findIndex(item => item.maDichVu === value.maDichVu)
            if (indexDeviceCode !== -1) {
                openNotificationWithIcon("error", "Mã dịch vụ đã tồn tại")
            } else {
                value.email = userProfile.email
                await dispatch(addDataAction(SERVICES, value, addServiceReducer));
                dispatch(addHistoryAction(DIARY, { tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Thêm dịch vụ ${value.tenDichVu}`, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss") }, getAllListDiaryReducer)).then(() => {
                    navigate("/service")
                })
            }
        }
    })

    const handleChangeHoatDong = (value: string) => {
        formik.setFieldValue("trangThaiHoatDong", value)
    };

    return (
        <div className='container-page formService formInput'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Dịch vụ <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh sách dịch vụ <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Thêm dịch vụ
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
            <div className='formInput__bottom'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='content--padding--block'>
                        <h4 className='text--title--small'>Thông tin dịch vụ</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Mã dịch vụ: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="maDichVu" onChange={formik.handleChange} placeholder='Nhập mã dịch vụ' type="text" />
                                        {formik.touched.maDichVu && <p className='text-danger'>{formik.errors.maDichVu}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tên dịch vụ: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDichVu" onChange={formik.handleChange} placeholder='Nhập tên dịch vụ' type="text" />
                                        {formik.touched.tenDichVu && <p className='text-danger'>{formik.errors.tenDichVu}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Mô tả: </p>
                                        <Input.TextArea maxLength={1000} className='addService__inputDes' name="moTa" onChange={formik.handleChange} placeholder='Mô tả dịch vụ' />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Trạng thái hoạt động: </p>
                                        <Select
                                            placeholder="Chọn trạng thái hoạt động"
                                            style={{ width: "100%" }}
                                            onChange={handleChangeHoatDong}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: 'Hoạt động',
                                                    label: 'Hoạt động',
                                                },
                                                {
                                                    value: 'Ngưng hoạt động',
                                                    label: 'Ngưng hoạt động',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> là trường thông tin bắt buộc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink className="button--orange--light--border" to="/service">Hủy bỏ</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Thêm dich vụ</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
