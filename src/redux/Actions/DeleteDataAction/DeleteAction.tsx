import { deleteDoc, doc } from "firebase/firestore";
import database from "../../../configFirebase";
import { getAllDataAction } from "../GetAllDataAction/GetAllDataAction";
import openNotificationWithIcon from "../../../Notification/Notification";

export const deleteDataAction = (collectionParam: string, idDocument: string, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            const id: string = idDocument as string
            await deleteDoc(doc(database, collectionParam, id));
            await dispatch(getAllDataAction(collectionParam, dispatchAction))
            openNotificationWithIcon("success", "Xóa dữ liệu thành công")
        }
        catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi")
        }
    }
}