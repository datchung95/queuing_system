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

let submit: boolean = false

const initialState = {
    listPosition: listPosition,
    addPosition: position,
    addSubmit: submit,
    detailPosition: position,
    updatePosition: position,
    listSearch: listPosition,
    upPosition: position,
    downPosition: position,
    arrUpDownPosition: listPosition
}

const PositionManagementReducer = createSlice({
    name: "PositionManagementReducer",
    initialState,
    reducers: {
        getListPositionManagementReducer: (state, action) => {
            state.addSubmit = false
            state.listPosition = action.payload
        },
        addPositionManagementReducer: (state, action) => {
            state.addSubmit = true
            state.addPosition = action.payload
        },
        getDetailPositionReducer: (state, action) => {
            state.detailPosition = action.payload
        },
        updatePositionManagementReducer: (state, action) => {
            state.addSubmit = true
            state.updatePosition = action.payload
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
        },
        updateUpDownUserPositionReducer: (state, action) => {
            let indexDetailUp = state.listPosition.findIndex(item => item.tenVaiTro === action.payload.up);
            let indexDetailDown = state.listPosition.findIndex(item => item.tenVaiTro === action.payload.down);
            if (indexDetailUp !== -1) {
                if (action.payload.up !== action.payload.down) {
                    state.listPosition[indexDetailUp].soNguoiDung++;
                    state.upPosition = state.listPosition[indexDetailUp];
                    state.listSearch.push(state.upPosition);
                }
            }
            if (indexDetailDown !== -1) {
                state.listPosition[indexDetailDown].soNguoiDung--;
                state.downPosition = state.listPosition[indexDetailDown];
                state.listSearch.push(state.downPosition);
            }
            state.arrUpDownPosition = state.listSearch;
        }
    }
});

export const {
    getListPositionManagementReducer,
    addPositionManagementReducer,
    getDetailPositionReducer,
    updatePositionManagementReducer,
    searchNamePositionReducer,
    addUpUserPositionReducer,
    updateUpDownUserPositionReducer
} = PositionManagementReducer.actions

export default PositionManagementReducer.reducer