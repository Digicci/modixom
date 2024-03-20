import React from "react";
import animationBuilder from "../../../utils/tools/animationBuilder";
import {Route} from "react-router-dom";
import AnnonceDetail from "../AnnonceDetail";
import Category from "../Filter/Category";
import Filters from "../Filter/Filters";
import Home from "../Home";
import {IonRouterOutlet} from "@ionic/react";

const HomeRouterOutlet: React.FC = () => {
    return (
        //@ts-ignore
        <IonRouterOutlet animation={animationBuilder}>
            <Route exact path="/home/:id">
                <AnnonceDetail/>
            </Route>
            <Route exact path="/home/filter/category">
                <Category/>
            </Route>
            <Route exact path="/home/filter/filters">
                <Filters/>
            </Route>
            <Route exact path={'/home'}>
                <Home/>
            </Route>
        </IonRouterOutlet>
    )
}

export default HomeRouterOutlet;