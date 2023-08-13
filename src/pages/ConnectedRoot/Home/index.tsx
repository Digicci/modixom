import React, {useState, useEffect} from "react";

import './home.scss';
import {IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage} from "@ionic/react";
import {search, optionsOutline} from "ionicons/icons";

import Annonce from "../../../components/Annonce";

import {IAnnonce} from "../../../models/IAnnonce";
import Loader from "../../../components/Loader";
const Home: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);


    const getRandomNumber = () => Math.floor(Math.random() * 900) + 100;

    const products: IAnnonce[] = [
        {
            id: 1,
            title: 'iPhone 11 Pro Max',
            description: 'iPhone 11 Pro Max 256Go Gris sidéral',
            newPrice: 1000,
            imgPath: 'https://www.apple.com/v/iphone-14-pro/h/images/key-features/compare/compare_iphone_14_pro__dny32075a7ki_small_2x.jpg',
            oldPrice: 1200,
            logoPath: 'https://www.apple.com/ac/globalnav/4/fr_FR/images/globalnav/apple/image_large.svg',
            priceEval: 4.5,
            vendorEval: 99,
        },
        {
            id: 2,
            title: "Élégante Montre-Bracelet en Édition Limitée",
            imgPath: "https://picsum.photos/200",
            description: "Découvrez la sophistication incarnée avec notre nouvelle montre-bracelet en édition limitée. Fabriquée avec un souci du détail exceptionnel, cette montre allie fonctionnalité et style de manière unique. Son boîtier en acier inoxydable abrite un mouvement mécanique de pointe, garantissant une précision exceptionnelle.",
            oldPrice: 499.99,
            newPrice: 399.99,
            logoPath: "https://picsum.photos/150",
            priceEval: 3.2,
            vendorEval: 62
        },
        {
            id: 3,
            title: "Smartphone Avancé XYZ",
            imgPath: `https://picsum.photos/300/200?random=${getRandomNumber()}`,
            description: "Découvrez le futur de la technologie mobile avec le smartphone XYZ. Doté d'un écran haute résolution, d'une caméra avancée et de performances exceptionnelles, ce téléphone redéfinit l'expérience utilisateur. Capturez des moments incroyables et restez connecté comme jamais auparavant.",
            oldPrice: null,
            newPrice: 799.99,
            logoPath: `https://picsum.photos/100/100?random=${getRandomNumber()}`,
            priceEval: 2.8,
            vendorEval: 85
        },
        {
            id: 4,
            title: "Ensemble de Bagages Voyager Plus",
            imgPath: `https://picsum.photos/300/200?random=${getRandomNumber()}`,
            description: "Préparez-vous à explorer le monde avec confiance grâce à l'ensemble de bagages Voyager Plus. Fabriqué avec des matériaux durables, cet ensemble comprend diverses tailles de valises et de sacs. Les roues pivotantes à 360 degrés facilitent les déplacements dans les aéroports et les gares.",
            oldPrice: 299.99,
            newPrice: 249.99,
            logoPath: `https://picsum.photos/100/100?random=${getRandomNumber()}`,
            priceEval: 4.7,
            vendorEval: 92
        }
    ]

    // Todo: set products in the appropriate store and get them from there
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);


    return (
        <IonPage className={'home'}>
            <IonHeader className={'home__header'}>
                <IonItem className={'home__header__search'}>
                    <IonInput
                        className={'home__header__search__input'}
                        type={'text'}
                        placeholder={'Rechercher un produit / une enseigne'}
                    />
                    <IonIcon icon={search} slot={'start'} className={'home__header__search__icon'}/>
                </IonItem>
            </IonHeader>
            <IonContent>
                <div className={'home__content'}>
                    <div className={'home__content__filters'}>
                        <div className={'home__content__filters__category'}>
                            <IonButton className={'button'}>
                                Catégories
                            </IonButton>
                        </div>
                        <div className={'home__content__filters__button'}>
                            <IonButton className={'button'}>
                                Filtres
                                <IonIcon icon={optionsOutline} slot={'end'}/>
                            </IonButton>
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            <IonList>
                                {
                                    products.map((product: IAnnonce, index: number) => (
                                        <Annonce key={index} {...product} />
                                    ))
                                }
                            </IonList>
                        )
                    }
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;