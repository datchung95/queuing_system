import { createSlice } from '@reduxjs/toolkit'

interface Diary {
    tenDangNhap: string;
    thoiGianTacDong: string;
    thaoTacThucHien: string;
    id: string;
}

let arrDiary: Diary[] = [
    {
        tenDangNhap: "",
        thoiGianTacDong: "",
        thaoTacThucHien: "",
        id: ""
    }
]

const initialState = {
    arrDiary: arrDiary,
    arrDiarySearch: arrDiary
}

const DiaryReducer = createSlice({
    name: "DiaryReducer",
    initialState,
    reducers: {
        getAllListDiaryReducer: (state, action) => {
            state.arrDiary = action.payload
        },
        searchNameUserDiaryReducer: (state, action) => {
            if (action.payload.keyWord !== "") {
                for (let i in state.arrDiary) {
                    let index = state.arrDiary[i].tenDangNhap.search(action.payload.keyWord)
                    if (index !== -1) {
                        state.arrDiarySearch = state.arrDiary.filter(item => item.tenDangNhap === state.arrDiary[i].tenDangNhap)
                    }
                }
                state.arrDiary = state.arrDiarySearch
            }
        },
        searchTimeDiaryReducer: (state, action) => {
            let dayStart: number = parseInt(action.payload[0].slice(0, 2));
            let monthStart: number = parseInt(action.payload[0].slice(3, 5));
            let yearStart: number = parseInt(action.payload[0].slice(6, 10));
            let dayEnd: number = parseInt(action.payload[1].slice(0, 2));
            let monthEnd: number = parseInt(action.payload[1].slice(3, 5));
            let yearEnd: number = parseInt(action.payload[1].slice(6, 10));
            state.arrDiarySearch = state.arrDiary.filter(item => parseInt(item.thoiGianTacDong.slice(6, 10)) >= yearStart && parseInt(item.thoiGianTacDong.slice(6, 10)) <= yearEnd)
            state.arrDiary = state.arrDiarySearch;
            state.arrDiarySearch = state.arrDiary.filter(item => parseInt(item.thoiGianTacDong.slice(3, 5)) >= monthStart && parseInt(item.thoiGianTacDong.slice(3, 5)) <= monthEnd);
            state.arrDiary = state.arrDiarySearch;
            state.arrDiarySearch = state.arrDiary.filter(item => parseInt(item.thoiGianTacDong.slice(0, 2)) >= dayStart && parseInt(item.thoiGianTacDong.slice(0, 2)) <= dayEnd);
            state.arrDiary = state.arrDiarySearch
        }
    }
});

export const { 
    getAllListDiaryReducer,
    searchNameUserDiaryReducer,
    searchTimeDiaryReducer
} = DiaryReducer.actions

export default DiaryReducer.reducer