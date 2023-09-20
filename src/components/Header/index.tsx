import React from "react";
import {IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar} from "@ionic/react";
import {isUserPro} from "../../store/selectors/UserSelectors";
import {useSelector} from "react-redux";
import {generateHeaderClassName} from "../../utils/tools/classNameGenerator";


interface IHeaderProps {
    text: string;
    canGoBack?: boolean;
    defaultHref?: string;
    pro?: boolean | null;
}

const Header: React.FC<IHeaderProps> = ({text, canGoBack = false, defaultHref = '', pro = null}: IHeaderProps) => {

    const isPro: boolean = pro || useSelector(isUserPro);
    const headerClass: string = generateHeaderClassName(isPro)

    return (
        <IonHeader className={headerClass}>
            <IonToolbar className={'toolBar'} style={{paddingTop: '40px'}}>
                {
                    canGoBack &&
                        <IonButtons slot={"start"}>
                            <IonBackButton defaultHref={defaultHref} className={'header__back__button'} text={''}/>
                        </IonButtons>
                }
                <IonTitle className={'title'}>{text}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header;