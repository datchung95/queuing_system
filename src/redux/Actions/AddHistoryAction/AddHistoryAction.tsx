import { addDoc, collection } from "firebase/firestore";
import database from "../../../configFirebase";
import { getAllDataAction } from "../GetAllDataAction/GetAllDataAction";

export const addHistoryAction = (collectionParam: string, valueDocument: object, dispatchAction: any) => {
    return async (dispatch: any) => {
        try {
            await addDoc(collection(database, collectionParam), valueDocument);
            await dispatch(getAllDataAction(collectionParam, dispatchAction))
        }
        catch (err) {
            
        }
    }
}