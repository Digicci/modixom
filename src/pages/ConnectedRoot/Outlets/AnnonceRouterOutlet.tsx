import React from "react";
import animationBuilder from "../../../utils/tools/animationBuilder";
import {Route} from "react-router-dom";

import {IonRouterOutlet} from "@ionic/react";
import AddAnnonce from "../AddAnnonce";
import AddAnnonceValidate from "../addAnnonceValidate";

const AnnonceRouterOutlet: React.FC = () => {
    return (
        //@ts-ignore
        <IonRouterOutlet animation={animationBuilder}>
            <Route exact path="/addAnnonce">
                <AddAnnonce/>
            </Route>
            <Route exact path={'/addAnnonce/valider'}>
                <AddAnnonceValidate/>
            </Route>
        </IonRouterOutlet>
    )
}

export default AnnonceRouterOutlet;