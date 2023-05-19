import { createSlice } from '@reduxjs/toolkit'
import { TOKEN } from '../../../util/Const/Const';

interface User {
    id: string;
    email: string;
    matKhau: string;
    soDienThoai: string;
    tenDangNhap: string;
    tenNguoiDung: string;
    token: string | null;
    vaiTro: string;
    trangThaiHoatDong: string;
    img: string;
}

let truePass: boolean = true;

let arrUser: User[] = [
    {
        id: "",
        email: "",
        matKhau: "",
        soDienThoai: "",
        tenDangNhap: "",
        tenNguoiDung: "",
        token: "",
        vaiTro: "",
        trangThaiHoatDong: "",
        img: ""
    }
]

let userLogin: User = {
    id: "",
    email: "",
    matKhau: "",
    soDienThoai: "",
    tenDangNhap: "",
    tenNguoiDung: "",
    token: "",
    vaiTro: "",
    trangThaiHoatDong: "",
    img: ""
}

if (localStorage.getItem(TOKEN)) {
    userLogin.token = localStorage.getItem(TOKEN)
}

const initialState = {
    arrUser: arrUser,
    arrUserUpdate: arrUser,
    userProfile: userLogin,
    errorPass: truePass,
    detailUser: userLogin,
    truePass: truePass,
    trueMail: truePass
}

const UserReducer = createSlice({
    name: "UserReducer",
    initialState,
    reducers: {
        getDataUserReducer: (state, action) => {
            state.arrUser = action.payload
        },
        truePasswordInputReducer: (state, action) => {
            state.truePass = action.payload
        },
        trueEmailInputReducer: (state, action) => {
            state.trueMail = action.payload
        },
        passAndEnterPasswordInputReducer: (state, ation) => {
            state.errorPass = ation.payload
        },
        getUserProfileReducer: (state, action) => {
            state.userProfile = action.payload
        },
        getDetailUserAccountReducer: (state, action) => {
            state.detailUser = action.payload
        },
        searchPositionUserAccountReducer: (state, action) => {
            if (action.payload !== "Tất cả") {
                state.arrUser = state.arrUser.filter(item => item.vaiTro === action.payload);
            }
        },
        searchNameUserAccountUserReducer: (state, action) => {
            if (action.payload.keyWord !== "") {
                for (let i in state.arrUser) {
                    let index = state.arrUser[i].tenNguoiDung.search(action.payload.keyWord)
                    if (index !== -1) {
                        state.arrUserUpdate = state.arrUser.filter(item => item.tenNguoiDung === state.arrUser[i].tenNguoiDung)
                    }
                }
                state.arrUser = state.arrUserUpdate
            }
        }
    }
});

export const {
    getDataUserReducer,
    truePasswordInputReducer,
    trueEmailInputReducer,
    passAndEnterPasswordInputReducer,
    getUserProfileReducer,
    getDetailUserAccountReducer,
    searchPositionUserAccountReducer,
    searchNameUserAccountUserReducer
} = UserReducer.actions

export default UserReducer.reducer