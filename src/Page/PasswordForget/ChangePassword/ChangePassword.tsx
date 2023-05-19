import { Input } from 'antd';
import React, { useEffect } from 'react'
import "./ChangePassword.scss"
import { EyeTwoTone } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getDataUserReducer, getDetailUserAccountReducer, passAndEnterPasswordInputReducer } from '../../../redux/Reducers/UserReducer/UserReducer';
import { USER_EMAIL_ID } from '../../../util/Const/Const';
import { useNavigate } from 'react-router-dom';
import { getDetailDataAction } from '../../../redux/Actions/GetDetailDataAction/GetDetailDataAction';
import { DIARY, USER } from '../../../redux/Const/Const';
import openNotificationWithIcon from '../../../Notification/Notification';
import { updateUserPasswordAction } from '../../../redux/Actions/UpdateDataAction/UpdateDataAction';
import { addHistoryAction } from '../../../redux/Actions/AddHistoryAction/AddHistoryAction';
import moment from 'moment';
import { getAllListDiaryReducer } from '../../../redux/Reducers/DiaryReducer/DiaryReducer';

const ChangePassword = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const errorPass = useAppSelector(state => state.UserReducer.errorPass);

    const detailUser = useAppSelector(state => state.UserReducer.detailUser)

    useEffect(() => {
        if (!localStorage.getItem(USER_EMAIL_ID)) {
            navigate("/enteremail");
        }

        dispatch(getDetailDataAction(USER, getDetailUserAccountReducer, localStorage.getItem(USER_EMAIL_ID)))
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
        onSubmit: async (value) => {
            if (value.matKhau === value.xacNhanMatKhau) {
                await dispatch(passAndEnterPasswordInputReducer(true))
                await dispatch(updateUserPasswordAction(USER, detailUser.id, value.matKhau, value.xacNhanMatKhau, getDataUserReducer))
                dispatch(addHistoryAction(DIARY, { tenDangNhap: detailUser.tenDangNhap, thaoTacThucHien: "Đã thay đổi mật khẩu", thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss") }, getAllListDiaryReducer)).then(() => {
                    navigate("/login")
                })
                openNotificationWithIcon("success", "Thay đổi mật khẩu thành công")
            } else {
                dispatch(passAndEnterPasswordInputReducer(false))
                openNotificationWithIcon("error", "Mật khẩu và xác nhận mật khẩu phải giống nhau")
            }
        }
    })

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