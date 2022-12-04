import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react'
import SelectChange from '../SelectChange/SelectChange';

export default function ChartDay() {
    return (
        <div className='dashboard__chartContent'>
            <div className='d-flex justify-content-between align-items-center dashboard__chartContentTop'>
                <div className='dashboard__chartContentTopLeft'>
                    <h3 className='dashboard__chartTitle'>Bảng thống kê theo ngày</h3>
                    <div className='dashboard__chartPicker'>
                        <span>Tháng</span> <DatePicker picker="month" format="MM/YYYY" defaultValue={moment(moment.now())} disabled />
                    </div>
                </div>
                <SelectChange />
            </div>
            <div className='dashboard__chartContentBottom'>
                <img src={require("../../../assets/dashboard/Frame 625120.png")} alt="img" />
                <img style={{ position: "absolute", left: "3.65%", right: "91.78%", top: "81.13%", bottom: "5.67%" }} src={require("../../../assets/dashboard/Group 625172.png")} alt="img" />
                <img style={{ position: "absolute", left: "4.6%", top: "43.54%" }} src={require("../../../assets/dashboard/chartday.png")} alt="img" />
                <img style={{ position: "absolute", left: "490px", top: "515px" }} src={require("../../../assets/dashboard/Selector.png")} alt="img" />
                <img style={{ position: "absolute", left: "455px", top: "483px" }} src={require("../../../assets/dashboard/Frame 625116.png")} alt="img" />
            </div>
        </div>
    )
}
