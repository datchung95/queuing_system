import React, { useEffect, useRef } from 'react'
import User from '../../../component/User/User'
import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import { getAllDevices, getDetailDeviceReducer, updateDetailDeviceReducer } from '../../../redux/Reducers/DeviceReducer/DeviceReducer';
import { useFormik } from 'formik';
import * as Yup from "yup"
import "./updateDevice.scss"
import moment from 'moment'

export default function UpdateDevice() {

    const maThietBiDetail = useParams();

    let deviceDetail: any = useRef({})

    const dispatch = useAppDispatch();

    const detailDevice = useAppSelector(state => state.DeviceReducer.detailDevice);

    let subMitUpdate = useAppSelector(state => state.DeviceReducer.subMitUpdate);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    const navigate = useNavigate();

    let device: any[] = [];

    useEffect(() => {
        const getDataDetailDevice = async () => {
            let maThietbi: string = maThietBiDetail.id as string
            const docSnap = await getDoc(doc(database, "Devices", maThietbi));
            if (docSnap.exists()) {
                deviceDetail.current = { ...docSnap.data(), id: docSnap.id }
                dispatch(getDetailDeviceReducer(deviceDetail.current))
            }
        }
        getDataDetailDevice();
    }, [])

    const updateDeviceFireStore = async () => {
        if (subMitUpdate) {
            let maThietbi: string = maThietBiDetail.id as string
            await setDoc(doc(database, "Devices", maThietbi), detailDevice);
            await addDoc(collection(database, "ArrDiary"), {tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `C???p nh???t th??ng tin thi???t b??? ${detailDevice.maThietBi}`, IPThucHien: detailDevice.diaChiIP, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")});

            const docSnap = await getDoc(doc(database, "Devices", maThietbi));
            if (docSnap.exists()) {
                deviceDetail.current = { ...docSnap.data(), id: docSnap.id }
                dispatch(getDetailDeviceReducer(deviceDetail.current))
            }
            const getDevice = await getDocs(collection(database, "Devices"));
            getDevice.forEach((doc) => {
                device.push({ ...doc.data(), id: doc.id })
            });
            await dispatch(getAllDevices(device))
            await navigate("/device")
            window.location.reload()
        }
    }
    updateDeviceFireStore()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maThietBi: detailDevice.maThietBi,
            tenThietBi: detailDevice.tenThietBi,
            diaChiIP: detailDevice.diaChiIP,
            loaiThietBi: detailDevice.loaiThietBi,
            hoatDong: detailDevice.hoatDong,
            ketNoi: detailDevice.ketNoi,
            dichVuSuDung: detailDevice.dichVuSuDung,
            tenDangNhap: detailDevice.tenDangNhap,
            matKhau: detailDevice.matKhau
        },
        validationSchema: Yup.object().shape({
            maThietBi: Yup.string().trim().required("M?? thi???t b??? l?? tr?????ng b???t bu???c"),
            tenThietBi: Yup.string().trim().required("T??n thi???t b??? l?? tr?????ng b???t bu???c"),
            diaChiIP: Yup.string().trim().required("?????a ch??? IP l?? tr?????ng b???t bu???c"),
            loaiThietBi: Yup.string().trim().required("Lo???i thi???t b??? l?? tr?????ng b???t bu???c"),
            dichVuSuDung: Yup.array().required("D???ch v??? s??? d???ng l?? tr?????ng b???t bu???c"),
            tenDangNhap: Yup.string().trim().required("T??n ????ng nh???p l?? tr?????ng b???t bu???c"),
            matKhau: Yup.string().trim().required("M???t kh???u l?? tr?????ng b???t bu???c")
        }),
        onSubmit: (value) => {
            dispatch(updateDetailDeviceReducer(value));
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

    const handleChangeTypeDevice = (value: string) => {
        formik.setFieldValue("loaiThietBi", value);
    };

    const handleChangeTag = (value: string[]) => {
        formik.setFieldValue("dichVuSuDung", value);
    };

    return (
        <div id="updateDevice" className='formInput container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thi???t b??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh s??ch thi???t b??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            C???p nh???t thi???t b???
                        </h4>
                        <h4 className='text--titleBottom'>Qu???n l?? thi???t b???</h4>
                    </div>
                    <div className='col-4'>
                        <div>
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
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Lo???i thi???t b???: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Ch???n lo???i thi???t b???"
                                            style={{ width: "100%" }}
                                            value={formik.values.loaiThietBi}
                                            onChange={handleChangeTypeDevice}
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
                                </div>
                                <div className='col-12'>
                                    <div className='formInput__bottomGroupInput updateDevice__selectService'>
                                        <p className='label-input m-0'>D???ch v??? s??? d???ng: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Nh???p d???ch v??? s??? d???ng"
                                            value={formik.values.dichVuSuDung}
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
                        <button className='button--orange formInput__bottomSubmit' type='submit'>C???p nh???t</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
