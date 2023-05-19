import React, { Fragment, useEffect } from 'react'
import User from '../../component/User/User'
import { RightOutlined } from '@ant-design/icons';
import { CaretDownOutlined, SearchOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import "./Device.scss"
import { Input, Select, Table } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ColumnsType } from 'antd/lib/table';
import { getAllDevices, searchActiveReducer, searchConectReducer, searchKeyWordName } from '../../redux/Reducers/DeviceReducer/DeviceReducer';
import { useFormik } from 'formik';
import { DEVICES, DIARY } from '../../redux/Const/Const';
import { getAllDataAction } from '../../redux/Actions/GetAllDataAction/GetAllDataAction';
import openNotificationWithIcon from '../../Notification/Notification';
import { deleteDataAction } from '../../redux/Actions/DeleteDataAction/DeleteAction';
import { addHistoryAction } from '../../redux/Actions/AddHistoryAction/AddHistoryAction';
import moment from 'moment';
import { getAllListDiaryReducer } from '../../redux/Reducers/DiaryReducer/DiaryReducer';
import { ID_DEVICE } from '../../util/Const/Const';

interface DataType {
    maThietBi: string;
    tenThietBi: string;
    hoatDong: string;
    ketNoi: string;
    dichVuSuDung: string[];
}

export default function Device() {

    const dispatch = useAppDispatch();

    const arrDevice = useAppSelector(state => state.DeviceReducer.arrDevice);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile)

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllDataAction(DEVICES, getAllDevices))
    }, [])

    const handleChangeActive = async (value: string) => {
        await dispatch(getAllDataAction(DEVICES, getAllDevices))
        dispatch(searchActiveReducer(value));
    }

    const hadleChangeConnect = async (value: string) => {
        await dispatch(getAllDataAction(DEVICES, getAllDevices))
        dispatch(searchConectReducer(value))
    }

    const formik = useFormik({
        initialValues: {
            keyWord: ""
        },
        onSubmit: async (value) => {
            await dispatch(getAllDataAction(DEVICES, getAllDevices))
            dispatch(searchKeyWordName(value))
        }
    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã thiết bị',
            dataIndex: 'maThietBi',
        },
        {
            title: 'Tên thiết bị',
            dataIndex: 'tenThietBi',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'hoatDong',
            render: (text) => {
                if (text === "Hoạt động") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../assets/dashboard/dotgreen.png")} alt="dot" />Hoạt động</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../assets/dashboard/dotred.png")} alt="dot" />Ngưng hoạt động</div>
                }
            }
        },
        {
            title: 'Trạng thái kết nối',
            dataIndex: 'ketNoi',
            render: (text) => {
                if (text === "Kết nối") {
                    return <div><img style={{ marginRight: "4px" }} src={require("../../assets/dashboard/dotgreen.png")} alt="dot" />Kết nối</div>
                } else {
                    return <div><img style={{ marginRight: "4px", width: "4px" }} src={require("../../assets/dashboard/dotred.png")} alt="dot" />Mất kết nối</div>
                }
            }
        },
        {
            title: 'Dịch vụ sử dụng',
            dataIndex: 'dichVuSuDung',
            width: 300,
            render: (text: string[]) => {
                return <div>
                    {text.map((item, index) => {
                        if (item === text[text.length - 1]) {
                            return <Fragment key={index}>
                                <span>{item}.</span>
                            </Fragment>
                        } else {
                            return <Fragment key={index}>
                                <span>{item}, </span>
                            </Fragment>
                        }
                    })}
                </div>
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <NavLink to={`/device/detaildevice/${text.id}`} className='button--blue' onClick={() => {
                    localStorage.setItem(ID_DEVICE, text.id)
                }}>Chi tiết</NavLink>
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <button className='button--blue' onClick={() => {
                    if (text.email === userProfile.email || userProfile.vaiTro === "Admin") {
                        navigate(`/device/updatedevice/${text.id}`)
                        localStorage.setItem(ID_DEVICE, text.id)
                    } else {
                        openNotificationWithIcon("error", "Bạn không có quyền chỉnh sửa")
                    }
                }}>Cập nhật</button>
            }
        },
        {
            title: '',
            dataIndex: '',
            render: (text) => {
                return <button className='button--blue' onClick={() => {
                    if (text.email === userProfile.email || userProfile.vaiTro === "Admin") {
                        dispatch(deleteDataAction(DEVICES, text.id, getAllDevices))
                        dispatch(addHistoryAction(DIARY, { tenDangNhap: userProfile.tenDangNhap, thaoTacThucHien: `Xóa thiết bị ${text.maThietBi}`, thoiGianTacDong: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss") }, getAllListDiaryReducer))
                    } else {
                        openNotificationWithIcon("error", "Bạn không có quyền xóa")
                    }
                }}>Xóa</button>
            }
        }
    ];

    const itemRender = (_: any, type: any, originalElement: any) => {
        if (type === "prev") {
            return <CaretLeftOutlined />;
        }
        if (type === "next") {
            return <CaretRightOutlined />;
        }
        return originalElement;
    };

    return (
        <div id="device" className='container-page'>
            <div className='container-fluid device__header'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title d-flex'>
                            <span className='d-flex align-items-center' style={{ color: "#7E7D88" }}>Thiết bị <RightOutlined style={{ fontSize: "8px", margin: "0 15px", color: "#7E7D88" }} /></span>
                            Danh sách thiết bị
                        </h4>
                        <h4 className='text--titleBottom'>Danh sách thiết bị</h4>
                    </div>
                    <div className='col-4'>
                        <div className='device__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='device__bottom'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-11'>
                            <div className='device__select d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <div style={{ marginRight: "24px" }}>
                                        <p className='label-input m-0'>Trạng thái hoạt động</p>
                                        <Select
                                            className='device__input'
                                            defaultValue="Tất cả"
                                            style={{ width: 300 }}
                                            onChange={handleChangeActive}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: "Tất cả",
                                                    label: "Tất cả",
                                                },
                                                {
                                                    value: "Hoạt động",
                                                    label: "Hoạt động",
                                                },
                                                {
                                                    value: "Ngưng hoạt động",
                                                    label: "Ngưng hoạt động",
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <p className='label-input m-0'>Trạng thái kết nối</p>
                                        <Select
                                            className='device__input'
                                            defaultValue="Tất cả"
                                            style={{ width: 300 }}
                                            onChange={hadleChangeConnect}
                                            suffixIcon={<CaretDownOutlined style={{ color: "#FF7506", fontSize: "24px" }} />}
                                            options={[
                                                {
                                                    value: "Tất cả",
                                                    label: "Tất cả",
                                                },
                                                {
                                                    value: "Kết nối",
                                                    label: "Kết nối",
                                                },
                                                {
                                                    value: "Mất kết nối",
                                                    label: "Mất kết nối",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className='label-input m-0'>Tìm tên thiết bị</p>
                                    <form style={{ position: "relative" }} onSubmit={formik.handleSubmit}>
                                        <Input
                                            className='device__input'
                                            style={{ width: 300 }}
                                            placeholder="Nhập từ khóa"
                                            name="keyWord"
                                            onChange={formik.handleChange}
                                        />
                                        <button type='submit' style={{ border: "none", backgroundColor: "transparent", position: "absolute", top: "25%", right: "3%" }}><SearchOutlined style={{ color: "#FF7506", fontSize: "20px" }} /></button>
                                    </form>
                                </div>
                            </div>
                            <div className='device__table'>
                                <Table
                                    className='device__tableLayout'
                                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-orange'} columns={columns}
                                    dataSource={arrDevice}
                                    rowKey="id"
                                    pagination={{
                                        itemRender: itemRender
                                    }} />
                            </div>
                        </div>
                        <div className='col-1 button--addUpdate p-0'>
                            <NavLink to="/device/adddevice" className='d-flex justify-content-center align-items-center h-100'>
                                <div className='button--addUpdateContent'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={require("../../assets/icon/add-square.png")} alt="add" />
                                    </div>
                                    <p className='text-center button--addUpdateText'>Thêm thiết bị</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
