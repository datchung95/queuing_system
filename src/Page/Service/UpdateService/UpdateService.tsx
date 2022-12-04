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
import { getServiceDetailReducer, updateServiceReducer } from '../../../redux/Reducers/ServiceReducer/ServiceReducer';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
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
            quyTacCapSo: {
                prefix: serviceDetail.quyTacCapSo.prefix,
                surfix: serviceDetail.quyTacCapSo.surfix,
                tangTuDong: serviceDetail.quyTacCapSo.tangTuDong,
                reset: serviceDetail.quyTacCapSo.reset
            }
        },
        validationSchema: Yup.object().shape({
            maDichVu: Yup.string().trim().required("Mã dịch vụ là trường bắt buộc"),
            tenDichVu: Yup.string().trim().required("Tên dịch vụ là trường bắt buộc")
        }),
        onSubmit: async (value) => {
            await addDoc(collection(database, "ArrDiary"), {tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Cập nhật thông tin dịch vụ ${value.tenDichVu}`, IPThucHien: "192.168.1.1", thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")});
            dispatch(updateServiceReducer(value))
        }
    })

    const updateServiceFireStore = async () => {
        if (updateSubmit) {
            let maDichVu: string = maDichVuParam.maDichVu as string
            await setDoc(doc(database, "Services", maDichVu), serviceDetail);
            const docSnap = await getDoc(doc(database, "Services", maDichVu));
            if (docSnap.exists()) {
                serviceDetailRef.current = { ...docSnap.data(), id: docSnap.id }
                dispatch(getServiceDetailReducer(serviceDetailRef.current))
            }
            await navigate("/service");
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
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Dịch vụ <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh sách dịch vụ <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Chi tiết <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Cập nhật
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
                                        <Input disabled={true} name="maDichVu" value={formik.values.maDichVu} onChange={formik.handleChange} placeholder='Nhập mã dịch vụ' type="text" />
                                        {formik.touched.maDichVu && <p className='text-danger'>{formik.errors.maDichVu}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tên dịch vụ: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDichVu" value={formik.values.tenDichVu} onChange={formik.handleChange} placeholder='Nhập tên dịch vụ' type="text" />
                                        {formik.touched.tenDichVu && <p className='text-danger'>{formik.errors.tenDichVu}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Mô tả: </p>
                                        <Input.TextArea maxLength={1000} className='addService__inputDes' value={formik.values.moTa} name="moTa" onChange={formik.handleChange} placeholder='Mô tả dịch vụ' />
                                    </div>
                                </div>
                                <div className='col-6 formService__number'>
                                    <h4 className='text--title--small p-0'>Quy tắc cấp số</h4>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='formService__checkbox'>
                                                <Checkbox value={formik.values.quyTacCapSo.tangTuDong} checked={formik.values.quyTacCapSo.tangTuDong} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.tangTuDong", e) }}>Tăng tự động từ: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox'>
                                                <Checkbox value={formik.values.quyTacCapSo.prefix} checked={formik.values.quyTacCapSo.prefix} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.prefix", e) }}>Prefix: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox'>
                                                <Checkbox value={formik.values.quyTacCapSo.surfix} checked={formik.values.quyTacCapSo.surfix} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.surfix", e) }}>Surfix: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox mb-0'>
                                                <Checkbox value={formik.values.quyTacCapSo.reset} checked={formik.values.quyTacCapSo.reset} className='formService__checkboxBox' onChange={(e) => { onChangeCheckbox("quyTacCapSo.reset", e) }}>Reset mỗi ngày: </Checkbox>
                                            </div>
                                        </div>
                                        <div className='col-6 formService__checboxContent'>
                                            <div className='d-flex align-items-center formService__checboxText'>
                                                <p>0001</p>
                                                <h5>đến</h5>
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
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> là trường thông tin bắt buộc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink className="button--orange--light--border" to="/service">Hủy bỏ</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
