import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import * as Yup from "yup"
import User from '../../../component/User/User';
import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Input, Select, Checkbox } from 'antd';
import "../Service.scss";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { addServiceReducer, getAllServiceReducer } from '../../../redux/Reducers/ServiceReducer/ServiceReducer';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import { USER_LOGIN_ID } from '../../../util/Const/Const';
import { getUserProfileReducer } from '../../../redux/Reducers/UserReducer/UserReducer';
import moment from 'moment';

export default function AddService() {

    const dispatch = useAppDispatch();

    const addService = useAppSelector(state => state.ServiceReducer.addService);

    const addSubmit = useAppSelector(state => state.ServiceReducer.addSubmit);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const navigate = useNavigate();

    let userLogin: any = useRef({})

    let service: any[] = [];

    useEffect(() => {
        const getDataUserLogin = async () => {
            let userLoginID: string = localStorage.getItem(USER_LOGIN_ID) as string
            const docSnap = await getDoc(doc(database, "User", userLoginID));
            if (docSnap.exists()) {
                userLogin.current = docSnap.data()
                dispatch(getUserProfileReducer(userLogin.current))
            }
        }
        getDataUserLogin();
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maDichVu: "",
            moTa: "",
            tenDichVu: "",
            trangThaiHoatDong: "",
            soTang: "0000",
            quyTacCapSo: {
                prefix: false,
                surfix: false,
                tangTuDong: false,
                reset: false
            }
        },
        validationSchema: Yup.object().shape({
            maDichVu: Yup.string().trim().required("M?? d???ch v??? l?? tr?????ng b???t bu???c"),
            tenDichVu: Yup.string().trim().required("T??n d???ch v??? l?? tr?????ng b???t bu???c")
        }),
        onSubmit: (value) => {
            dispatch(addServiceReducer(value))
        }
    })

    const addServiceFirestore = async () => {
        if (addSubmit) {
            await setDoc(doc(database, "Services", addService.maDichVu), {...addService, soTang: "0000"});
            await addDoc(collection(database, "ArrDiary"), {tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Th??m d???ch v??? ${addService.tenDichVu}`, IPThucHien: "192.168.1.1", thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")});
            const getService = await getDocs(collection(database, "Services"));
            getService.forEach((doc) => {
                service.push(doc.data())
            });
            await dispatch(getAllServiceReducer(service))
            await navigate("/service")
            window.location.reload()
        }
    }
    addServiceFirestore()

    const handleChangeHoatDong = (value: string) => {
        formik.setFieldValue("trangThaiHoatDong", value)
    };

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
                            Th??m d???ch v???
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
                                        <Input name="maDichVu" onChange={formik.handleChange} placeholder='Nh???p m?? d???ch v???' type="text" />
                                        {formik.touched.maDichVu && <p className='text-danger'>{formik.errors.maDichVu}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>T??n d???ch v???: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDichVu" onChange={formik.handleChange} placeholder='Nh???p t??n d???ch v???' type="text" />
                                        {formik.touched.tenDichVu && <p className='text-danger'>{formik.errors.tenDichVu}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>M?? t???: </p>
                                        <Input.TextArea maxLength={1000} className='addService__inputDes' name="moTa" onChange={formik.handleChange} placeholder='M?? t??? d???ch v???' />
                                    </div>
                                </div>
                                <div className='col-6 formService__number'>
                                    <h4 className='text--title--small p-0'>Quy t???c c???p s???</h4>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='formService__checkbox'>
                                                <Checkbox className='formService__checkboxBox' onChange={(e) => {onChangeCheckbox("quyTacCapSo.tangTuDong", e)}}>T??ng t??? ?????ng t???: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox'>
                                                <Checkbox className='formService__checkboxBox' onChange={(e) => {onChangeCheckbox("quyTacCapSo.prefix", e)}}>Prefix: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox'>
                                                <Checkbox className='formService__checkboxBox' onChange={(e) => {onChangeCheckbox("quyTacCapSo.surfix", e)}}>Surfix: </Checkbox>
                                            </div>
                                            <div className='formService__checkbox mb-0'>
                                                <Checkbox className='formService__checkboxBox' onChange={(e) => {onChangeCheckbox("quyTacCapSo.reset", e)}}>Reset m???i ng??y: </Checkbox>
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
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tr???ng th??i ho???t ?????ng: </p>
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
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Th??m dich v???</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
