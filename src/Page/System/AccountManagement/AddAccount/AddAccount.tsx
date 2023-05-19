import React, { useEffect } from 'react'
import User from '../../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { CaretDownOutlined, EyeTwoTone } from '@ant-design/icons';
import "../AccountManagement.scss"
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { getDataUserReducer } from '../../../../redux/Reducers/UserReducer/UserReducer';
import openNotificationWithIcon from '../../../../Notification/Notification';
import { getListPositionManagementReducer } from '../../../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';
import { addDataAction } from '../../../../redux/Actions/AddDataAction/AddDataAction';
import { DIARY, LIST_POSITION, USER } from '../../../../redux/Const/Const';
import { getAllDataAction } from '../../../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { updatePositionQuantityUserAction } from '../../../../redux/Actions/UpdateDataAction/UpdateDataAction';
import { addHistoryAction } from '../../../../redux/Actions/AddHistoryAction/AddHistoryAction';
import moment from 'moment';
import { getAllListDiaryReducer } from '../../../../redux/Reducers/DiaryReducer/DiaryReducer';

export default function AddAccount() {

    const dispatch = useAppDispatch();

    const listPosition = useAppSelector(state => state.PositionManagementReducer.listPosition);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const arrUser = useAppSelector(state => state.UserReducer.arrUser);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllDataAction(LIST_POSITION, getListPositionManagementReducer))
    }, [])

    let truePass: boolean = true;

    const formik = useFormik({
        initialValues: {
            tenNguoiDung: "",
            soDienThoai: "",
            email: "",
            vaiTro: "",
            tenDangNhap: "",
            matKhau: "",
            nhapLaiMatKhau: "",
            trangThaiHoatDong: "",
            img: ""
        },
        validationSchema: Yup.object().shape({
            tenNguoiDung: Yup.string().trim().required("Tên người dùng là trường bắt buộc"),
            soDienThoai: Yup.string().trim().required("Số điện thoại là trường bắt buộc"),
            email: Yup.string().trim().required("Email là trường bắt buộc"),
            vaiTro: Yup.string().trim().required("Vai trò là trường bắt buộc"),
            tenDangNhap: Yup.string().trim().required("Tên đăng nhập là trường bắt buộc"),
            matKhau: Yup.string().trim().required("Mật khẩu là trường bắt buộc"),
            nhapLaiMatKhau: Yup.string().trim().required("Nhập lại mật khẩu là trường bắt buộc"),
            trangThaiHoatDong: Yup.string().trim().required("Trạng thái hoạt động là trường bắt buộc")
        }),
        onSubmit: async (value) => {
            value.img = "https://picsum.photos/1";
            if (value.matKhau === value.nhapLaiMatKhau) {
                let indexMail = arrUser.findIndex(item => item.email === value.email);
                let indexPosition = listPosition.findIndex(item => item.tenVaiTro === value.vaiTro)
                if (indexMail !== -1) {
                    openNotificationWithIcon("error", "Email đã tồn tại");
                } else {
                    if (indexPosition !== -1) {
                        await dispatch(updatePositionQuantityUserAction(LIST_POSITION, listPosition[indexPosition].id, listPosition[indexPosition].soNguoiDung + 1, getListPositionManagementReducer))
                    }
                    await dispatch(addDataAction(USER, value, getDataUserReducer))
                    dispatch(addHistoryAction(DIARY, { tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Thêm người dùng ${value.tenDangNhap}`, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss") }, getAllListDiaryReducer)).then(() => {
                        navigate("/system/accountmanagement")
                    })
                }
            } else {
                openNotificationWithIcon("error", "Mật khẩu và nhập lại mật khẩu phải giống nhau");
            }
        }
    })

    const renderListPosition = () => {
        return listPosition.map((item, index) => {
            return {
                value: item.tenVaiTro,
                label: item.tenVaiTro
            }
        })
    }

    const handleChangeVaiTro = (value: string) => {
        formik.setFieldValue("vaiTro", value)
    };

    const handleChangeHoatDong = (value: string) => {
        formik.setFieldValue("trangThaiHoatDong", value)
    };

    return (
        <div className='container-page formInput formService'>
            <div className='container-fluid addDevice__header'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Cài đặt hệ thống <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Quản lý tài khoản <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Thêm tài khoản
                        </h4>
                        <h4 className='text--titleBottom'>Quản lý tài khoản</h4>
                    </div>
                    <div className='col-4'>
                        <div className='addDevice__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='formInput__bottom'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='content--padding--block mr-0'>
                        <h4 className='text--title--small'>Thông tin tài khoản</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Họ tên: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenNguoiDung" onChange={formik.handleChange} placeholder='Nhập họ tên' type="text" />
                                        {formik.touched.tenNguoiDung && <p className='text-danger'>{formik.errors.tenNguoiDung}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Số điện thoại: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="soDienThoai" onChange={formik.handleChange} placeholder='Nhập số điện thoại' type="text" />
                                        {formik.touched.soDienThoai && <p className='text-danger'>{formik.errors.soDienThoai}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Email: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="email" onChange={formik.handleChange} placeholder='Nhập email' type="email" />
                                        {formik.touched.email && <p className='text-danger'>{formik.errors.email}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Vai trò: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Chọn vai trò"
                                            style={{ width: "100%" }}
                                            onChange={handleChangeVaiTro}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={renderListPosition()}
                                        />
                                        {formik.touched.vaiTro && <p className='text-danger'>{formik.errors.vaiTro}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tên đăng nhập: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDangNhap" onChange={formik.handleChange} placeholder='Nhập tên đăng nhập' type="text" />
                                        {formik.touched.tenDangNhap && <p className='text-danger'>{formik.errors.tenDangNhap}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Mật khẩu: <span style={{ color: "#FF4747" }}>*</span></p>
                                        {truePass ? <Input.Password placeholder='Nhập mật khẩu' iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='matKhau' onChange={formik.handleChange} /> : <Input.Password placeholder='Nhập mật khẩu' style={{ borderColor: "red" }} iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='matKhau' onChange={formik.handleChange} />}
                                        {formik.touched.matKhau && <p className='text-danger'>{formik.errors.matKhau}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Nhập lại mật khẩu: <span style={{ color: "#FF4747" }}>*</span></p>
                                        {truePass ? <Input.Password placeholder='Nhập lại mật khẩu' iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='nhapLaiMatKhau' onChange={formik.handleChange} /> : <Input.Password placeholder='Nhập lại mật khẩu' style={{ borderColor: "red" }} iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='nhapLaiMatKhau' onChange={formik.handleChange} />}
                                        {formik.touched.nhapLaiMatKhau && <p className='text-danger'>{formik.errors.nhapLaiMatKhau}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tình trạng: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Chọn trạng thái kết nối"
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
                                        {formik.touched.trangThaiHoatDong && <p className='text-danger'>{formik.errors.trangThaiHoatDong}</p>}
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> là trường thông tin bắt buộc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink style={{ paddingLeft: "37px", paddingRight: "37px" }} className="button--orange--light--border" to="/system/accountmanagement">Hủy bỏ</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
