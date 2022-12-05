import { createSlice } from '@reduxjs/toolkit'
import openNotificationWithIcon from '../../../Notification/Notification';

interface Service {
    maDichVu: string;
    moTa: string;
    tenDichVu: string;
    trangThaiHoatDong: string;
    soTang: string;
    ngayTang: string;
    quyTacCapSo: {
        prefix: boolean,
        surfix: boolean,
        tangTuDong: boolean,
        reset: boolean
    },
    chiTietInSo: [
        {
            stt: string,
            trangThai: string,
            thoiGianCap: string,
            hanSuDung: string
        }
    ]
}

interface PrintNumber {
    stt: string;
    trangThai: string;
    thoiGianCap: string;
    hanSuDung: string;
}

let arrService: Service[] = [
    {
        maDichVu: "",
        moTa: "",
        tenDichVu: "",
        trangThaiHoatDong: "",
        soTang: "",
        ngayTang: "",
        quyTacCapSo: {
            prefix: false,
            surfix: false,
            tangTuDong: false,
            reset: false
        },
        chiTietInSo: [
            {
                stt: "",
                trangThai: "",
                thoiGianCap: "",
                hanSuDung: ""
            }
        ]
    }
]

let service: Service = {
    maDichVu: "",
    moTa: "",
    tenDichVu: "",
    soTang: "",
    trangThaiHoatDong: "",
    ngayTang: "",
    quyTacCapSo: {
        prefix: false,
        surfix: false,
        tangTuDong: false,
        reset: false
    },
    chiTietInSo: [
        {
            stt: "",
            trangThai: "",
            thoiGianCap: "",
            hanSuDung: ""
        }
    ]
}

let detailPrintNumber: PrintNumber[] = [
    {
        stt: "",
        trangThai: "",
        thoiGianCap: "",
        hanSuDung: ""
    }
]

let clickSubmit: boolean = false;

const initialState = {
    arrService: arrService,
    addService: service,
    addSubmit: clickSubmit,
    serviceDetail: service,
    updateSubmit: clickSubmit,
    arrSearchService: arrService,
    detailPrintNumber: detailPrintNumber
}

const ServiceReducer = createSlice({
    name: "ServiceReducer",
    initialState,
    reducers: {
        getAllServiceReducer: (state, action) => {
            state.addSubmit = false
            state.updateSubmit = false
            state.arrService = action.payload
        },
        addServiceReducer: (state, action) => {
            let indexMaDichVu = state.arrService.findIndex(item => item.maDichVu === action.payload.maDichVu);
            if (indexMaDichVu !== -1) {
                openNotificationWithIcon("error", "Mã dịch vụ đã tồn tại");
            } else {
                state.addSubmit = true;
                state.addService = action.payload;
            }
        },
        getServiceDetailReducer: (state, action) => {
            state.serviceDetail = action.payload
            state.detailPrintNumber = state.serviceDetail.chiTietInSo
        },
        updateServiceReducer: (state, action) => {
            state.updateSubmit = true;
            state.serviceDetail = action.payload;
        },
        searchActiveServiceReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.arrSearchService = state.arrService.filter(item => item.trangThaiHoatDong === action.payload);
                state.arrService = state.arrSearchService
            }
        },
        searchKeyWordNameServiceReducer: (state, action) => {
            if (action.payload.keyWord !== "") {
                for (let i in state.arrService) {
                    let index = state.arrService[i].tenDichVu.search(action.payload.keyWord)
                    if (index !== -1) {
                        state.arrSearchService = state.arrService.filter(item => item.tenDichVu === state.arrService[i].tenDichVu)
                    }
                }
                state.arrService = state.arrSearchService
            }
        },
        searchDetailServiceTrangThaiReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.detailPrintNumber = state.detailPrintNumber.filter(item => item.trangThai === action.payload);
            }
        },
        searchDetailServiceTimeReducer: (state, action) => {
            let arr = state.detailPrintNumber.filter(item => item.thoiGianCap.slice(8) === action.payload[0])
            let arrNum = arr.filter(item => item.hanSuDung.slice(8) === action.payload[1]);
            state.detailPrintNumber = arrNum
        },
        searchDetailServiceKeywordReducer: (state, action) => {
            let arr: any[] = []
            if (action.payload.keyWord !== "") {
                for (let i in state.detailPrintNumber) {
                    let index = state.detailPrintNumber[i].stt.search(action.payload.keyWord)
                    if (index !== -1) {
                        arr.push(state.detailPrintNumber[i])
                    }
                }
                state.detailPrintNumber = arr;
            }
        }
    }
});

export const {
    getAllServiceReducer,
    addServiceReducer,
    getServiceDetailReducer,
    updateServiceReducer,
    searchActiveServiceReducer,
    searchKeyWordNameServiceReducer,
    searchDetailServiceTrangThaiReducer,
    searchDetailServiceTimeReducer,
    searchDetailServiceKeywordReducer,
} = ServiceReducer.actions

export default ServiceReducer.reducer