import React from 'react'
import User from '../../component/User/User'

export default function Dashboard() {
    return (
        <div id="dashboard" className='container-page'>
            <div className='d-flex justify-content-between align-items-center dashboard__header container-page-header'>
                <h4 className='text--titleDashboard'>Dashboard</h4>
                <User />
            </div>
            <div></div>
        </div>
    )
}
