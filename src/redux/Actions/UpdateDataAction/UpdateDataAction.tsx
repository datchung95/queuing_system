import { doc, setDoc, updateDoc } from "firebase/firestore";
import database from "../../../configFirebase";
import { getAllDataAction } from "../GetAllDataAction/GetAllDataAction";
import openNotificationWithIcon from "../../../Notification/Notification";

export const updateDataAction = (collectionParam: string, idDocument: string, valueDocument: object, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            const id: string = idDocument as string
            await setDoc(doc(database, collectionParam, id), valueDocument);
            dispatch(getAllDataAction(collectionParam, dispatchAction))
            openNotificationWithIcon("success", "Cập nhật thành công")
        }
        catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi")
        }
    }
}

export const updatePositionQuantityUserAction = (collectionParam: string, idDocument: string, valueDocument: number, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            const id: string = idDocument as string
            const value: number = valueDocument as number
            await updateDoc(doc(database, collectionParam, id), {soNguoiDung :value})
            dispatch(getAllDataAction(collectionParam, dispatchAction))
        }
        catch (err) {

        }
    }
}

export const updateUserPasswordAction = (collectionParam: string, idDocument: string, valueDocumentPass: string, valueDocumentEnterPass: string, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            const id: string = idDocument as string
            const valuePass: string = valueDocumentPass as string
            const valueEnterPass: string = valueDocumentEnterPass as string
            await updateDoc(doc(database, collectionParam, id), {matKhau :valuePass, nhapLaiMatKhau: valueEnterPass})
            dispatch(getAllDataAction(collectionParam, dispatchAction))
        }
        catch (err) {

        }
    }
}