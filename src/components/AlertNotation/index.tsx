import React, {useState} from "react";
import {IonButton, IonModal} from "@ionic/react";
import "./alertNotation.scss"
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/selectors/UserSelectors";

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

    const userToken = useSelector(getUserToken);
    const handleCheckStar = (e: React.MouseEvent<HTMLLabelElement>) => {
        e.stopPropagation()
        setHighlightedLabel(parseInt(e.currentTarget.id, 10));
    }
    const ValidatehandleCheckStar = (e:React.MouseEvent) => {
        e.stopPropagation()
            if (highlightedLabel !== null) {
                console.log(userToken)
                console.log(props.idProduit)
                console.log(highlightedLabel)
                setHighlightedLabel(null)
                props.onDidDismiss()
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
                <h1>Noter: {props.header}</h1>
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
                                    ⭐️
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
                        valider
                    </IonButton>
                </div>
            </div>
        </IonModal>
    )
}
export default AlertNotation