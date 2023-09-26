import React, {CSSProperties, useEffect} from "react";
import {IonItem, IonLabel} from "@ionic/react";




interface IAnnonceRoute{
    titre:string,
    statut: string,
    id:number,
    timeLeft?: string

}
const MyAnnonceComponents: React.FC<IAnnonceRoute>=(props)=>{

    const [timeLeft, setTimeLeft] = React.useState<string>(props.timeLeft || '00:00:00');

    const timer = () => {
        setTimeLeft(prevTime => {
            // timeLeft format is hh:mm:ss
            let nums = prevTime.split(':');
            let hours = parseInt(nums[0]);
            let minutes = parseInt(nums[1]);
            let seconds = parseInt(nums[2]);
            seconds -= 1;
            if (seconds < 0) {
                seconds = 59;
                minutes -= 1;
                if (minutes < 0) {
                    minutes = 59;
                    hours -= 1;
                    if (hours < 0) {
                        hours = 0;
                        minutes = 0;
                        seconds = 0;
                    }
                }
            }

            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            timer();
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const statutStyle: CSSProperties = {
        padding: '5px 10px',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        backgroundColor: props.statut === 'active' ? "#4caf50" : "#ff8000",
        width: 'fit-content',
    }

    return(
        <>
            <IonItem id={`${props.id}`}  className={'myAnnonce__list__item'}
            routerLink={`/user/myAnnonces/${props.id}`}>
                <IonLabel className={"myAnnonce__list__item__label"}>
                    <h2>{props.titre}</h2>
                    <p style={statutStyle}>{props.statut}</p>
                    <p style={{fontSize: '12px', color: '#ff8000'}}>Temps restant: {timeLeft}</p>
                </IonLabel>
            </IonItem>
        </>
    )

}
export default MyAnnonceComponents