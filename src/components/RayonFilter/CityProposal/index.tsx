import React from "react";


interface ICityProposalProps {
    villes: Array<any>;
    classPrefix?: string;
    click?: (ville: any) => void;
}

const CityProposal: React.FC<ICityProposalProps> = ({villes, classPrefix, click}: ICityProposalProps) => {

    if (villes.length === 0) return <div className={`${classPrefix}__item noItem`} onClick={() => click && click(null)}>Aucune correspondance</div>;

    return (
        <>
            {
                villes.map((ville, index) => {
                    return ville.cp.split('-').map((cp: string, i: number) => {
                        const vile = {...ville, cp};
                        return (
                            <div
                                className={`${classPrefix}__item`}
                                key={`${index}-${i}`}
                                onClick={() => click && click(vile)}
                            >
                                {vile.nom} (<span>{vile.cp}</span>)
                            </div>
                        )
                    })
                })
            }
        </>
    );
}
export default CityProposal;