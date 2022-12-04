import React from 'react'
import './EnterEmail.scss'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { textEmailUserReducer } from '../../../redux/Reducers/UserReducer/UserReducer';
import { USER_EMAIL, USER_EMAIL_ID } from '../../../util/Const/Const';

export default function EnterEmail() {

    const dispatch = useAppDispatch();

    const userEmail = useAppSelector(state => state.UserReducer.userEmail);

    const subMitMail = useAppSelector(state => state.UserReducer.subMitMail);

    let trueMail: boolean = true;

    const textMail = async () => {
        if (subMitMail) {
            if (userEmail.id === "") {
                trueMail = false
            } else {
                trueMail = true
                localStorage.setItem(USER_EMAIL, userEmail.email);
                localStorage.setItem(USER_EMAIL_ID, userEmail.id);
            }
        }
    }
    textMail()

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().trim().required("Email là trường bắt buộc")
        }),
        onSubmit: (value) => {
            dispatch(textEmailUserReducer(value))
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
