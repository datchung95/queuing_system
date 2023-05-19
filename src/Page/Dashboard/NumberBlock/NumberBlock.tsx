import React from 'react'

interface porpNumber {
    quantityDevice: number,
    quantityService: number,
    quantityDeviceAction: number,
    quantitySeviceAction: number
}

export default function NumberBlock(props: porpNumber) {
    return (
        <div className='row'>
            <div className='col-12'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624758.png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số thiết bị</p>
                            <p className='dashboard__numberBottomText'>đã cấp</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>{props.quantityDevice}</p>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624759.png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số dịch vụ</p>
                            <p className='dashboard__numberBottomText'>đã cấp</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>{props.quantityService}</p>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624759 (1).png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số thiết bị</p>
                            <p className='dashboard__numberBottomText'>đang hoạt động</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>{props.quantityDeviceAction}</p>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className='dashboard__number'>
                    <div className='d-flex justify-content-start dashboard__numberTop'>
                        <img src={require("../../../assets/dashboard/Frame 624759 (2).png")} alt="icondashboard" />
                        <div>
                            <p className='dashboard__numberTopText'>Số dịch vụ</p>
                            <p className='dashboard__numberBottomText'>đang hoạt động</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center dashboard__numberBottom'>
                        <p className='dashboard__numberBottomRes'>{props.quantitySeviceAction}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
