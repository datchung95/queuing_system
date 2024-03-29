import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import * as Yup from "yup"
import User from '../../../../component/User/User';
import { RightOutlined } from '@ant-design/icons';
import { Input, List, Checkbox } from 'antd';
import "../PositionManagement.scss"
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import VirtualList from 'rc-virtual-list';
import { getDetailPositionReducer, getListPositionManagementReducer } from '../../../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';
import { getDetailDataAction } from '../../../../redux/Actions/GetDetailDataAction/GetDetailDataAction';
import { DIARY, LIST_POSITION } from '../../../../redux/Const/Const';
import { updateDataAction } from '../../../../redux/Actions/UpdateDataAction/UpdateDataAction';
import { addHistoryAction } from '../../../../redux/Actions/AddHistoryAction/AddHistoryAction';
import moment from 'moment';
import { getAllListDiaryReducer } from '../../../../redux/Reducers/DiaryReducer/DiaryReducer';

export default function UpdatePosition() {
    const dispatch = useAppDispatch();

    const detailPosition = useAppSelector(state => state.PositionManagementReducer.detailPosition);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const navigate = useNavigate();

    const idPosition = useParams();

    useEffect(() => {
       dispatch(getDetailDataAction(LIST_POSITION, getDetailPositionReducer, idPosition.id))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenVaiTro: detailPosition.tenVaiTro,
            moTa: detailPosition.moTa,
            soNguoiDung: detailPosition.soNguoiDung,
            chucNangXA: detailPosition.chucNangXA,
            chucNangYA: detailPosition.chucNangYA,
            chucNangZA: detailPosition.chucNangZA,
            chucNangXB: detailPosition.chucNangXB,
            chucNangYB: detailPosition.chucNangYB,
            chucNangZB: detailPosition.chucNangZB,
            chucNangXC: detailPosition.chucNangXC,
            chucNangYC: detailPosition.chucNangYC,
            chucNangZC: detailPosition.chucNangZC
        },
        validationSchema: Yup.object().shape({
            tenVaiTro: Yup.string().trim().required("Tên vai trò là trường bắt buộc")
        }),
        onSubmit: async (value) => {
            await dispatch(updateDataAction(LIST_POSITION, detailPosition.id, value, getListPositionManagementReducer))
            dispatch(addHistoryAction(DIARY, { tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Cập nhật thông tin vai trò ${detailPosition.tenVaiTro}`, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss") }, getAllListDiaryReducer)).then(() => {
                navigate("/system/positionmanagement")
            })
        }
    })

    const onChangeCheckbox = (name: string, e: CheckboxChangeEvent) => {
        formik.setFieldValue(name, e.target.checked)
    };

    const onChangeCheckboxAll = (name: string, e: CheckboxChangeEvent) => {
        if (name === "A") { 
            formik.setFieldValue("chucNangXA", e.target.checked)
            formik.setFieldValue("chucNangYA", e.target.checked)
            formik.setFieldValue("chucNangZA", e.target.checked)
        } else if (name === "B") {
            formik.setFieldValue("chucNangXB", e.target.checked)
            formik.setFieldValue("chucNangYB", e.target.checked)
            formik.setFieldValue("chucNangZB", e.target.checked)
        } else if (name === "C") {
            formik.setFieldValue("chucNangXC", e.target.checked)
            formik.setFieldValue("chucNangYC", e.target.checked)
            formik.setFieldValue("chucNangZC", e.target.checked)
        }
    }

    return (
        <div className='container-page formService formInput'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Cài đặt hệ thống <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Quản lý vai trò <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Cập nhật vai trò
                        </h4>
                        <h4 className='text--titleBottom'>Danh sách vai trò</h4>
                    </div>
                    <div className='col-4'>
                        <div className='addService__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='formInput__bottom'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='content--padding--block' style={{ height: 534 }}>
                        <h4 className='text--title--small'>Thông tin vai trò</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Tên vai trò: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input value={formik.values.tenVaiTro} name="tenVaiTro" onChange={formik.handleChange} placeholder='Nhập tên vai trò' type="text" />
                                        {formik.touched.tenVaiTro && <p className='text-danger'>{formik.errors.tenVaiTro}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>Mô tả: </p>
                                        <Input.TextArea value={formik.values.moTa} maxLength={1000} className='addService__inputDes' name="moTa" onChange={formik.handleChange} placeholder='Nhập mô tả' />
                                    </div>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> là trường thông tin bắt buộc</p>
                                </div>
                                <div className='col-6 formService__number'>
                                    <p className='label-input m-0'>Phân quyền chức năng: <span style={{ color: "#FF4747" }}>*</span></p>
                                    <List className='formInput__list'>
                                        <VirtualList
                                            data={[3]}
                                            height={400}
                                            itemHeight={2}
                                            itemKey="key"
                                        >
                                            {(item, index) => (
                                                <List.Item key={index} className="d-flex flex-column align-items-start">
                                                    <div>
                                                        <h4 className='formInput__checkboxTitle'>Nhóm chức năng A</h4>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckboxAll("A", e) }} className='formService__checkboxBox'>Tất cả</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangXA", e) }} checked={formik.values.chucNangXA} className='formService__checkboxBox'>Chức năng x</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangYA", e) }} checked={formik.values.chucNangYA} className='formService__checkboxBox'>Chức năng y</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangZA", e) }} checked={formik.values.chucNangZA} className='formService__checkboxBox'>Chức năng z</Checkbox>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className='formInput__checkboxTitle'>Nhóm chức năng B</h4>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckboxAll("B", e) }} className='formService__checkboxBox'>Tất cả</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangXB", e) }} checked={formik.values.chucNangXB} className='formService__checkboxBox'>Chức năng x</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangYB", e) }} checked={formik.values.chucNangYB} className='formService__checkboxBox'>Chức năng y</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangZB", e) }} checked={formik.values.chucNangZB} className='formService__checkboxBox'>Chức năng z</Checkbox>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className='formInput__checkboxTitle'>Nhóm chức năng C</h4>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckboxAll("C", e) }} className='formService__checkboxBox'>Tất cả</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangXC", e) }} checked={formik.values.chucNangXC} className='formService__checkboxBox'>Chức năng x</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangYC", e) }} checked={formik.values.chucNangYC} className='formService__checkboxBox'>Chức năng y</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangZC", e) }} checked={formik.values.chucNangZC} className='formService__checkboxBox'>Chức năng z</Checkbox>
                                                        </div>
                                                    </div>
                                                </List.Item>
                                            )}
                                        </VirtualList>
                                    </List>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center formInput__bottomButton'>
                        <NavLink className="button--orange--light--border" to="/system/positionmanagement" style={{ paddingLeft: "35px", paddingRight: "35px" }}>Hủy bỏ</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
