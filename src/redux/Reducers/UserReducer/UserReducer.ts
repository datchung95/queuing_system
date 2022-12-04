import { createSlice } from '@reduxjs/toolkit'
import openNotificationWithIcon from '../../../Notification/Notification';
import { TOKEN, USER_LOGIN_ID } from '../../../util/Const/Const';
import history from '../../../util/History/history';

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
    thoiGianCap: [
        {
            nguoiNhan: string;
            thoiGianNhanSo: string
        }
    ];
}

let subMit: boolean = false;

let errorPass: boolean = false;

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
        img: "",
        thoiGianCap: [
            {
                nguoiNhan: "",
                thoiGianNhanSo: ""
            }
        ]
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
    img: "",
    thoiGianCap: [
        {
            nguoiNhan: "",
            thoiGianNhanSo: ""
        }
    ]
}

let userEmail: User = {
    id: "",
    email: "",
    matKhau: "",
    soDienThoai: "",
    tenDangNhap: "",
    tenNguoiDung: "",
    token: "",
    vaiTro: "",
    trangThaiHoatDong: "",
    img: "",
    thoiGianCap: [
        {
            nguoiNhan: "",
            thoiGianNhanSo: ""
        }
    ]
}

let userProfile: User = {
    id: "",
    email: "",
    matKhau: "",
    soDienThoai: "",
    tenDangNhap: "",
    tenNguoiDung: "",
    token: "",
    vaiTro: "",
    img: "",
    trangThaiHoatDong: "",
    thoiGianCap: [
        {
            nguoiNhan: "",
            thoiGianNhanSo: ""
        }
    ]
}

if (localStorage.getItem(TOKEN)) {
    userLogin.token = localStorage.getItem(TOKEN)
}

const initialState = {
    arrUser: arrUser,
    arrUserUpdate: arrUser,
    userLogin: userLogin,
    userEmail: userEmail,
    userProfile: userProfile,
    subMit: subMit,
    subMitMail: subMit,
    subMitChangePass: subMit,
    errorPass: errorPass,
    addUser: userProfile,
    detailUser: userProfile,
    updateUser: userProfile
}

const UserReducer = createSlice({
    name: "UserReducer",
    initialState,
    reducers: {
        getDataUserReducer: (state, action) => {
            state.arrUser = action.payload
        },
        textUserReducer: (state, action) => {
            state.subMit = true
            let indexTenDangNhap = state.arrUser.findIndex(item => item.tenDangNhap === action.payload.tenDangNhap);
            if (indexTenDangNhap !== -1) {
                if (state.arrUser[indexTenDangNhap].matKhau === action.payload.matKhau) {
                    state.userLogin = state.arrUser[indexTenDangNhap];
                    let userToken: string = state.userLogin.token as string;
                    localStorage.setItem(TOKEN, userToken)
                    localStorage.setItem(USER_LOGIN_ID, state.userLogin.id)
                    history.push("/profile")
                    window.location.reload()
                }
            }
        },
        textEmailUserReducer: (state, action) => {
            state.subMitMail = true;
            let indexMail = state.arrUser.findIndex(item => item.email === action.payload.email);
            if (indexMail !== -1) {
                state.userEmail = state.arrUser[indexMail]
                history.push("/changepass")
                window.location.reload()
            }
        },
        changePasswordReducer: (state, action) => {
            state.subMitChangePass = true;
            if (action.payload.matKhau === action.payload.xacNhanMatKhau) {
                state.errorPass = false
                state.userEmail.matKhau = action.payload.matKhau;
                history.push("/login");
            } else {
                state.errorPass = true
            }
        },
        getUserProfileReducer: (state, action) => {
            state.userProfile = action.payload
        },
        addUserAccountReducer: (state, action) => {
            delete action.payload.nhapLaiMatKhau
            let index = state.arrUser.findIndex(item => item.email === action.payload.email);
            if (index !== -1) {
                openNotificationWithIcon("error", "Email đã tồn tại");
                state.subMit = false;
            } else {
                state.addUser = action.payload;
                state.subMit = true;
            }
        },
        getDetailUserAccountReducer: (state, action) => {
            state.detailUser = action.payload
        },
        updateUserAccountReducer: (state, action) => {
            delete action.payload.value.nhapLaiMatKhau;
            state.arrUserUpdate = state.arrUser.filter(item => item.id !== action.payload.idUser.id);
            let index = state.arrUserUpdate.findIndex(item => item.email === action.payload.value.email);
            if (index !== -1) {
                openNotificationWithIcon("error", "Email đã tồn tại");
                state.subMit = false;
            } else {
                state.updateUser = action.payload.value;
                state.subMit = true;
            }
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
    textUserReducer,
    textEmailUserReducer,
    changePasswordReducer,
    getUserProfileReducer,
    addUserAccountReducer,
    getDetailUserAccountReducer,
    updateUserAccountReducer,
    searchPositionUserAccountReducer,
    searchNameUserAccountUserReducer
} = UserReducer.actions

export default UserReducer.reducer