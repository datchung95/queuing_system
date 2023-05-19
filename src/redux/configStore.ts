import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Reducers/UserReducer/UserReducer'
import DeviceReducer from './Reducers/DeviceReducer/DeviceReducer'
import ServiceReducer from './Reducers/ServiceReducer/ServiceReducer'
import PositionManagementReducer from './Reducers/PositionManagementReducer/PositionManagementReducer'
import DiaryReducer from './Reducers/DiaryReducer/DiaryReducer'

export const store = configureStore({
    reducer: {
        UserReducer,
        DeviceReducer,
        ServiceReducer,
        PositionManagementReducer,
        DiaryReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch