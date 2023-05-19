import React, { useEffect } from 'react'
import "./UserLogin.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import { Input } from 'antd';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { EyeTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import * as Yup from "yup"
import { getDataUserReducer, truePasswordInputReducer } from '../../redux/Reducers/UserReducer/UserReducer';
import { getAllDataAction } from '../../redux/Actions/GetAllDataAction/GetAllDataAction';
import { USER } from '../../redux/Const/Const';
import { TOKEN, USER_LOGIN_ID } from '../../util/Const/Const';
import openNotificationWithIcon from '../../Notification/Notification';

export default function UserLogin() {

    const dispatch = useAppDispatch();

    const arrUser = useAppSelector(state => state.UserReducer.arrUser);

    const truePass = useAppSelector(state => state.UserReducer.truePass);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllDataAction(USER, getDataUserReducer))
    }, [])

    const formik = useFormik({
        initialValues: {
            tenDangNhap: "",
            matKhau: "",
        },
        validationSchema: Yup.object().shape({
            tenDangNhap: Yup.string().trim().required("Tên đăng nhập là trường bắt buộc"),
            matKhau: Yup.string().trim().required("Mật khẩu là trường bắt buộc")
        }),
        onSubmit: (value) => {
            let indexTenDangNhap = arrUser.findIndex(item => item.tenDangNhap === value.tenDangNhap);
            if (indexTenDangNhap !== -1) {
                if (arrUser[indexTenDangNhap].trangThaiHoatDong === "Hoạt động") {
                    if (arrUser[indexTenDangNhap].matKhau === value.matKhau) {
                        let userToken: string = arrUser[indexTenDangNhap].token as string;
                        localStorage.setItem(TOKEN, userToken)
                        localStorage.setItem(USER_LOGIN_ID, arrUser[indexTenDangNhap].id)
                        dispatch(truePasswordInputReducer(true))
                        navigate("/profile")
                    } else {
                        dispatch(truePasswordInputReducer(false))
                    }
                } else {
                    openNotificationWithIcon("error", "Tài khoản đã bị ngưng hoạt động")
                }
            } else {
                dispatch(truePasswordInputReducer(false))
            }
        }
    })

    return (
        <form id="userLogin" onSubmit={formik.handleSubmit}>
            <div className='userLogin__form'>
                <label className='userLogin__formTextLabel'>Tên đăng nhập*</label>
                {truePass ? <Input type="text" name='tenDangNhap' onChange={formik.handleChange} /> : <Input type="text" name='tenDangNhap' style={{ borderColor: "red" }} onChange={formik.handleChange} />}
                {formik.touched.tenDangNhap && <p className='text-danger'>{formik.errors.tenDangNhap}</p>}
            </div>
            <div className='userLogin__form'>
                <label className='userLogin__formTextLabel'>Mật khẩu*</label>
                {truePass ? <Input.Password iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../assets/icon/eye.png")} alt="eye" />)} type="password" name='matKhau' onChange={formik.handleChange} /> : <Input.Password style={{ borderColor: "red" }} iconRender={visible => (visible ? <EyeTwoTone style={{ fontSize: "16px" }} /> : <img style={{ cursor: "pointer", fontSize: "16px" }} src={require("../../assets/icon/eye.png")} alt="eye" />)} type="password" name='matKhau' onChange={formik.handleChange} />}
                {formik.touched.matKhau && <p className='text-danger'>{formik.errors.matKhau}</p>}
            </div>
            <div className='userLogin__formTextNav'>
                {truePass ? <NavLink to="/enteremail" type='button' className="text-danger">Quên mật khẩu ?</NavLink> : <p className='text-danger d-flex align-items-center'><ExclamationCircleOutlined style={{ marginRight: "6px" }} /> Sai mật khẩu hoặc tên đăng nhập</p>}
            </div>
            <div className='text-center userLogin__bottom'>
                <button className='button--orange userLogin__button' type='submit'>Đăng nhập</button>
                {truePass ? "" : <NavLink to="/enteremail" type='button' className="text-danger d-block" style={{ marginTop: "16px" }}>Quên mật khẩu ?</NavLink>}
            </div>
        </form>
    )
}
