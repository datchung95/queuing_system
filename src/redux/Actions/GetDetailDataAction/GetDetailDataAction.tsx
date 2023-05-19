import { doc, getDoc } from "firebase/firestore";
import database from "../../../configFirebase";
import openNotificationWithIcon from "../../../Notification/Notification";

export const getDetailDataAction = (collectionParam: string, dispatchAction: any, idDocument: any) => {
    return async (dispatch: any) => {
        try {
            const id: string = idDocument as string
            let detailData = {}
            const docSnap = await getDoc(doc(database, collectionParam, id));
            if (docSnap.exists()) {
                detailData = { ...docSnap.data(), id: docSnap.id }
            }
            dispatch(dispatchAction(detailData))
        } catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi");
        }
    }
}