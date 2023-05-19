import { collection, getDocs } from "firebase/firestore";
import database from "../../../configFirebase";
import openNotificationWithIcon from "../../../Notification/Notification";


export const getAllDataAction = (collectionParam: string, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            const data: any[] = [];
            const querySnapshot = await getDocs(collection(database, collectionParam));
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            dispatch(dispatchAction(data))
        } catch (err) {
            openNotificationWithIcon("error", "Đã xảy ra lỗi");
        }
    }
}