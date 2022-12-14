import React, { useRef, useEffect } from 'react'
import User from '../../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons';
import "./AddDevice.scss"
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { addDeviceReducer, getAllDevices } from '../../../redux/Reducers/DeviceReducer/DeviceReducer';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import database from '../../../configFirebase';
import moment from 'moment';
import { USER_LOGIN_ID } from '../../../util/Const/Const';
import { getUserProfileReducer } from '../../../redux/Reducers/UserReducer/UserReducer';

export default function AddDevice() {

    const dispatch = useAppDispatch();

    const newDevice = useAppSelector(state => state.DeviceReducer.newDevice);

    const subMitAdd = useAppSelector(state => state.DeviceReducer.subMitAdd);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    const navigate = useNavigate();

    let userLogin: any = useRef({})

    let device: any[] = [];

    useEffect(() => {
        const getDataUserLogin = async () => {
            let userLoginID: string = localStorage.getItem(USER_LOGIN_ID) as string
            const docSnap = await getDoc(doc(database, "User", userLoginID));
            if (docSnap.exists()) {
                userLogin.current = {...docSnap.data(), id: docSnap.id, token: docSnap.id}
                dispatch(getUserProfileReducer(userLogin.current))
            }
        }
        getDataUserLogin();
    }, [])

    const formik = useFormik({
        initialValues: {
            maThietBi: "",
            tenThietBi: "",
            diaChiIP: "",
            loaiThietBi: "",
            hoatDong: "",
            ketNoi: "",
            dichVuSuDung: "",
            tenDangNhap: "",
            matKhau: ""
        },
        validationSchema: Yup.object().shape({
            maThietBi: Yup.string().trim().required("M?? thi???t b??? l?? tr?????ng b???t bu???c"),
            tenThietBi: Yup.string().trim().required("T??n thi???t b??? l?? tr?????ng b???t bu???c"),
            diaChiIP: Yup.string().trim().required("?????a ch??? IP l?? tr?????ng b???t bu???c"),
            loaiThietBi: Yup.string().trim().required("Lo???i thi???t b??? l?? tr?????ng b???t bu???c"),
            dichVuSuDung: Yup.array().required("D???ch v??? s??? d???ng l?? tr?????ng b???t bu???c"),
            tenDangNhap: Yup.string().trim().required("T??n ????ng nh???p l?? tr?????ng b???t bu???c"),
            matKhau: Yup.string().trim().required("M???t kh???u l?? tr?????ng b???t bu???c"),
            hoatDong: Yup.string().trim().required("Tr???ng th??i ho???t ?????ng l?? tr?????ng b???t bu???c"),
            ketNoi: Yup.string().trim().required("Tr???ng th??i k???t n???i l?? tr?????ng b???t bu???c")
        }),
        onSubmit: (value) => {
            dispatch(addDeviceReducer(value));
        }
    })

    const renderSelectSevice = () => {
        return arrService.map((item, index) => {
            return {
                value: item.tenDichVu,
                label: item.tenDichVu
            }
        })
    }

    const addDeviceFirestore = async () => {
        if (subMitAdd) {
            await addDoc(collection(database, "Devices"), newDevice);
            await addDoc(collection(database, "ArrDiary"), {tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Th??m thi???t b??? ${newDevice.maThietBi}`, IPThucHien: newDevice.diaChiIP, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")});
            const getDevice = await getDocs(collection(database, "Devices"));
            getDevice.forEach((doc) => {
                device.push({ ...doc.data(), id: doc.id })
            });
            await dispatch(getAllDevices(device))
            await navigate("/device")
            window.location.reload()
        }
    }
    addDeviceFirestore()

    const handleChangeLoaiThietBi = (value: string) => {
        formik.setFieldValue("loaiThietBi", value)
    };

    const handleChangeHoatDong = (value: string) => {
        formik.setFieldValue("hoatDong", value)
    };

    const handleChangeKetNoi = (value: string) => {
        formik.setFieldValue("ketNoi", value)
    };

    const handleChangeTag = (value: string[]) => {
        formik.setFieldValue("dichVuSuDung", value)
    };

    return (
        <div id="addDevice" className='container-page formInput'>
            <div className='container-fluid addDevice__header'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thi???t b??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh s??ch thi???t b??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Th??m thi???t b???
                        </h4>
                        <h4 className='text--titleBottom'>Qu???n l?? thi???t b???</h4>
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
                    <div className='content--padding--block'>
                        <h4 className='text--title--small'>Th??ng tin thi???t b???</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>M?? thi???t b???: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="maThietBi" value={formik.values.maThietBi} onChange={formik.handleChange} placeholder='Nh???p m?? thi???t b???' type="text" />
                                        {formik.touched.maThietBi && <p className='text-danger'>{formik.errors.maThietBi}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>T??n thi???t b???: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenThietBi" value={formik.values.tenThietBi} onChange={formik.handleChange} placeholder='Nh???p t??n thi???t b???' type="text" />
                                        {formik.touched.tenThietBi && <p className='text-danger'>{formik.errors.tenThietBi}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>?????a ch??? IP: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="diaChiIP" value={formik.values.diaChiIP} onChange={formik.handleChange} placeholder='Nh???p ?????a ch??? IP' type="text" />
                                        {formik.touched.diaChiIP && <p className='text-danger'>{formik.errors.diaChiIP}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tr???ng th??i ho???t ?????ng: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Ch???n tr???ng th??i ho???t ?????ng"
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
                                        {formik.touched.hoatDong && <p className='text-danger'>{formik.errors.hoatDong}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Lo???i thi???t b???: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Ch???n lo???i thi???t b???"
                                            style={{ width: "100%" }}
                                            onChange={handleChangeLoaiThietBi}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: 'Kiosk',
                                                    label: 'Kiosk',
                                                },
                                                {
                                                    value: 'Display counter',
                                                    label: 'Display counter',
                                                },
                                            ]}
                                        />
                                        {formik.touched.loaiThietBi && <p className='text-danger'>{formik.errors.loaiThietBi}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>T??n ????ng nh???p: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDangNhap" value={formik.values.tenDangNhap} onChange={formik.handleChange} placeholder='Nh???p t??i kho???n' type="text" />
                                        {formik.touched.tenDangNhap && <p className='text-danger'>{formik.errors.tenDangNhap}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>M???t kh???u: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="matKhau" value={formik.values.matKhau} onChange={formik.handleChange} placeholder='Nh???p m???t kh???u' type="text" />
                                        {formik.touched.matKhau && <p className='text-danger'>{formik.errors.matKhau}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tr???ng th??i k???t n???i: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Ch???n tr???ng th??i k???t n???i"
                                            style={{ width: "100%" }}
                                            onChange={handleChangeKetNoi}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: 'K???t n???i',
                                                    label: 'K???t n???i',
                                                },
                                                {
                                                    value: 'M???t k???t n???i',
                                                    label: 'M???t k???t n???i',
                                                },
                                            ]}
                                        />
                                        {formik.touched.ketNoi && <p className='text-danger'>{formik.errors.ketNoi}</p>}
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>D???ch v??? s??? d???ng: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Nh???p d???ch v??? s??? d???ng"
                                            onChange={handleChangeTag}
                                            options={renderSelectSevice()}
                                        />
                                        {formik.touched.dichVuSuDung && <p className='text-danger'>{formik.errors.dichVuSuDung}</p>}
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> l?? tr?????ng th??ng tin b???t bu???c</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink className="button--orange--light--border" to="/device">H???y b???</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Th??m thi???t b???</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
