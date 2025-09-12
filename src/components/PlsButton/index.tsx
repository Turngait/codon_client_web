import { IPlsButton } from "../../types/components";

import "./index.scss";

const PlsButton = ({ onClick, className }: IPlsButton) => {
  return (
    <button onClick={onClick} className={`plsBtn ${className ? className : ""}`}>+</button>
  )
}

export default PlsButton;
