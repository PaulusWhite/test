import { useState, useEffect, useRef } from "react";
import { telValidator } from "../validators/telValidator";

let TelField = ({telValue, setTelValue}) => {
    let [cursorPosition, setCursorPosition] = useState(0);
    let inputRef = useRef();
    let errorField = useRef();

    let handleOnFocus = () => !telValue && setTelValue("+7 ");

    let handleOnBlur = () => telValue === "+7 " && setTelValue("");

    let setNewValue = (newValue, selectionStart) => {
        setTelValue(newValue);
        setCursorPosition(selectionStart)
    }

    let handleSetValue = (event) => {
        let target = event.target;
        telValidator(target, telValue, errorField.current, setNewValue, setCursorPosition);
    }

    useEffect( () => {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    return (
        <div className="telField">
            <input type="text" 
            placeholder="Номер телефона" 
            value={telValue}
            onChange={handleSetValue}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            ref={inputRef}
            id="telInput"/>
            <span className="errorMessage" ref={errorField}>Укажите полный номер телефона цифрами</span>
        </div>
    )
}

export default TelField;