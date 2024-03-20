import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import Connexion from "./Connexion";
import Inscription from "./Inscription";
import ChooseType from "./ChooseType";
import {clientTypes} from "../../constants";
import animationBuilder from "../../utils/tools/animationBuilder";


const UnconnectedRoot: React.FC = () => {
    return (
        //@ts-ignore
        <IonRouterOutlet animation={animationBuilder}>
            <Route exact path="/connexion">
                <Connexion />
            </Route>
            <Route exact path={'/inscription/professionnel'}>
                <Inscription type={clientTypes.pro} />
            </Route>
            <Route exact path={'/inscription/particulier'}>
                <Inscription type={clientTypes.part} />
            </Route>
            <Route exact path={'/inscription'}>
                <ChooseType />
            </Route>
            <Route>
                <Redirect to="/connexion" />
            </Route>
        </IonRouterOutlet>
    );
}

export default UnconnectedRoot;