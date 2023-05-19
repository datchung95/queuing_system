import { addDoc, collection } from "firebase/firestore";
import database from "../../../configFirebase";
import openNotificationWithIcon from "../../../Notification/Notification";
import { getAllDataAction } from "../GetAllDataAction/GetAllDataAction";

export const addDataAction = (collectionParam: string, valueDocument: object, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            await addDoc(collection(database, collectionParam), valueDocument);
            await dispatch(getAllDataAction(collectionParam, dispatchAction))
            openNotificationWithIcon("success", "Thêm gói thành công")
        }
        catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi")
        }
    }
}