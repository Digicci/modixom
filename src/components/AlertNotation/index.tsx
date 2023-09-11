import React, {useState} from "react";
import {IonButton, IonModal, IonRange} from "@ionic/react";
import "./alertNotation.scss"
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/selectors/UserSelectors";

interface IAlertNotationProps {
    isOpen: boolean
    onDidDismiss: () => void;
    header?: string;
    idProduit: number;
    idVendeur:number;
    type: "produit" | "vendeur";

}

const AlertNotation: React.FC<IAlertNotationProps> = (props: IAlertNotationProps) => {
    const star = 5;
    const starArray = Array.from({length: star}, (_, index) => index + 1);
    const [highlightedLabel, setHighlightedLabel] = useState<number | null>(null);
    const [vendeurNote,setVendeurNote]= useState<any>(0)
    const [error, setError] = useState("")

    const userToken = useSelector(getUserToken);
    const handleCheckStar = (e: React.MouseEvent<HTMLLabelElement>) => {
        setHighlightedLabel(parseInt(e.currentTarget.id, 10));
    }
    const ValidatehandleCheckStar = () => {
        if(props.type==="produit"){
            if (highlightedLabel !== null) {
                console.log(userToken)
                console.log(props.idProduit)
                console.log(highlightedLabel)
                props.onDidDismiss()
            } else {
                setError("veuillez selectionner une note ")
            }
        }else{
            if(vendeurNote!==0){
                console.log(vendeurNote)
                console.log(userToken)
                console.log(props.idVendeur)
            }else{
                setError("veuillez choisir une note different de 0 ")
            }
        }

    };

    const cancel = () => {
        setHighlightedLabel(null)
        setVendeurNote(0)
        setError("")
        props.onDidDismiss()
    }
    return (
        <IonModal id={"starModal"} showBackdrop={true} backdropDismiss={true} isOpen={props.isOpen}
                  onDidDismiss={props.onDidDismiss}>
            <div className={"starModal__container"}>
                <h1>Noter: {props.header}</h1>
                {
                    props.type==="produit" ?
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
                        :
                        <div className={"starModal__container__rangeContainer"}>
                            <IonRange min={0} max={100} pin={true} onIonKnobMoveEnd={({detail})=>{setVendeurNote(detail.value)}} />
                        </div>
                }
                {error && <p>{error}</p>}
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