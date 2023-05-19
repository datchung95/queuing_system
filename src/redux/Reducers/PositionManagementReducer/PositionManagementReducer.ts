import { createSlice } from '@reduxjs/toolkit'

interface Position {
    tenVaiTro: string;
    soNguoiDung: number;
    moTa: string;
    id: string;
    chucNangXA: boolean;
    chucNangYA: boolean;
    chucNangZA: boolean;
    chucNangXB: boolean;
    chucNangYB: boolean;
    chucNangZB: boolean;
    chucNangXC: boolean;
    chucNangYC: boolean;
    chucNangZC: boolean;
}

let listPosition: Position[] = [
    {
        tenVaiTro: "",
        soNguoiDung: 0,
        moTa: "",
        id: "",
        chucNangXA: false,
        chucNangYA: false,
        chucNangZA: false,
        chucNangXB: false,
        chucNangYB: false,
        chucNangZB: false,
        chucNangXC: false,
        chucNangYC: false,
        chucNangZC: false
    }
]

let position: Position = {
    tenVaiTro: "",
    soNguoiDung: 0,
    moTa: "",
    id: "",
    chucNangXA: false,
    chucNangYA: false,
    chucNangZA: false,
    chucNangXB: false,
    chucNangYB: false,
    chucNangZB: false,
    chucNangXC: false,
    chucNangYC: false,
    chucNangZC: false
}

const initialState = {
    listPosition: listPosition,
    addPosition: position,
    detailPosition: position,
    listSearch: listPosition
}

const PositionManagementReducer = createSlice({
    name: "PositionManagementReducer",
    initialState,
    reducers: {
        getListPositionManagementReducer: (state, action) => {
            state.listPosition = action.payload
        },
        addPositionManagementReducer: (state, action) => {
            state.addPosition = action.payload
        },
        getDetailPositionReducer: (state, action) => {
            state.detailPosition = action.payload
        },
        searchNamePositionReducer: (state, action) => {
            if (action.payload.keyWord !== "") {
                for (let i in state.listPosition) {
                    let index = state.listPosition[i].tenVaiTro.search(action.payload.keyWord)
                    if (index !== -1) {
                        state.listSearch = state.listPosition.filter(item => item.tenVaiTro === state.listPosition[i].tenVaiTro)
                    }
                }
                state.listPosition = state.listSearch
            }
        },
        addUpUserPositionReducer: (state, action) => {
            let index = state.listPosition.findIndex(item => item.tenVaiTro === action.payload);
            if (index !== -1) {
                state.listPosition[index].soNguoiDung++;
                state.detailPosition = state.listPosition[index];
            }
        }
    }
});

export const {
    getListPositionManagementReducer,
    addPositionManagementReducer,
    getDetailPositionReducer,
    searchNamePositionReducer,
    addUpUserPositionReducer
} = PositionManagementReducer.actions

export default PositionManagementReducer.reducer