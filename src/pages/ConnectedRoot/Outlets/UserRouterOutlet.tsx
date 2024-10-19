import React from 'react';
import { Route } from "react-router";
import { IonRouterOutlet } from '@ionic/react';
import animationBuilder from "../../../utils/tools/animationBuilder";
import DeleteAccount from "../DeleteAccount";
import User from "../User";
import Account from "../Account";
import ContactClient from "../ContactClient";
import MyAnnonce from "../MyAnnonce";
import MyAnnonceDetail from "../MyAnnonceDetail";
import Facture from "../Facture";
import Favoris from "../Favoris";
import MyAlertes from "../MyAlertes";



const UserRouterOutlet: React.FC = () => {
    return (
        //@ts-ignore
        <IonRouterOutlet animation={animationBuilder}>
            <Route exact={true} path={"/user"}>
                <User/>
            </Route>
            <Route exact={true} path={`/user/delete`}>
                <DeleteAccount/>
            </Route>
            <Route exact={true} path={`/user/coordonnes`}>
                <Account/>
            </Route>
            <Route exact={true} path={`/user/contact`}>
                <ContactClient/>
            </Route>
            <Route exact={true} path={`/user/myAnnonces`}>
                <MyAnnonce/>
            </Route>
            <Route exact={true} path={`/user/myAnnonces/:id`}>
                <MyAnnonceDetail/>
            </Route>
            <Route exact={true} path={`/user/facture`}>
                <Facture />
            </Route>
            <Route exact={true} path={`/user/favoris`}>
                <Favoris />
            </Route>
            <Route exact={true} path={`/user/alertes`}>
                <MyAlertes />
            </Route>
        </IonRouterOutlet>
    )
}

export default UserRouterOutlet;