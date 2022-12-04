import React from 'react'
import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { openModalNumberReducer } from '../../../redux/Reducers/NumberReducer/NumberReducer';
import "./ModalNumber.scss"
import { useNavigate } from 'react-router-dom';

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

    const handleCancel = async () => {
        await dispatch(openModalNumberReducer(false));
        await navigate("/number")
        window.location.reload();
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
