import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCitiesProposal, getInputFocus} from "../../store/selectors/InscriptionSelectors";
import {setInscriptionCity, setInscriptionFocus} from "../../store/actions/inscriptionActions"
import ICityProposal from '../../models/ICityProposal'

interface IProposalProps {
    classPrefix: string;
    propositionSelector?: (state: any) => any;
    citySetter?: (city: ICityProposal) => { type: string, payload: typeof city };
}

// @ts-ignore
const Proposal: React.FC = ({classPrefix: classFor, propositionSelector, citySetter}: IProposalProps): null | React.JSX.Element => {

    const cities = useSelector(propositionSelector || getCitiesProposal)
    const focusOn = useSelector(getInputFocus)
    const dispatch = useDispatch()

    const handleClick = (city: ICityProposal, cp: string) => {
        const newCity = {
            ...city,
            cp
        }
        const action = citySetter ? citySetter(newCity) : setInscriptionCity(newCity)
        dispatch(action)
        dispatch(setInscriptionFocus(null))
    }

    if (cities.length == 0 || focusOn != 'city') {
        return null
    }

    return (
        <div className={classFor}>
            <div className={`${classFor}__proposals`}>
                {
                    cities.map((city: ICityProposal, index: number) => {
                        return city.cp.split('-').map((cp: string, key :number) => {
                            return (
                                <div
                                    key={`${index}-${key}`}
                                    className={`${classFor}__proposals__item`}
                                    onClick={() => handleClick(city, cp)}
                                >
                                    <span>{city.nom} ({cp})</span>
                                </div>
                            )
                        })
                    })
                }
            </div>
        </div>
    )
}

export default Proposal;