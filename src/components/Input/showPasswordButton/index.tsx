// path : src/components/Input/showPasswordButton/index.tsx
import "./style.scss";
import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"

interface IshowPasswordButton {
    show: boolean;
    toggleShow: () => void;
}

const showPasswordButton: React.FC<IshowPasswordButton> = ({show, toggleShow}) => {

    return <div className={'showPasswordButton'} onClick={toggleShow}>
        {
            show ? <FaEyeSlash /> : <FaEye />
        }
    </div>
}

export default showPasswordButton