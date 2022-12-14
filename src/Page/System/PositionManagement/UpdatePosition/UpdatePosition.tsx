import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import * as Yup from "yup"
import User from '../../../../component/User/User';
import { RightOutlined } from '@ant-design/icons';
import { Input, List, Checkbox } from 'antd';
import "../PositionManagement.scss"
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import database from '../../../../configFirebase';
import VirtualList from 'rc-virtual-list';
import { getDetailPositionReducer, getListPositionManagementReducer, updatePositionManagementReducer } from '../../../../redux/Reducers/PositionManagementReducer/PositionManagementReducer';

export default function UpdatePosition() {
    const dispatch = useAppDispatch();

    const addSubmit = useAppSelector(state => state.PositionManagementReducer.addSubmit);

    const updatePosition = useAppSelector(state => state.PositionManagementReducer.updatePosition);

    const detailPosition = useAppSelector(state => state.PositionManagementReducer.detailPosition);

    const navigate = useNavigate();

    const idPosition = useParams();

    let position: any[] = [];

    let detailPositionRef: any = useRef({})

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
            tenVaiTro: Yup.string().trim().required("T??n vai tr?? l?? tr?????ng b???t bu???c")
        }),
        onSubmit: (value) => {
            dispatch(updatePositionManagementReducer(value))
        }
    })

    useEffect(() => {
        const getDetailPosition = async () => {
            let id: string = idPosition.id as string
            const docSnap = await getDoc(doc(database, "ListPosition", id));
            if (docSnap.exists()) {
                detailPositionRef.current = { ...docSnap.data(), id: docSnap.id }
                dispatch(getDetailPositionReducer(detailPositionRef.current))
            }
        }
        getDetailPosition();
    }, [])

    const addPositionManagementFirestore = async () => {
        if (addSubmit) {
            let id: string = idPosition.id as string
            await setDoc(doc(database, "ListPosition", id), updatePosition);
            const getPosition = await getDocs(collection(database, "ListPosition"));
            getPosition.forEach((doc) => {
                position.push({ ...doc.data(), id: doc.id })
            });
            dispatch(getListPositionManagementReducer(position))
            navigate("/system/positionmanagement")
        }
    }
    addPositionManagementFirestore()

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
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>C??i ?????t h??? th???ng <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Qu???n l?? vai tr?? <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            C???p nh???t vai tr??
                        </h4>
                        <h4 className='text--titleBottom'>Danh s??ch vai tr??</h4>
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
                        <h4 className='text--title--small'>Th??ng tin vai tr??</h4>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>T??n vai tr??: <span style={{ color: "#FF4747" }}>*</span></p>
                                        <Input value={formik.values.tenVaiTro} name="tenVaiTro" onChange={formik.handleChange} placeholder='Nh???p t??n vai tr??' type="text" />
                                        {formik.touched.tenVaiTro && <p className='text-danger'>{formik.errors.tenVaiTro}</p>}
                                    </div>
                                    <div className='formInput__bottomGroupInput'>
                                        <p className='label-input m-0'>M?? t???: </p>
                                        <Input.TextArea value={formik.values.moTa} maxLength={1000} className='addService__inputDes' name="moTa" onChange={formik.handleChange} placeholder='Nh???p m?? t???' />
                                    </div>
                                    <p className='formInput__bottomTextDanger'><span style={{ color: "#FF4747" }}>*</span> l?? tr?????ng th??ng tin b???t bu???c</p>
                                </div>
                                <div className='col-6 formService__number'>
                                    <p className='label-input m-0'>Ph??n quy???n ch???c n??ng: <span style={{ color: "#FF4747" }}>*</span></p>
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
                                                        <h4 className='formInput__checkboxTitle'>Nh??m ch???c n??ng A</h4>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckboxAll("A", e) }} className='formService__checkboxBox'>T???t c???</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangXA", e) }} checked={formik.values.chucNangXA} className='formService__checkboxBox'>Ch???c n??ng x</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangYA", e) }} checked={formik.values.chucNangYA} className='formService__checkboxBox'>Ch???c n??ng y</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangZA", e) }} checked={formik.values.chucNangZA} className='formService__checkboxBox'>Ch???c n??ng z</Checkbox>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className='formInput__checkboxTitle'>Nh??m ch???c n??ng B</h4>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckboxAll("B", e) }} className='formService__checkboxBox'>T???t c???</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangXB", e) }} checked={formik.values.chucNangXB} className='formService__checkboxBox'>Ch???c n??ng x</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangYB", e) }} checked={formik.values.chucNangYB} className='formService__checkboxBox'>Ch???c n??ng y</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangZB", e) }} checked={formik.values.chucNangZB} className='formService__checkboxBox'>Ch???c n??ng z</Checkbox>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className='formInput__checkboxTitle'>Nh??m ch???c n??ng C</h4>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckboxAll("C", e) }} className='formService__checkboxBox'>T???t c???</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangXC", e) }} checked={formik.values.chucNangXC} className='formService__checkboxBox'>Ch???c n??ng x</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangYC", e) }} checked={formik.values.chucNangYC} className='formService__checkboxBox'>Ch???c n??ng y</Checkbox>
                                                        </div>
                                                        <div className='formService__checkbox'>
                                                            <Checkbox onChange={(e) => { onChangeCheckbox("chucNangZC", e) }} checked={formik.values.chucNangZC} className='formService__checkboxBox'>Ch???c n??ng z</Checkbox>
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
                        <NavLink className="button--orange--light--border" to="/system/positionmanagement" style={{ paddingLeft: "35px", paddingRight: "35px" }}>H???y b???</NavLink>
                        <button className='button--orange formInput__bottomSubmit' type='submit'>Th??m</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
