import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import * as Yup from "yup"
import User from '../../../component/User/User';
import { RightOutlined } from '@ant-design/icons';
import { Input, Checkbox } from 'antd';
import "../Service.scss";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { getAllServiceReducer, getServiceDetailReducer, updateServiceReducer } from '../../../redux/Reducers/ServiceReducer/ServiceReducer';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import moment from 'moment';

export default function UpdateService() {

    const maDichVuParam = useParams();

    const dispatch = useAppDispatch();

    const serviceDetail = useAppSelector(state => state.ServiceReducer.serviceDetail);

    const updateSubmit = useAppSelector(state => state.ServiceReducer.updateSubmit);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const navigate = useNavigate();

    let serviceDetailRef = useRef({})

    let service: any[] = [];

    useEffect(() => {
        const getDataDetailDevice = async () => {
            let maDichVu: string = maDichVuParam.maDichVu as string
            const docSnap = await getDoc(doc(database, "Services", maDichVu));
            if (docSnap.exists()) {
                serviceDetailRef.current = { ...docSnap.data(), id: docSnap.id }
                dispatch(getServiceDetailReducer(serviceDetailRef.current))
            }
        }
        getDataDetailDevice();
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maDichVu: serviceDetail.maDichVu,
            moTa: serviceDetail.moTa,
            tenDichVu: serviceDetail.tenDichVu,
            trangThaiHoatDong: serviceDetail.trangThaiHoatDong,
            soTang: serviceDetail.soTang,
            quyTacCapSo: {
                prefix: serviceDetail.quyTacCapSo.prefix,
                surfix: serviceDetail.quyTacCapSo.surfix,
                tangTuDong: serviceDetail.quyTacCapSo.tangTuDong,
                reset: serviceDetail.quyTacCapSo.reset
            }
        },
        validationSchema: Yup.object().shape({
            maDichVu: Yup.string().trim().required("M?? d???ch v??? l?? tr?????ng b???t bu???c"),
            tenDichVu: Yup.string().trim().required("T??n d???ch v??? l?? tr?????ng b???t bu???c")
        }),
        onSubmit: (value) => {
            dispatch(updateServiceReducer(value))
        }
    })

    const updateServiceFireStore = async () => {
        if (updateSubmit) {
            let maDichVu: string = maDichVuParam.maDichVu as string
            await setDoc(doc(database, "Services", maDichVu), serviceDetail);
            await addDoc(collection(database, "ArrDiary"), {tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `C???p nh???t th??ng tin d???ch v??? ${serviceDetail.tenDichVu}`, IPThucHien: "192.168.1.1", thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")});
            const docSnap = await getDoc(doc(database, "Services", maDichVu));
            if (docSnap.exists()) {
                serviceDetailRef.current = { ...docSnap.data(), id: docSnap.id }
                dispatch(getServiceDetailReducer(serviceDetailRef.current))
            }
            const getService = await getDocs(collection(database, "Services"));
            getService.forEach((doc) => {
                service.push(doc.data())
            });
            await dispatch(getAllServiceReducer(service))
            await navigate("/service")
            window.location.reload()
        }
    }
    updateServiceFireStore()

    const onChangeCheckbox = (name: string, e: CheckboxChangeEvent) => {
        formik.setFieldValue(name, e.target.checked)
    };

    return (
        <div className='container-page formService formInput'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>D???ch v??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh s??ch d???ch v??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Chi ti???t <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            C???p nh???t
                        </h4>
                        <h4 className='text--titleBottom'>Qu???n l?? d???ch v???</h4>
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
                        <h4 className='text--title--small'>Th??ng tin d???ch v???</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>M?? d???ch v???: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input disabled={true} name="maDichVu" value={formik.values.maDichVu} onChange={formik.handleChange} placeholder='Nh???p m?? d???ch v???' type="text" />
                                        {formik.touched.maDichVu && <p className='text-danger'>{formik.errors.maDichVu}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>T??n d???ch v???: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDichVu" value={formik.values.tenDichVu} onChange={formik.handleChange} placeholder='Nh???p t??n d???ch v???' type="text" />
                                        {formik.touched.tenDichVu && <p className='text-danger'>{formik.errors.tenDichVu}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>M?? t???: </p>
                                        <Input.TextArea maxLength={1000} className='addService__inputDes' value={formik.values.moTa} name="moTa" onChange={formik.handleChange} placeholder='M?? t??? d???ch v???' />
                                    </div>
                                </div>
                                <div className='col-6 formService__number'>
                                    <h4 className='text--title--small p-0'>Quy t???c c???p s???</h4>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='formService__checkbox'>
                                                <Checkbox value={formik.values.quyTacCapSo.tangTuDong} checked={formik.values.quyTacCapSo.tangTuDong} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.tangTuDong", e) }}>T??ng t??? ?????ng t???: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox'>
                                                <Checkbox value={formik.values.quyTacCapSo.prefix} checked={formik.values.quyTacCapSo.prefix} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.prefix", e) }}>Prefix: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox'>
                                                <Checkbox value={formik.values.quyTacCapSo.surfix} checked={formik.values.quyTacCapSo.surfix} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.surfix", e) }}>Surfix: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox mb-0'>
                                                <Checkbox value={formik.values.quyTacCapSo.reset} checked={formik.values.quyTacCapSo.reset} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.reset", e) }}>Reset m???i ng??y: </Checkbox>
                                            </div>
                                        </div>
                                        <div className='col-6 formService__checboxContent'>
                                            <div className='d-flex align-items-center formService__checboxText'>
                                                <p>0001</p>
                                                <h5>?????n</h5>
                                                <p>9999</p>
                                            </div>
                                            <div className='d-flex align-items-center formService__checboxText'>
                                                <p>0001</p>
                                            </div>
                                            <div className='d-flex align-items-center formService__checboxText'>
                                                <p>0001</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> l?? tr?????ng th??ng tin b???t bu???c</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink className="button--orange--light--border" to="/service">H???y b???</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>C???p nh???t</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
