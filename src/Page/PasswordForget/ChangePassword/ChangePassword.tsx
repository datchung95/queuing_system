import { Input } from 'antd';
import React, { useEffect } from 'react'
import "./ChangePassword.scss"
import { EyeTwoTone } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { changePasswordReducer, getDataUserReducer } from '../../../redux/Reducers/UserReducer/UserReducer';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import database from '../../../configFirebase';
import { USER_EMAIL, USER_EMAIL_ID } from '../../../util/Const/Const';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const errorPass = useAppSelector(state => state.UserReducer.errorPass);

    const userEmail = useAppSelector(state => state.UserReducer.userEmail);

    const subMitChangePass = useAppSelector(state => state.UserReducer.subMitChangePass);

    useEffect(() => {
        if (!localStorage.getItem(USER_EMAIL)) {
            navigate("/enteremail");
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            matKhau: "",
            xacNhanMatKhau: ""
        },
        validationSchema: Yup.object().shape({
            matKhau: Yup.string().trim().required("Mật khẩu là trường bắt buộc"),
            xacNhanMatKhau: Yup.string().trim().required("Xác nhận mật khẩu là trường bắt buộc")
        }),
        onSubmit: (value) => {
            dispatch(changePasswordReducer(value))
        }
    })

    const changePassFireStore = async () => {
        if (subMitChangePass) {
            if (errorPass === false) {
                let idUser: string = localStorage.getItem(USER_EMAIL_ID) as string;
                await updateDoc(doc(database, "User", idUser), { matKhau: userEmail.matKhau });
                let user: any[] = []
                const querySnapshot = await getDocs(collection(database, "User"));
                querySnapshot.forEach((doc) => {
                    user.push({...doc.data(), id: doc.id, token: doc.id})
                });
                await dispatch(getDataUserReducer(user))
                window.location.reload();
            }
        }
    }
    changePassFireStore()

    return (
        <form id="changePassword" onSubmit={formik.handleSubmit}>
            <h4 className='text-center changePassword__title'>Đặt lại mật khẩu mới</h4>
            <div className='changePassword__fromTop'>
                <label>Mật khẩu</label>
                <Input.Password name="matKhau" onChange={formik.handleChange} iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../assets/icon/eye.png")} alt="eye" />)} type="password" />
                {formik.touched.matKhau && <p className='text-danger'>{formik.errors.matKhau}</p>}
            </div>
            <div className='changePassword__fromBottom'>
                <label>Nhập lại mật khẩu</label>
                <Input.Password name='xacNhanMatKhau' onChange={formik.handleChange} iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../../assets/icon/eye.png")} alt="eye" />)} type="password" />
                {formik.touched.xacNhanMatKhau && <p className='text-danger'>{formik.errors.xacNhanMatKhau}</p>}
            </div>
            {errorPass ? <p className='text-danger'>Mật khẩu và xác nhập mật khẩu phải trùng nhau</p> : ""}
            <div className='text-center'>
                <button className='button--orange' type='submit'>Xác nhận</button>
            </div>
        </form>
    )
}

export default ChangePassword