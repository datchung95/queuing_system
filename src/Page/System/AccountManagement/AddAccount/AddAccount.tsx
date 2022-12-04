import React from 'react'
import User from '../../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { CaretDownOutlined, EyeTwoTone } from '@ant-design/icons';
import "../AccountManagement.scss"
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import database from '../../../../configFirebase';
import { addUserAccountReducer } from '../../../../redux/Reducers/UserReducer/UserReducer';
import openNotificationWithIcon from '../../../../Notification/Notification';
import { addUpUserPositionReducer } from '../../../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';

export default function AddAccount() {

    const dispatch = useAppDispatch();

    const listPosition = useAppSelector(state => state.PositionManagementReducer.listPosition);

    const subMit = useAppSelector(state => state.UserReducer.subMit);

    const addUser = useAppSelector(state => state.UserReducer.addUser);

    const detailPosition = useAppSelector(state => state.PositionManagementReducer.detailPosition);

    const navigate = useNavigate();

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
            img: "",
            thoiGianCap: [
                {
                    nguoiNhan: "",
                    thoiGianNhanSo: ""
                }
            ]
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
        onSubmit: (value) => {
            value.img = "https://picsum.photos/1";
            if (value.matKhau === value.nhapLaiMatKhau) {
                dispatch(addUpUserPositionReducer(value.vaiTro))
                dispatch(addUserAccountReducer(value))
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

    const addUserAccountFirestore = async () => {
        if (subMit) {
            await setDoc(doc(database, "ListPosition", detailPosition.id), detailPosition)
            await addDoc(collection(database, "User"), addUser);
            await navigate("/system/accountmanagement")
            window.location.reload();
        }
    }
    addUserAccountFirestore()

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
