import { Progress } from 'antd'
import React, { Fragment } from 'react'

export default function Circle() {
    return (
        <Fragment>
            <div className='dashboard__rightProgress'>
                <div className='d-flex'>
                    <Progress width={60} style={{ marginRight: "12px" }} strokeColor="#FF7506" percent={90} type="circle" />
                    <div>
                        <p className='dashboard__rightProgressNumber'>4.221</p>
                        <div>
                            <img src={require("../../../assets/dashboard/monitor.png")} alt="logo" />
                            <span className='dashboard__rightProgressIconText dashboard__rightProgressIconTextOrange'>Thiết bị</span>
                        </div>
                    </div>
                    <div className='dashboard__rightProgressWork d-flex align-items-center'>
                        <div>
                            <div className='d-flex align-items-center'>
                                <img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotorange.png")} alt="dot" />
                                <p className='dashboard__rightProgressWorkText'>Đang hoạt động</p>
                                <p className='dashboard__rightProgressWorkNumberOrange'>3.799</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotgray.png")} alt="dot" />
                                <p className='dashboard__rightProgressWorkText'>Ngưng hoạt động</p>
                                <p className='dashboard__rightProgressWorkNumberOrange'>422</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard__rightProgress'>
                <div className='d-flex'>
                    <Progress width={60} style={{ marginRight: "12px" }} strokeColor="#4277FF" percent={76} type="circle" />
                    <div>
                        <p className='dashboard__rightProgressNumber'>276</p>
                        <div>
                            <img src={require("../../../assets/dashboard/Group 304.png")} alt="logo" />
                            <span className='dashboard__rightProgressIconTextBlue dashboard__rightProgressIconText'>Dich vụ</span>
                        </div>
                    </div>
                    <div className='dashboard__rightProgressWork d-flex align-items-center'>
                        <div>
                            <div className='d-flex align-items-center'>
                                <img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotblue.png")} alt="dot" />
                                <p className='dashboard__rightProgressWorkText'>Đang hoạt động</p>
                                <p className='dashboard__rightProgressWorkNumberBlue'>210</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotgray.png")} alt="dot" />
                                <p className='dashboard__rightProgressWorkText'>Ngưng hoạt động</p>
                                <p className='dashboard__rightProgressWorkNumberBlue'>66</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard__rightProgress'>
                <div className='d-flex'>
                    <Progress width={60} style={{ marginRight: "12px" }} strokeColor="#35C75A" percent={86} type="circle" />
                    <div>
                        <p className='dashboard__rightProgressNumber'>4.221</p>
                        <div>
                            <img src={require("../../../assets/dashboard/fi_layers.png")} alt="logo" />
                            <span className='dashboard__rightProgressIconTextGreen dashboard__rightProgressIconText'>Cấp số</span>
                        </div>
                    </div>
                    <div className='dashboard__rightProgressWork d-flex align-items-center'>
                        <div>
                            <div className='d-flex align-items-center'>
                                <img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotgreen.png")} alt="dot" />
                                <p className='dashboard__rightProgressWorkText'>Đang chờ</p>
                                <p className='dashboard__rightProgressWorkNumberGreen'>3.721</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotgray.png")} alt="dot" />
                                <p className='dashboard__rightProgressWorkText'>Đã sử dụng</p>
                                <p className='dashboard__rightProgressWorkNumberGreen'>486</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <img style={{ marginRight: "4px" }} src={require("../../../assets/dashboard/dotorange.png")} alt="dot" />
                                <p className='dashboard__rightProgressWorkText'>Bỏ qua</p>
                                <p className='dashboard__rightProgressWorkNumberGreen'>32</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
