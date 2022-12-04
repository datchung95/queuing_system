import React, { useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import User from '../../../component/User/User';
import { RightOutlined } from '@ant-design/icons';
import { doc, getDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getDetailNumberReducer } from '../../../redux/Reducers/NumberReducer/NumberReducer';
import "./DetailNumber.scss"

export default function DetailNumber() {

    const id = useParams();

    let detailNumberRef = useRef({});

    const dispatch = useAppDispatch();

    const detailNumber = useAppSelector(state => state.NumberReducer.detailNumber);

    useEffect(() => {
        const getDataDetailDevice = async () => {
            let idNumber: string = id.id as string
            const docSnap = await getDoc(doc(database, "Numbers", idNumber));
            if (docSnap.exists()) {
                detailNumberRef.current = { ...docSnap.data(), id: docSnap.id }
                dispatch(getDetailNumberReducer(detailNumberRef.current))
            }
        }
        getDataDetailDevice();
    }, [])

    return (
        <div id="detailNumber" className='container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Danh sách cấp số
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
            <div className='detailNumber__bottom'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col-11 h-100'>
                            <div className='content--padding--block h-100'>
                                <h4 className='text--title--small'>Thông tin cấp số</h4>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col-6'>
                                        <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Họ tên:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.khachHang}</div>
                                            </div>
                                            <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Tên dịch vụ:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.dichVu}</div>
                                            </div>
                                            <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Số thứ tự:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.stt}</div>
                                            </div>
                                            <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Thời gian cấp:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.thoiGianCap}</div>
                                            </div>
                                            <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Hạn sử dụng:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.hanSuDung}</div>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                        <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Nguồn cấp:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.nguonCap}</div>
                                            </div>
                                            <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Trạng thái:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.trangThai}</div>
                                            </div>
                                            <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Số điện thoại:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.soDT}</div>
                                            </div>
                                            <div className='row detailNumber__info'>
                                                <div className='col-3 detailNumber__infoTitle'>Địa chỉ Email:</div>
                                                <div className='col-9 detailNumber__infoText'>{detailNumber.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <NavLink to="/number" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <button className='button--addUpdateLink d-flex align-items-center'><img src={require("../../../assets/icon/back-square.png")} alt="edit" /></button>
                                    </div>
                                    <p className='text-center button--addUpdateText'>Quay lại</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
