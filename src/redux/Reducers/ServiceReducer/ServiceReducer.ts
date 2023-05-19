import { createSlice } from '@reduxjs/toolkit'

interface Service {
    id: string;
    maDichVu: string;
    moTa: string;
    tenDichVu: string;
    trangThaiHoatDong: string;
    email: string;
}

let arrService: Service[] = [
    {
        maDichVu: "",
        id: "",
        moTa: "",
        tenDichVu: "",
        trangThaiHoatDong: "",
        email: ""
    }
]

let service: Service = {
    id: "",
    maDichVu: "",
    moTa: "",
    tenDichVu: "",
    trangThaiHoatDong: "",
    email: ""
}

const initialState = {
    arrService: arrService,
    addService: service,
    serviceDetail: service,
    arrSearchService: arrService
}

const ServiceReducer = createSlice({
    name: "ServiceReducer",
    initialState,
    reducers: {
        getAllServiceReducer: (state, action) => {
            state.arrService = action.payload
        },
        addServiceReducer: (state, action) => {
            state.addService = action.payload;
        },
        getServiceDetailReducer: (state, action) => {
            state.serviceDetail = action.payload
        },
        updateServiceReducer: (state, action) => {
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
        }
    }
});

export const {
    getAllServiceReducer,
    addServiceReducer,
    getServiceDetailReducer,
    updateServiceReducer,
    searchActiveServiceReducer,
    searchKeyWordNameServiceReducer
} = ServiceReducer.actions

export default ServiceReducer.reducer