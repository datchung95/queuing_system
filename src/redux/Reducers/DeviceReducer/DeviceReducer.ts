import { createSlice } from '@reduxjs/toolkit'

interface Devices {
    dichVuSuDung: string[];
    hoatDong: string;
    ketNoi: string;
    maThietBi: string;
    tenThietBi: string;
    loaiThietBi: string;
    tenDangNhap: string;
    matKhau: string;
    id: string;
    email: string;
}

let arrDevice: Devices[] = [
    {
        dichVuSuDung: [],
        hoatDong: "",
        ketNoi: "",
        maThietBi: "",
        tenThietBi: "",
        loaiThietBi: "",
        tenDangNhap: "",
        matKhau: "",
        id: "",
        email: ""
    }
]

let detailDevice: Devices = {
    dichVuSuDung: [],
    hoatDong: "",
    ketNoi: "",
    maThietBi: "",
    tenThietBi: "",
    loaiThietBi: "",
    tenDangNhap: "",
    matKhau: "",
    id: "",
    email: ""
}

const initialState = {
    arrDevice: arrDevice,
    detailDevice: detailDevice,
    newDevice: detailDevice,
    arrDeviceSearch: arrDevice,
    deviceSearch: detailDevice
}

const DeviceReducer = createSlice({
    name: "DeviceReducer",
    initialState,
    reducers: {
        getAllDevices: (state, action) => {
            state.arrDevice = action.payload
        },
        getDetailDeviceReducer: (state, action) => {
            state.detailDevice = action.payload
        },
        updateDetailDeviceReducer: (state, action) => {
            state.detailDevice = action.payload
        },
        addDeviceReducer: (state, action) => {
            state.newDevice = action.payload
        },
        searchActiveReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.arrDeviceSearch = state.arrDevice.filter(item => item.hoatDong === action.payload);
                state.arrDevice = state.arrDeviceSearch
            }
        },
        searchConectReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.arrDeviceSearch = state.arrDevice.filter(item => item.ketNoi === action.payload);
                state.arrDevice = state.arrDeviceSearch
            }
        },
        searchKeyWordName: (state, action) => {
            if (action.payload.keyWord !== "") {
                for (let i in state.arrDevice) {
                    let index = state.arrDevice[i].tenThietBi.search(action.payload.keyWord)
                    if (index !== -1) {
                        state.arrDeviceSearch = state.arrDevice.filter(item => item.tenThietBi === state.arrDevice[i].tenThietBi)
                    }
                }
                state.arrDevice = state.arrDeviceSearch
            }
        }
    }
});

export const { 
    getAllDevices, 
    getDetailDeviceReducer,
    updateDetailDeviceReducer,
    addDeviceReducer,
    searchActiveReducer,
    searchConectReducer,
    searchKeyWordName
} = DeviceReducer.actions

export default DeviceReducer.reducer