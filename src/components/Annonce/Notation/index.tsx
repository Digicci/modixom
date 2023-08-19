import React from "react";
import './notation.scss';

interface INotationsProps {
    priceNote: number;
    vendorNote: number;
}
const Notation: React.FC<INotationsProps> = ({priceNote, vendorNote}: INotationsProps) => {

    return (
        <div className={'notation'}>
            <div className={'notation__price'}>
                <div className={"notation__price__title"}>
                    Note produit
                </div>
                <div className={"notation__price__stars"}>
                    {
                        Array(5).fill(0).map((_, index) => (
                            <div key={index} className={"notation__price__stars__star"}>
                                <div className={"notation__price__stars__star__icon"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" height="20" width="20">
                                        {
                                            index < priceNote ? (
                                                <path
                                                    d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"
                                                    fill="#f3da35"
                                                />
                                            ) : (
                                                <polygon
                                                    id="primary"
                                                    points="12 4 9.22 9.27 3 10.11 7.5 14.21 6.44 20 12 17.27 17.56 20 16.5 14.21 21 10.11 14.78 9.27 12 4"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: '#f3da35',
                                                        strokeLinecap: 'round',
                                                        strokeLinejoin: 'round',
                                                        strokeWidth: 2
                                                    }}
                                                ></polygon>
                                            )
                                        }
                                    </svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={'notation__vendor'}>
                <div className={"notation__vendor__title"}>
                    Note vendeur
                </div>
                <div className={"notation__vendor__bar"}>
                    <div className={'notation__vendor__bar__label'}>{vendorNote}%</div>
                    <div className={"notation__vendor__bar__progress"}>
                        <div className={"notation__vendor__bar__progress__fill"} style={{
                            width: `calc(100% - ${vendorNote}%)`,
                        }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notation;