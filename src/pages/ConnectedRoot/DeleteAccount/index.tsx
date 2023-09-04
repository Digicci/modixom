import React, {useState} from "react";
import "./deleteAccount.scss"
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonPage, IonTitle,
    IonToolbar
} from "@ionic/react";
import {useSelector} from "react-redux";
import {isUserPro} from "../../../store/selectors/UserSelectors";
import {generateHeaderClassName} from "../../../utils/tools/classNameGenerator";
import Header from "../../../components/Header";

const DeleteAccount: React.FC = () => {

    const isPro: boolean = useSelector(isUserPro);
    const headerClass: string = generateHeaderClassName(isPro);
    const [checked, setChecked] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleChange = (): void => {
        setChecked(!checked);
    }
    const deleteUser: () => void = (): void => {
        if (!checked) {
            setError(true);
        } else {
            setError(false);
            //TODO ajouter la requete vers l'api pour supprimer l'utilisateur
            console.log("ok")
        }

    }
    return (
        <IonPage className={"deleteAccount"}>
            <Header text={'supprimer mon compte'} canGoBack={true} defaultHref={'/user'} />
            <IonContent>
                <div className={"deleteAccount__container"}>
                    <div className={"deleteAccount__container__textContainer"}>
                        <h2>vous allez commencer le processus de supression de votre compte </h2>
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