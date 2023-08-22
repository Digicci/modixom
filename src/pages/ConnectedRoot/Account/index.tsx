import React, { useEffect } from "react";
import Header from "../../../components/Header";
import {IonPage} from "@ionic/react";
import { useApi } from "../../../services/ApiService";
import { endpoints } from "../../../constants";


// store import
import { useSelector } from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";

const Account: React.FC = () => {
    const api = useApi();
    const token = useSelector(getUserToken);

    useEffect(() => {
        api.get(endpoints.profilDetail).then((res) => {
            console.log(res);
        })
    }, []);

    return (
        <IonPage>
            <Header text={'mes coordonnées'} canGoBack={true} defaultHref={'/user'}/>
        </IonPage>
    )
}

export default Account;