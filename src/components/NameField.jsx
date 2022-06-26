import { useState, useEffect, useRef } from "react";

import { nameValidator } from "../validators/nameValidator";
import { firstSpaceValid } from "../validators/common";

let NameField = ({nameValue, setNameValue}) => {
    let [cursorPosition, setCursorPosition] = useState(0);
    let inputRef = useRef();
    let errorField = useRef();

    let handleSetValue = (event) => {
        let target = event.target;
        let value = target.value.toUpperCase(); //get value and convert register at once
        let flag = firstSpaceValid(value, errorField.current, setNameValue); //permission flag to continue the function
        if(!flag) return;

        nameValidator(target, errorField, setNameValue, setCursorPosition)
    }

    useEffect( () => {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    return (
        <div>
            <input 
            type="text" 
            placeholder="Имя и Фамилия"
            value={nameValue}
            onChange={handleSetValue} 
            ref={inputRef}
            id="nameInput"/>
            <span className="errorMessage" ref={errorField}>Заполните поле</span>
        </div>
    )
}

export default NameField;