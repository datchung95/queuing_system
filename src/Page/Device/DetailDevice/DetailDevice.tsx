import React, { useEffect, useRef } from 'react'
import { RightOutlined } from '@ant-design/icons';
import User from '../../../component/User/User';
import { NavLink, useParams } from 'react-router-dom';
import "./DetailDevice.scss"
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { doc, getDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import { getDetailDeviceReducer } from '../../../redux/Reducers/DeviceReducer/DeviceReducer';

export default function DetailDevice() {

    const maThietBiDetail = useParams();

    let deviceDetail: any = useRef({})

    const dispatch = useAppDispatch();

    const detailDevice = useAppSelector(state => state.DeviceReducer.detailDevice);

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

    const renderDichVuSuDung = () => {
        return detailDevice.dichVuSuDung.map((item, index) => {
            if (index === detailDevice.dichVuSuDung.length - 1) {
                return <span className='deviceDetail__infoText' key={index}>{item}.</span>
            } else {
                return <span className='deviceDetail__infoText' key={index}>{item}, </span>
            }
        })
    }

    return (
        <div id="deviceDetail" className='container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thi???t b??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh s??ch thi???t b??? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Chi ti???t thi???t b???
                        </h4>
                        <h4 className='text--titleBottom'>Qu???n l?? thi???t b???</h4>
                    </div>
                    <div className='col-4'>
                        <div className='deviceDetail__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='deviceDetail__bottom'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col-11 h-100'>
                            <div className='content--padding--block h-100'>
                                <h4 className='text--title--small'>Th??ng tin thi???t b???</h4>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='row deviceDetail__info'>
                                                <div className='col-3 deviceDetail__infoTitle'>M?? thi???t b???:</div>
                                                <div className='col-3 deviceDetail__infoText'>{detailDevice.maThietBi}</div>
                                            </div>
                                            <div className='row deviceDetail__info'>
                                                <div className='col-3 deviceDetail__infoTitle'>T??n thi???t b???:</div>
                                                <div className='col-3 deviceDetail__infoText'>{detailDevice.tenThietBi}</div>
                                            </div>
                                            <div className='row deviceDetail__info'>
                                                <div className='col-3 deviceDetail__infoTitle'>?????a ch??? IP:</div>
                                                <div className='col-3 deviceDetail__infoText'>{detailDevice.diaChiIP}</div>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='row deviceDetail__info'>
                                                <div className='col-3 deviceDetail__infoTitle'>Lo???i thi???t b???:</div>
                                                <div className='col-3 deviceDetail__infoText'>{detailDevice.loaiThietBi}</div>
                                            </div>
                                            <div className='row deviceDetail__info'>
                                                <div className='col-3 deviceDetail__infoTitle'>T??n ????ng nh???p:</div>
                                                <div className='col-3 deviceDetail__infoText'>{detailDevice.tenDangNhap}</div>
                                            </div>
                                            <div className='row deviceDetail__info'>
                                                <div className='col-3 deviceDetail__infoTitle'>M???t kh???u:</div>
                                                <div className='col-3 deviceDetail__infoText'>{detailDevice.matKhau}</div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <p className='deviceDetail__infoTitle m-0'>D???ch v??? s??? d???ng:</p>
                                            {renderDichVuSuDung()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <NavLink to={`/device/updatedevice/${detailDevice.id}`} className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <button className='button--addUpdateLink d-flex align-items-center'><img src={require("../../../assets/icon/Edit Square.png")} alt="edit" /></button>
                                    </div>
                                    <p className='text-center button--addUpdateText'>C???p nh???t thi???t b???</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
