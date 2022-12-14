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
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import database from '../../../../configFirebase';
import { addUserAccountReducer, getDataUserReducer } from '../../../../redux/Reducers/UserReducer/UserReducer';
import openNotificationWithIcon from '../../../../Notification/Notification';
import { addUpUserPositionReducer, getListPositionManagementReducer } from '../../../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';

export default function AddAccount() {

    const dispatch = useAppDispatch();

    const listPosition = useAppSelector(state => state.PositionManagementReducer.listPosition);

    const subMit = useAppSelector(state => state.UserReducer.subMit);

    const addUser = useAppSelector(state => state.UserReducer.addUser);

    const arrUser = useAppSelector(state => state.UserReducer.arrUser);

    const detailPosition = useAppSelector(state => state.PositionManagementReducer.detailPosition);

    const navigate = useNavigate();

    let user: any[] = [];

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(database, "User"));
            querySnapshot.forEach((doc) => {
                user.push({ ...doc.data(), id: doc.id, token: doc.id })
            });
            dispatch(getDataUserReducer(user));
        }
        getData();
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
            img: "",
            thoiGianCap: [
                {
                    nguoiNhan: "",
                    thoiGianNhanSo: ""
                }
            ]
        },
        validationSchema: Yup.object().shape({
            tenNguoiDung: Yup.string().trim().required("T??n ng?????i d??ng l?? tr?????ng b???t bu???c"),
            soDienThoai: Yup.string().trim().required("S??? ??i???n tho???i l?? tr?????ng b???t bu???c"),
            email: Yup.string().trim().required("Email l?? tr?????ng b???t bu???c"),
            vaiTro: Yup.string().trim().required("Vai tr?? l?? tr?????ng b???t bu???c"),
            tenDangNhap: Yup.string().trim().required("T??n ????ng nh???p l?? tr?????ng b???t bu???c"),
            matKhau: Yup.string().trim().required("M???t kh???u l?? tr?????ng b???t bu???c"),
            nhapLaiMatKhau: Yup.string().trim().required("Nh???p l???i m???t kh???u l?? tr?????ng b???t bu???c"),
            trangThaiHoatDong: Yup.string().trim().required("Tr???ng th??i ho???t ?????ng l?? tr?????ng b???t bu???c")
        }),
        onSubmit: (value) => {
            value.img = "https://picsum.photos/1";
            if (value.matKhau === value.nhapLaiMatKhau) {
                let indexMail = arrUser.findIndex(item => item.email === value.email);
                if (indexMail !== -1) {
                    openNotificationWithIcon("error", "Email ???? t???n t???i");
                } else {
                    dispatch(addUpUserPositionReducer(value.vaiTro))
                    dispatch(addUserAccountReducer(value))
                }
            } else {
                openNotificationWithIcon("error", "M???t kh???u v?? nh???p l???i m???t kh???u ph???i gi???ng nhau");
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
            window.location.reload()
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
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>C??i ?????t h??? th???ng <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Qu???n l?? t??i kho???n <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Th??m t??i kho???n
                        </h4>
                        <h4 className='text--titleBottom'>Qu???n l?? t??i kho???n</h4>
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
                        <h4 className='text--title--small'>Th??ng tin t??i kho???n</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>H??? t??n: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenNguoiDung" onChange={formik.handleChange} placeholder='Nh???p h??? t??n' type="text" />
                                        {formik.touched.tenNguoiDung && <p className='text-danger'>{formik.errors.tenNguoiDung}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>S??? ??i???n tho???i: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="soDienThoai" onChange={formik.handleChange} placeholder='Nh???p s??? ??i???n tho???i' type="text" />
                                        {formik.touched.soDienThoai && <p className='text-danger'>{formik.errors.soDienThoai}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Email: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="email" onChange={formik.handleChange} placeholder='Nh???p email' type="email" />
                                        {formik.touched.email && <p className='text-danger'>{formik.errors.email}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Vai tr??: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Ch???n vai tr??"
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
                                        <p className='label-input m-0'>T??n ????ng nh???p: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDangNhap" onChange={formik.handleChange} placeholder='Nh???p t??n ????ng nh???p' type="text" />
                                        {formik.touched.tenDangNhap && <p className='text-danger'>{formik.errors.tenDangNhap}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>M???t kh???u: <span style={{ color: "#FF4747" }}>*</span></p>
                                        {truePass ? <Input.Password placeholder='Nh???p m???t kh???u' iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='matKhau' onChange={formik.handleChange} /> : <Input.Password placeholder='Nh???p m???t kh???u' style={{ borderColor: "red" }} iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='matKhau' onChange={formik.handleChange} />}
                                        {formik.touched.matKhau && <p className='text-danger'>{formik.errors.matKhau}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Nh???p l???i m???t kh???u: <span style={{ color: "#FF4747" }}>*</span></p>
                                        {truePass ? <Input.Password placeholder='Nh???p l???i m???t kh???u' iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='nhapLaiMatKhau' onChange={formik.handleChange} /> : <Input.Password placeholder='Nh???p l???i m???t kh???u' style={{ borderColor: "red" }} iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../../assets/icon/eye.png")} alt="eye" />)} type="password" name='nhapLaiMatKhau' onChange={formik.handleChange} />}
                                        {formik.touched.nhapLaiMatKhau && <p className='text-danger'>{formik.errors.nhapLaiMatKhau}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>T??nh tr???ng: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Ch???n tr???ng th??i k???t n???i"
                                            style={{ width: "100%" }}
                                            onChange={handleChangeHoatDong}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: 'Ho???t ?????ng',
                                                    label: 'Ho???t ?????ng',
                                                },
                                                {
                                                    value: 'Ng??ng ho???t ?????ng',
                                                    label: 'Ng??ng ho???t ?????ng',
                                                },
                                            ]}
                                        />
                                        {formik.touched.trangThaiHoatDong && <p className='text-danger'>{formik.errors.trangThaiHoatDong}</p>}
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> l?? tr?????ng th??ng tin b???t bu???c</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink style={{ paddingLeft: "37px", paddingRight: "37px" }} className="button--orange--light--border" to="/system/accountmanagement">H???y b???</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Th??m</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
