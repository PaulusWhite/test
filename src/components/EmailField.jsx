import { useRef } from "react";
import { emailValidator } from "../validators/emailValidator";
import { firstSpaceValid } from "../validators/common"

let EmailField = ({emailValue, setEmailValue}) => {
    let errorField = useRef();

    let handleSetValue = (event) => {
        let value = event.target.value;
        let flag = firstSpaceValid(value, errorField.current, setEmailValue);
        if(!flag) return;

        emailValidator(value, errorField.current, setEmailValue);
    }

    return (
        <div>
            <input type="text"
                placeholder="Почта"
                value={emailValue}
                onChange={handleSetValue}
                id="emailInput"/>
            <span className="errorMessage" ref={errorField}>Заполните поле</span>
        </div>
    );
}

export default EmailField;