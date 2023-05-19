import React, { useEffect } from 'react'
import './EnterEmail.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getDataUserReducer, trueEmailInputReducer } from '../../../redux/Reducers/UserReducer/UserReducer';
import { USER_EMAIL_ID } from '../../../util/Const/Const';
import { getAllDataAction } from '../../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { USER } from '../../../redux/Const/Const';

export default function EnterEmail() {

    const dispatch = useAppDispatch();

    const trueMail = useAppSelector(state => state.UserReducer.trueMail);

    const arrUser = useAppSelector(state => state.UserReducer.arrUser);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllDataAction(USER, getDataUserReducer))
    }, [])

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().trim().required("Email là trường bắt buộc")
        }),
        onSubmit: (value) => {
            let indexMail = arrUser.findIndex(item => item.email === value.email);
            if (indexMail !== -1) {
                localStorage.setItem(USER_EMAIL_ID, arrUser[indexMail].id);
                dispatch(trueEmailInputReducer(true))
                navigate("/changepass")
            } else {
                dispatch(trueEmailInputReducer(false))
            }
        }
    })

    return (
        <form id='enterEmail' onSubmit={formik.handleSubmit}>
            <h4 className='text-center enterEmail__title'>Đặt lại mật khẩu</h4>
            <p className='text-center enterEmail__text'>Vui lòng nhập email để đặt lại mật khẩu của bạn*</p>
            <div>
                {trueMail ? <Input name="email" onChange={formik.handleChange} type="email" /> : <Input style={{ borderColor: "red" }} name="email" onChange={formik.handleChange} type="email" />}
                {formik.touched.email && <p className='text-danger'>{formik.errors.email}</p>}
            </div>
            <div className='d-flex enterEmail__button justify-content-center'>
                <NavLink to="/login" type={'button'} className='button--ouline--orange'>Hủy</NavLink>
                <button className='button--orange' type='submit'>Tiếp tục</button>
            </div>
        </form>
    )
}
