import React from 'react'
import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAllNumberReducer, openModalNumberReducer } from '../../../redux/Reducers/NumberReducer/NumberReducer';
import "./ModalNumber.scss"
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import database from '../../../configFirebase';
import { getAllServiceReducer } from '../../../redux/Reducers/ServiceReducer/ServiceReducer';
import { getUserProfileReducer } from '../../../redux/Reducers/UserReducer/UserReducer';
import { USER_LOGIN_ID } from '../../../util/Const/Const';

interface numberValue {
    stt: string;
    thoiGianCap: string;
    hanSuDung: string;
    dichVu: string;
}

export default function ModalNumber(props: numberValue) {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const openModal = useAppSelector(state => state.NumberReducer.openModal);

    let number: any[] = [];

    let service: any[] = [];

    let userLogin = {};

    const handleCancel = async () => {
        await dispatch(openModalNumberReducer(false));
        const getNumber = await getDocs(collection(database, "Numbers"));
        getNumber.forEach((doc) => {
            number.push({ ...doc.data(), id: doc.id })
        });
        dispatch(getAllNumberReducer(number))

        const getService = await getDocs(collection(database, "Services"));
        getService.forEach((doc) => {
            service.push(doc.data())
        });
        dispatch(getAllServiceReducer(service))

        let userLoginID: string = localStorage.getItem(USER_LOGIN_ID) as string
        const docSnap = await getDoc(doc(database, "User", userLoginID));
        if (docSnap.exists()) {
            userLogin = docSnap.data()
            dispatch(getUserProfileReducer(userLogin))
        }

        await navigate("/number")
        window.location.reload()
    };

    return (
        <Modal className='modalNumber' open={openModal} onCancel={handleCancel}>
            <div className='d-flex justify-content-center align-items-center modalNumber__top'>
                <div>
                    <h4 className='modalNumber__topTitleTitle'>Số thứ tự được cấp</h4>
                    <p className='modalNumber__topSTT'>{props.stt}</p>
                    <p className='modalNumber__topService'>DV: {props.dichVu} <span className='modalNumber__topText'>(tại quầy số 1)</span></p>
                </div>
            </div>
            <div className='modalNumber__bottom d-flex justify-content-center align-items-center'>
                <div>
                    <p className='modalNumber__bottomTime'>Thời gian cấp: <span>{props.thoiGianCap.slice(0, 5)} </span><span>{props.thoiGianCap.slice(8)}</span></p>
                    <p className='modalNumber__bottomTime mb-0'>Hạn sử dụng: <span>{props.hanSuDung.slice(0, 5)} </span><span>{props.hanSuDung.slice(8)}</span></p>
                </div>
            </div>
        </Modal>
    )
}
