import React from 'react'

export default function NumberBlock() {
    return (
        <div className='row'>
            <div className='col-3'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624758.png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số thứ tự</p>
                            <p className='dashboard__numberTopText'>đã cấp</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>4.221</p>
                        <div className='d-flex align-items-center justify-content-around dashboard__numberBottomUpDown px-1'>
                            <img className='dashboard__numberBottomUpDownImg' style={{ width: "6px", height: "6px", marginRight: "3px" }} src={require("../../../assets/dashboard/arrowup.png")} alt="arrow" />
                            <p className='dashboard__numberBottomUpDownText'>32.41%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-3'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624759.png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số thứ tự</p>
                            <p className='dashboard__numberTopText'>đã sử dụng</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>3.721</p>
                        <div className='d-flex align-items-center justify-content-around dashboard__numberBottomUpDown px-1'>
                            <img className='dashboard__numberBottomUpDownImg' style={{ width: "6px", height: "6px", marginRight: "3px" }} src={require("../../../assets/dashboard/arrowdown.png")} alt="arrow" />
                            <p className='dashboard__numberBottomUpDownText'>32.41%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-3'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624759 (1).png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số thứ tự</p>
                            <p className='dashboard__numberTopText'>đang chờ</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>468</p>
                        <div className='d-flex align-items-center justify-content-around dashboard__numberBottomUpDown px-1'>
                            <img className='dashboard__numberBottomUpDownImg' style={{ width: "6px", height: "6px", marginRight: "3px" }} src={require("../../../assets/dashboard/arrowup.png")} alt="arrow" />
                            <p className='dashboard__numberBottomUpDownText'>56.41%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-3'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624759 (2).png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số thứ tự</p>
                            <p className='dashboard__numberTopText'>đã bỏ qua</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>32</p>
                        <div className='d-flex align-items-center justify-content-around dashboard__numberBottomUpDown px-1'>
                            <img className='dashboard__numberBottomUpDownImg' style={{ width: "6px", height: "6px", marginRight: "3px" }} src={require("../../../assets/dashboard/arrowup.png")} alt="arrow" />
                            <p className='dashboard__numberBottomUpDownText'>22.41%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
