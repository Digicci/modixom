import React, {useEffect} from "react";
import "./AddAnnonce.scss"
import Header from "../../../components/Header";
import {IonButton, IonContent, IonPage} from "@ionic/react";
import AddAnnonceForm from "./AddAnnonceForm/AddAnnonceForm";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../store/selectors/UserSelectors";
import {resetAddAnnonceForm} from "../../../store/actions/addAnnonceAction";

const AddAnnonce: React.FC = () => {

    const user = useSelector(getUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetAddAnnonceForm())
    }, []);

    return (
        <IonPage className={"addAnnonce"}>
            <Header text={"je dépose une annonce"}/>
            <IonContent >
                <div className={"addAnnonce__container"}>
                    <div className={"addAnnonce__container__credit"}>
                        <div>
                            <p>Mon crédit : </p>
                            <span>{user.credit}</span>
                        </div>
                        <IonButton href={`https://modixom.fr/achatCredit?token=${user.token}`}>Acheter du crédit</IonButton>
                    </div>
                    <div>
                        <AddAnnonceForm/>
                    </div>
                </div>
            </IonContent>

        </IonPage>
    )

}
export default AddAnnonce;