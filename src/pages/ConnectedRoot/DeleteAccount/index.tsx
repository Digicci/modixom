import React, {useState} from "react";
import "./deleteAccount.scss"
import { useIonToast } from "@ionic/react";
import {
    IonButton,
    IonContent,
    IonFooter,
    IonPage,
} from "@ionic/react";
import Header from "../../../components/Header";
import {useApi} from "../../../services/ApiService";
import {endpoints} from "../../../constants";
import {useSelector, useDispatch} from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";
import {disconnectUser} from "../../../store/actions/userActions";

const DeleteAccount: React.FC = () => {

    const [checked, setChecked] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [present] = useIonToast();
    const api = useApi()
    const dispatch = useDispatch()
    const token = useSelector(getUserToken)


    const handleChange = (): void => {
        setChecked(!checked);
    }
    const deleteUser: () => void = (): void => {
        if (!checked) {
            setError(true);
        } else {
            setError(false);
            api.get(endpoints.deleteProfil, {token}).then((res) => {
                console.log(res)
                if(res.message === "Suppression ok") {
                    present({
                        message: 'Votre compte à été supprimé',
                        duration: 5000,
                        color: "success"
                    }).then(() => {
                        dispatch(disconnectUser())
                    })
                } else {
                    present({
                        message: `Une erreur est survenue : ${res.message}`,
                        duration: 5000,
                        color: "danger"
                    }).then()
                }
            }).catch(() => {
                present({
                    message: 'Une erreur s\'est produite, merci d\'essayer plus tard',
                    duration: 5000,
                    color: "danger"
                }).then()
            })
            console.log("ok")
        }
    }

    return (
        <IonPage className={"deleteAccount"}>
            <Header text={'supprimer mon compte'} canGoBack={true} defaultHref={'/user'} />
            <IonContent>
                <div className={"deleteAccount__container"}>
                    <div className={"deleteAccount__container__textContainer"}>
                        <h2>vous allez commencer le processus de suppression de votre compte </h2>
                        {/* VOUS ALLEZ COMMENCER LE PROCESSUS DE SUPPRESSION DE VOTRE COMPTE */}
                        <p>
                            Vous êtes sur le point de nous demander de fermer définitivement
                            votre compte et de supprimer vos données. Une fois votre compte fermé,
                            tous les services auxquels vous accédez par le biais de votre compte
                            ne seront plus disponibles.
                        </p>
                        <div className={"deleteAccount__container__textContainer__checkbox"}>
                            <input type={"checkbox"} id={"deleteAccountButton"} onChange={handleChange}/>
                            <label htmlFor={"deleteAccountButton"}>
                                oui, je souhaite fermer définitivement
                                mon compte et supprimer mes données
                            </label>

                            <div className={"inputGroup__error"}>{error && <p>* Veuillez cocher la case</p>}</div>
                        </div>
                    </div>
                </div>
            </IonContent>

            <IonFooter className={'deleteAccount__footer'}>
                <IonButton expand={'full'} className={'validateButton'} onClick={deleteUser}>
                    FERMER MON COMPTE
                </IonButton>
            </IonFooter>

        </IonPage>
    )
}
export default DeleteAccount;