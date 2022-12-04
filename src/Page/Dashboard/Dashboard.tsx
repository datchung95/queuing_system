import React, { useState } from 'react'
import User from '../../component/User/User'
import "./Dashboard.scss"
import NumberBlock from './NumberBlock/NumberBlock';
import Circle from './Circle/Circle';
import CalendarDashboard from './Calendar/CalendarDashboard';
import ChartDay from './Chart/ChartDay';
import { useAppSelector } from '../../redux/hook';
import ChartMonth from './Chart/ChartMonth';
import ChartYear from './Chart/ChartYear';

export default function Dashboard() {

    const  changeSelect = useAppSelector(state => state.ChangeChartReducer.changeSelect);

    const renderChart = () => {   
        if (changeSelect === "Ngày") {
            return <ChartDay />
        } else if (changeSelect === "Tháng") {
            return <ChartMonth />
        } else {
            return <ChartYear />
        }
    }

    return (
        <div id="dashboard" className='container-page'>
            <div className='container-fluid dashboard__header'>
                <div className='row'>
                    <div className='col-8'>
                        <h4 className='text--titleDashboard padding-title'>Dashboard</h4>
                        <h4 className='text--titleBottom'>Biểu đồ cấp số</h4>
                        <NumberBlock />
                        <div className='dashboard__chart'>
                            {renderChart()}
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='dashboard__right'>
                            <div className='d-flex justify-content-end'>
                                <User />
                            </div>
                            <div className='dashboard__rightContent'>
                                <h4 className='text--titleBottom'>Tổng quan</h4>
                                <Circle />
                                <CalendarDashboard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
