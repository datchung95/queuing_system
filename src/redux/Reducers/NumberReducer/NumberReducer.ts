import { createSlice } from '@reduxjs/toolkit'

interface Number {
    id: string;
    stt: string;
    dichVu: string;
    maDichVu: string;
    khachHang: string;
    trangThai: string;
    nguonCap: string;
    thoiGianCap: string;
    hanSuDung: string;
    soDT: string;
    email: string;
    idUser: string;
}

let arrNumber: Number[] = [
    {
        id: "",
        stt: "",
        dichVu: "",
        maDichVu: "",
        khachHang: "",
        trangThai: "",
        nguonCap: "",
        thoiGianCap: "",
        hanSuDung: "",
        soDT: "",
        email: "",
        idUser: ""
    }
]

let number: Number = {
    id: "",
    stt: "",
    dichVu: "",
    maDichVu: "",
    khachHang: "",
    trangThai: "",
    nguonCap: "",
    thoiGianCap: "",
    hanSuDung: "",
    soDT: "",
    email: "",
    idUser: ""
}
let openModal: boolean = false;

const initialState = {
    arrNumber: arrNumber,
    openModal: openModal,
    detailNumber: number,
    arrSearchNumber: arrNumber
}

const NumberReducer = createSlice({
    name: "NumberReducer",
    initialState,
    reducers: {
        getAllNumberReducer: (state, action) => {
            state.arrNumber = action.payload
        },
        openModalNumberReducer: (state, action) => {
            state.openModal = action.payload
        },
        getDetailNumberReducer: (state, action) => {
            state.detailNumber = action.payload
        },
        searchActiveNumberReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.arrSearchNumber = state.arrNumber.filter(item => item.trangThai === action.payload);
                state.arrNumber = state.arrSearchNumber
            }
        },
        searchNameServicerNumberReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.arrSearchNumber = state.arrNumber.filter(item => item.dichVu === action.payload);
                state.arrNumber = state.arrSearchNumber
            }
        },
        searchPowerNumberReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.arrSearchNumber = state.arrNumber.filter(item => item.nguonCap === action.payload);
                state.arrNumber = state.arrSearchNumber
            }
        },
        searchKeyWordNumberReducer: (state, action) => {
            if (action.payload.keyWord !== "") {
                for (let i in state.arrNumber) {
                    let index = state.arrNumber[i].khachHang.search(action.payload.keyWord)
                    if (index !== -1) {
                        state.arrSearchNumber.push(arrNumber[i])
                    }
                }
                state.arrNumber = state.arrSearchNumber
            }
        },
        searchTimeNumberReducer: (state, action) => {
            state.arrSearchNumber = state.arrNumber.filter(item => item.thoiGianCap.slice(8) === action.payload[0])
            let arrNum = state.arrSearchNumber.filter(item => item.hanSuDung.slice(8) === action.payload[1]);
            state.arrNumber = arrNum
        }
    }
});

export const {
    getAllNumberReducer,
    openModalNumberReducer,
    getDetailNumberReducer,
    searchActiveNumberReducer,
    searchKeyWordNumberReducer,
    searchNameServicerNumberReducer,
    searchPowerNumberReducer,
    searchTimeNumberReducer
} = NumberReducer.actions

export default NumberReducer.reducer