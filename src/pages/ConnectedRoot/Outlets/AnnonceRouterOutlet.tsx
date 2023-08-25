import React from "react";
import animationBuilder from "../../../utils/tools/animationBuilder";
import {Route} from "react-router-dom";

import {IonRouterOutlet} from "@ionic/react";
import AddAnnonce from "../AddAnnonce";

const AnnonceRouterOutlet: React.FC = () => {
    return (
        <IonRouterOutlet animation={animationBuilder}>
            <Route exact path="/addAnnonce">
                <AddAnnonce/>
            </Route>
            <Route exact path={'/addAnnonce/valider'}>
                <div>annonce valider</div>
            </Route>
        </IonRouterOutlet>
    )
}

export default AnnonceRouterOutlet;