import React from 'react'
import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { ChangeChart } from '../../../redux/Reducers/ChangeChartReducer/ChangeChartReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';

export default function SelectChange() {

    const dispatch = useAppDispatch();

    const changeSelect = useAppSelector(state => state.ChangeChartReducer.changeSelect);

    const handleChange = (value: string) => {
        dispatch(ChangeChart(value));
    };

    return (
        <div className='d-flex align-items-center dashboard__chartContentTopRight'>
            <p className='dashboard__chartViewSelect'>Xem theo</p>
            <Select
                className='dashboard__chartSelect'
                suffixIcon={<CaretDownOutlined style={{ color: "#FF7506" }} />}
                defaultValue={changeSelect}
                onChange={handleChange}
                style={{ width: 106 }}
                options={[
                    {
                        value: 'Ngày',
                        label: 'Ngày',
                    },
                    {
                        value: 'Tháng',
                        label: 'Tháng',
                    },
                    {
                        value: 'Năm',
                        label: 'Năm',
                    },
                ]}
            />
        </div>
    )
}
