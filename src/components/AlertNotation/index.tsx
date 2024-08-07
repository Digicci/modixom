import React, {useState} from "react";
import {IonButton, IonIcon, IonModal} from "@ionic/react";
import "./alertNotation.scss"
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/selectors/UserSelectors";
import {useApi} from "../../services/ApiService";
import {endpoints} from "../../constants";
import {useIonToast} from "@ionic/react";
import {star as starIcon} from "ionicons/icons";

interface IAlertNotationProps {
    isOpen: boolean
    onDidDismiss: () => void;
    header?: string;
    idProduit: number;

}

const AlertNotation: React.FC<IAlertNotationProps> = (props: IAlertNotationProps) => {
    const star = 5;
    const starArray = Array.from({length: star}, (_, index) => index + 1);
    const [highlightedLabel, setHighlightedLabel] = useState<number | null>(null);
    const [error, setError] = useState("")
    const api = useApi();
    const [present] = useIonToast();

    const userToken = useSelector(getUserToken);
    const handleCheckStar = (e: React.MouseEvent<HTMLLabelElement>) => {
        e.stopPropagation()
        setHighlightedLabel(parseInt(e.currentTarget.id, 10));
    }
    const ValidatehandleCheckStar = (e:React.MouseEvent) => {
        e.stopPropagation()
            if (highlightedLabel !== null) {
                api.post(
                    endpoints.addNote,
                    {
                        produit: props.idProduit,
                        note: highlightedLabel
                    },
                    {
                        token: userToken
                    }
                ).then(() => {
                    present({
                        message: "Votre note à été prise en compte.",
                        duration: 3000,
                        color: 'success'
                    }).then(() => {
                        props.onDidDismiss()
                        setHighlightedLabel(null)
                    })
                }).catch((e) => {
                    present({
                        message: `Une erreur s'est produite, veuillez réessayer plus tard : ${e.message}`,
                        duration: 3000,
                        color: "danger"
                    }).then(() => {
                        props.onDidDismiss()
                        setHighlightedLabel(null)
                    })
                })

            } else {
                setError("veuillez selectionner une note ")
            }
    };

    const cancel = (e:React.MouseEvent) => {
        e.stopPropagation()
        setHighlightedLabel(null)
        setError("")
        props.onDidDismiss()
    }
    return (
        <IonModal id={"starModal"} showBackdrop={true} backdropDismiss={false} isOpen={props.isOpen}
                  onDidDismiss={props.onDidDismiss}>
            <div className={"starModal__container"}>
                <h1>Evaluer l&apos;annonce</h1>
                {
                    <div className={"starModal__container__starsContainer"}>
                        {starArray.map((item: any) => {
                            const labelClass = `starModal__container__starsContainer__starWrapper input${item} ${
                                //@ts-ignore
                                item <= highlightedLabel ? "highlighted" : ""
                            }`;
                            return (
                                <label
                                    id={item.toString()}
                                    className={labelClass}
                                    onClick={handleCheckStar}
                                    key={item}
                                >
                                    <input
                                        className="starModal__container__starsContainer__starWrapper__starInput"
                                        name="star"
                                        type="radio"
                                    />
                                    <IonIcon icon={starIcon} />
                                </label>
                            );
                        })}
                    </div>
                }
                {error && <p className={"inputGroup__error"}>{error}</p>}
                <div className={"starModal__container__buttonContainer"}>
                    <IonButton className={"starModal__container__buttonContainer__button"}
                               onClick={cancel}> Annuler</IonButton>
                    {/*@ts-ignore*/}
                    <IonButton className={"starModal__container__buttonContainer__button"}
                               onClick={ValidatehandleCheckStar}>
                        Valider
                    </IonButton>
                </div>
            </div>
        </IonModal>
    )
}
export default AlertNotation