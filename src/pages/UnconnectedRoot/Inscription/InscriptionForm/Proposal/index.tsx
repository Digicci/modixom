import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCitiesProposal, getInputFocus} from "../../../../../store/selectors/InscriptionSelectors";
import {setInscriptionCity, setInscriptionFocus} from "../../../../../store/actions/inscriptionActions"
import {ICityProposal} from '../../../../../store/reducers/InscriptionReducer'

interface IProposalProps {
    class: string;
}

const Proposal: React.FC = (props: IProposalProps) => {

    const cities = useSelector(getCitiesProposal)
    const focusOn = useSelector(getInputFocus)
    const dispatch = useDispatch()

    const handleClick = (city: ICityProposal) => {
        dispatch(setInscriptionCity(city))
        dispatch(setInscriptionFocus(null))
    }

    if (cities.length == 0 || focusOn != 'city') {
        return null
    }

    return (
        <div className={props.class}>
            <div className={`${props.class}__proposals`}>
                {
                    cities.map((city, index) => {
                        return (
                            <div
                                key={index}
                                className={`${props.class}__proposals__item`}
                                onClick={() => handleClick(city)}
                            >
                                <span>{city.nom} ({city.cp})</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Proposal;