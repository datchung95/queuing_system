import React, { useEffect, useRef } from 'react'
import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';
import User from '../../../component/User/User';
import "./AddNumber.scss"
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import moment from "moment"
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import { openModalNumberReducer } from '../../../redux/Reducers/NumberReducer/NumberReducer';
import ModalNumber from '../ModalNumber/ModalNumber';
import { USER_LOGIN_ID } from '../../../util/Const/Const';
import { getUserProfileReducer } from '../../../redux/Reducers/UserReducer/UserReducer';

export default function AddNumber() {

    const dispatch = useAppDispatch();

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    let userLogin: any = useRef({})

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
        enableReinitialize: true,
        initialValues: {
            stt: "",
            khachHang: userProfile.tenNguoiDung,
            thoiGianCap: "",
            hanSuDung: "",
            trangThai: "Đang chờ",
            nguonCap: "",
            dichVu: "",
            maDichVu: "",
            soDT: userProfile.soDienThoai,
            email: userProfile.email,
            idUser: userProfile.id
        },
        onSubmit: async (value) => {
            let randomNguonCap = Math.floor(Math.random() * 2);
            if (randomNguonCap === 0) {
                value.nguonCap = "Kisok";
            } else {
                value.nguonCap = "Hệ thống";
            }
            let indexService = arrService.findIndex(item => item.maDichVu === value.maDichVu);
            if (indexService !== -1) {
                let number: number = parseInt(arrService[indexService].soTang) + 1
                let numberString: string;
                if (number <= 999 && number >= 100) {
                    numberString = "0" + number.toString();
                } else if (number <= 99 && number >= 10) {
                    numberString = "00" + number.toString();
                } else if (number <= 9 && number >= 0) {
                    numberString = "000" + number.toString();
                } else {
                    numberString = number.toString();
                }
                await updateDoc(doc(database, "Services", arrService[indexService].maDichVu), { soTang: numberString })
                await updateDoc(doc(database, "Services", arrService[indexService].maDichVu), { ngayTang: moment(moment.now()).format("DD/MM/YYYY") })
                value.stt = value.maDichVu + numberString;
            }
            value.thoiGianCap = moment(moment.now()).format("hh:mm - DD/MM/YYYY");
            value.hanSuDung = moment(moment.now()).add(5, "days").format("hh:mm - DD/MM/YYYY")
            await addDoc(collection(database, "Numbers"), value);
            await updateDoc(doc(database, "Services", value.maDichVu), { chiTietInSo: arrayUnion({stt: value.stt, trangThai: value.trangThai, thoiGianCap: value.thoiGianCap, hanSuDung: value.hanSuDung}) });
            await updateDoc(doc(database, "User", value.idUser), { thoiGianCap: arrayUnion({nguoiNhan: value.khachHang, thoiGianNhanSo: value.thoiGianCap}) });
            dispatch(openModalNumberReducer(true));
        }
    })

    const renderSelectSevice = () => {
        return arrService.map((item, index) => {
            return {
                value: item.maDichVu,
                label: item.tenDichVu
            }
        })
    }

    const handleChangeService = (value: string) => {
        formik.setFieldValue("maDichVu", value);
        let index = arrService.findIndex(item => item.maDichVu === value);
        if (index !== -1) {
            formik.setFieldValue("dichVu", arrService[index].tenDichVu);
        }
    };

    return (
        <div id="addNumber" className='container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh sách cấp số <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Cấp số mới
                        </h4>
                        <h4 className='text--titleBottom'>Quản lý cấp số</h4>
                    </div>
                    <div className='col-4'>
                        <div className='number__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content--padding--block'>
                <form onSubmit={formik.handleSubmit}>
                    <h4 className='addService__title'>Cấp số mới</h4>
                    <div className='addService__formSelect'>
                        <p className='addService__formLabel'>Dịch vụ khách hàng lựa chọn</p>
                        <Select
                            className='addService__form'
                            placeholder="Chọn dịch vụ"
                            style={{ width: "400px" }}
                            listHeight={198}
                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                            onChange={handleChangeService}
                            options={renderSelectSevice()}
                        />
                    </div>
                    <div className='text-center addService__button'>
                        <NavLink className="button--orange--light--border addService__buttonCancel" to="/number">Hủy bỏ</NavLink>
                        <button className='button--orange addService__buttonSubmit' type='submit'>In số</button>
                    </div>
                </form>
            </div>
            <ModalNumber dichVu={formik.values.dichVu} stt={formik.values.stt} thoiGianCap={formik.values.thoiGianCap} hanSuDung={formik.values.hanSuDung} />
        </div>
    )
}
