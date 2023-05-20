import React, { useEffect } from 'react'
import User from '../../../component/User/User'
import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAllDevices, getDetailDeviceReducer } from '../../../redux/Reducers/DeviceReducer/DeviceReducer';
import { useFormik } from 'formik';
import * as Yup from "yup"
import "./updateDevice.scss"
import moment from 'moment'
import { getDetailDataAction } from '../../../redux/Actions/GetDetailDataAction/GetDetailDataAction';
import { DEVICES, DIARY, SERVICES } from '../../../redux/Const/Const';
import { updateDataAction } from '../../../redux/Actions/UpdateDataAction/UpdateDataAction';
import { getAllListDiaryReducer } from '../../../redux/Reducers/DiaryReducer/DiaryReducer';
import { addHistoryAction } from '../../../redux/Actions/AddHistoryAction/AddHistoryAction';
import { getAllServiceReducer } from '../../../redux/Reducers/ServiceReducer/ServiceReducer';
import { getAllDataAction } from '../../../redux/Actions/GetAllDataAction/GetAllDataAction';

export default function UpdateDevice() {

    const maThietBiDetail = useParams();

    const dispatch = useAppDispatch();

    const detailDevice = useAppSelector(state => state.DeviceReducer.detailDevice);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const arrService = useAppSelector(state => state.ServiceReducer.arrService);

    const arrServiceAction = arrService.filter(item => item.trangThaiHoatDong === "Hoạt động")

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDetailDataAction(DEVICES, getDetailDeviceReducer, maThietBiDetail.id))
        dispatch(getAllDataAction(SERVICES, getAllServiceReducer))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maThietBi: detailDevice.maThietBi,
            tenThietBi: detailDevice.tenThietBi,
            loaiThietBi: detailDevice.loaiThietBi,
            hoatDong: detailDevice.hoatDong,
            ketNoi: detailDevice.ketNoi,
            dichVuSuDung: detailDevice.dichVuSuDung,
            tenDangNhap: detailDevice.tenDangNhap,
            matKhau: detailDevice.matKhau,
            email: detailDevice.email
        },
        validationSchema: Yup.object().shape({
            maThietBi: Yup.string().trim().required("Mã thiết bị là trường bắt buộc"),
            tenThietBi: Yup.string().trim().required("Tên thiết bị là trường bắt buộc"),
            loaiThietBi: Yup.string().trim().required("Loại thiết bị là trường bắt buộc"),
            dichVuSuDung: Yup.array().required("Dịch vụ sử dụng là trường bắt buộc"),
            tenDangNhap: Yup.string().trim().required("Tên đăng nhập là trường bắt buộc"),
            matKhau: Yup.string().trim().required("Mật khẩu là trường bắt buộc")
        }),
        onSubmit: async (value) => {
            await dispatch(updateDataAction(DEVICES, detailDevice.id, value, getAllDevices))
            dispatch(addHistoryAction(DIARY, { tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Cập nhật thông tin thiết bị ${detailDevice.maThietBi}`, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss") }, getAllListDiaryReducer)).then(() => {
                navigate("/device")
            })
        }
    })

    const renderSelectSevice = () => {
        return arrServiceAction.map((item, index) => {
            return {
                value: item.tenDichVu,
                label: item.tenDichVu
            }
        })
    }

    const handleChangeTypeDevice = (value: string) => {
        formik.setFieldValue("loaiThietBi", value);
    };

    const handleChangeTag = (value: string[]) => {
        formik.setFieldValue("dichVuSuDung", value);
    };

    const handleChangeHoatDong = (value: string) => {
        formik.setFieldValue("hoatDong", value)
    };

    const handleChangeKetNoi = (value: string) => {
        formik.setFieldValue("ketNoi", value)
    };

    return (
        <div id="updateDevice" className='formInput container-page'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Danh sách thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Cập nhật thiết bị
                        </h4>
                        <h4 className='text--titleBottom'>Quản lý thiết bị</h4>
                    </div>
                    <div className='col-4'>
                        <div>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='formInput__bottom'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='content--padding--block'>
                        <h4 className='text--title--small'>Thông tin thiết bị</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Mã thiết bị: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input disabled={true} name="maThietBi" value={formik.values.maThietBi} onChange={formik.handleChange} placeholder='Nhập mã thiết bị' type="text" />
                                        {formik.touched.maThietBi && <p className='text-danger'>{formik.errors.maThietBi}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tên thiết bị: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenThietBi" value={formik.values.tenThietBi} onChange={formik.handleChange} placeholder='Nhập tên thiết bị' type="text" />
                                        {formik.touched.tenThietBi && <p className='text-danger'>{formik.errors.tenThietBi}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tên đăng nhập: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="tenDangNhap" value={formik.values.tenDangNhap} onChange={formik.handleChange} placeholder='Nhập tài khoản' type="text" />
                                        {formik.touched.tenDangNhap && <p className='text-danger'>{formik.errors.tenDangNhap}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Trạng thái hoạt động: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            value={formik.values.hoatDong}
                                            placeholder="Chọn trạng thái hoạt động"
                                            style={{ width: "100%" }}
                                            onChange={handleChangeHoatDong}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: 'Hoạt động',
                                                    label: 'Hoạt động',
                                                },
                                                {
                                                    value: 'Ngưng hoạt động',
                                                    label: 'Ngưng hoạt động',
                                                },
                                            ]}
                                        />
                                        {formik.touched.hoatDong && <p className='text-danger'>{formik.errors.hoatDong}</p>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Loại thiết bị: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            placeholder="Chọn loại thiết bị"
                                            style={{ width: "100%" }}
                                            value={formik.values.loaiThietBi}
                                            onChange={handleChangeTypeDevice}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: 'Loại 1',
                                                    label: 'Loại 1',
                                                },
                                                {
                                                    value: 'Loại 2',
                                                    label: 'Loại 2',
                                                },
                                            ]}
                                        />
                                        {formik.touched.loaiThietBi && <p className='text-danger'>{formik.errors.loaiThietBi}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Mật khẩu: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input name="matKhau" value={formik.values.matKhau} onChange={formik.handleChange} placeholder='Nhập mật khẩu' type="text" />
                                        {formik.touched.matKhau && <p className='text-danger'>{formik.errors.matKhau}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Trạng thái kết nối: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            value={formik.values.ketNoi}
                                            placeholder="Chọn trạng thái kết nối"
                                            style={{ width: "100%" }}
                                            onChange={handleChangeKetNoi}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: 'Kết nối',
                                                    label: 'Kết nối',
                                                },
                                                {
                                                    value: 'Mất kết nối',
                                                    label: 'Mất kết nối',
                                                },
                                            ]}
                                        />
                                        {formik.touched.ketNoi && <p className='text-danger'>{formik.errors.ketNoi}</p>}
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='formInput__bottomGroupInput updateDevice__selectService'>
                                        <p className='label-input m-0'>Dịch vụ sử dụng: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Nhập dịch vụ sử dụng"
                                            value={formik.values.dichVuSuDung}
                                            onChange={handleChangeTag}
                                            options={renderSelectSevice()}
                                        />
                                        {formik.touched.dichVuSuDung && <p className='text-danger'>{formik.errors.dichVuSuDung}</p>}
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> là trường thông tin bắt buộc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink className="button--orange--light--border" to="/device">Hủy bỏ</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
