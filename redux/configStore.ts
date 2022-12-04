import { configureStore } from '@reduxjs/toolkit'
import ChangeChartReducer from './Reducers/ChangeChartReducer/ChangeChartReducer'
import UserReducer from './Reducers/UserReducer/UserReducer'
import DeviceReducer from './Reducers/DeviceReducer/DeviceReducer'
import ServiceReducer from './Reducers/ServiceReducer/ServiceReducer'
import NumberReducer from './Reducers/NumberReducer/NumberReducer'
import PositionManagementReducer from './Reducers/PositionManagementReducer/PositionManagementReducer'
import DiaryReducer from './Reducers/DiaryReducer/DiaryReducer'

export const store = configureStore({
    reducer: {
        ChangeChartReducer,
        UserReducer,
        DeviceReducer,
        ServiceReducer,
        NumberReducer,
        PositionManagementReducer,
        DiaryReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch