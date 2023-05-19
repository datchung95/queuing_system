import { Input } from 'antd'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import User from '../../component/User/User'
import database from '../../configFirebase'
import { useAppSelector } from '../../redux/hook'
import { USER_LOGIN_ID } from '../../util/Const/Const'
import { storage } from '../../configFirebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import './Profile.scss'
import openNotificationWithIcon from '../../Notification/Notification'

export default function Profile() {

    const [openButton, setOpenButton] = useState("none");

    const [imgUpload, setImgUpload] = useState<any>(null);

    const userProfile = useAppSelector(state => state.UserReducer.userProfile);

    const handleChangeFile = async (e: any) => {
        await setImgUpload(e.target.files[0]);
        setOpenButton("inline");
    }

    const upLoadImgFirebase = () => {
        if (imgUpload === null) return;
        const imageRef = ref(storage, `image/${imgUpload.name}`)
        setOpenButton("none");
        uploadBytes(imageRef, imgUpload).then((snapshot) => {
            openNotificationWithIcon("success", "Thay đổi ảnh thành công");
            getDownloadURL(ref(storage, `image/${imgUpload.name}`)).then( async (url) => {
                let userLoginID: string = localStorage.getItem(USER_LOGIN_ID) as string
                await updateDoc(doc(database, "User", userLoginID), {img: url})
                window.location.reload();
            })
        })
    }

    return (
        <div id='profile' className='container-page'>
            <div className='container-fluid profile__header'>
                <div className='row'>
                    <div className='col-9'>
                        <h4 className='text--titleDashboard profile__title padding-title'>Thông tin cá nhân</h4>
                    </div>
                    <div className='col-3'>
                        <User />
                    </div>
                </div>
            </div>
            <div className='profile__content position-relative container-fluid'>
                <div className='profile__contentRow'>
                    <div className='row'>
                        <div className='profile__contentLeft col-3 d-flex justify-content-center'>
                            <div>
                                <div>
                                    <div>
                                        <img className='profile__contentLeftAvatar' src={userProfile.img} alt="camera" />
                                    </div>
                                    <div>
                                        <label style={{ cursor: 'pointer' }}>
                                            <img className='profile__contentLeftIcon' src={require("../../assets/icon/Camera.png")} alt="camera" />
                                            <input accept="image/png, image/jpeg, image/jpg" onChange={handleChangeFile} type="file" style={{ visibility: "hidden" }} />
                                        </label>
                                        <div className='text-center'>
                                            <button onClick={upLoadImgFirebase} className='btn btn-danger' style={{ display: `${openButton}` }}>Đổi ảnh</button>
                                        </div>
                                    </div>
                                </div>
                                <p className='profile__contentLeftName'>{userProfile.tenNguoiDung}</p>
                            </div>
                        </div>
                        <div className='profile__contentRight col-9'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div style={{ marginBottom: "24px" }}>
                                        <label>Tên người dùng</label>
                                        <Input value={userProfile.tenNguoiDung} disabled={true} />
                                    </div>
                                    <div style={{ marginBottom: "24px" }}>
                                        <label>Số điện thoại</label>
                                        <Input value={userProfile.soDienThoai} disabled={true} />
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <Input value={userProfile.email} disabled={true} />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div style={{ marginBottom: "24px" }}>
                                        <label>Tên đăng nhập</label>
                                        <Input value={userProfile.tenDangNhap} disabled={true} />
                                    </div>
                                    <div style={{ marginBottom: "24px" }}>
                                        <label>Mật khẩu</label>
                                        <Input value={userProfile.matKhau} disabled={true} />
                                    </div>
                                    <div>
                                        <label>Vai trò</label>
                                        <Input value={userProfile.vaiTro} disabled={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
