import React, { useState } from 'react'
import { Button, Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import moment from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function CalendarDashboard() {

    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    moment.updateLocale('en', {
        weekdaysMin: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    });

    const [preNextMonth, setPreNextMonth] = useState(moment());

    return (
        <div className="site-calendar-customize-header-wrapper dashboard__calendar">
        <Calendar
            fullscreen={false}
            headerRender={({ value }) => {
                const year:number = value.year();
                const month:number = value.month();
                const date:number = value.date();

                const monthName:string = moment.months(month).substr(0, 3);
                return (
                    <table style={{ padding: 8, width: "100%" }}>
                        <thead>
                            <tr>
                                <th>{<Button type="link" onClick={() =>
                                    setPreNextMonth(moment(value.add(-1, 'months')))}>
                                    <LeftOutlined style={{ color: "#ff7506" }} />
                                </Button>}</th>
                                <th></th>
                                <th></th>
                                <th className='text-center'>
                                    <span>{date}</span> 
                                    <span className='dashboard__calendarMonth'>{monthName}</span> 
                                    <span>{year}</span></th>
                                <th></th>
                                <th></th>
                                <th className='text-right'>{<Button type="link" onClick={() => setPreNextMonth(moment(value.add(1, 'months')))}>
                                    <RightOutlined style={{ color: "#ff7506" }} />
                                </Button>}</th>
                            </tr>
                        </thead>
                    </table>
                );
            }}
            onPanelChange={onPanelChange}
        />
    </div>
    )
}
