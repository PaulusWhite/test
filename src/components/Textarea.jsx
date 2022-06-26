import { useRef } from "react";
import { textareaValidator } from "../validators/textareaValidator";
import { firstSpaceValid } from "../validators/common";

let Textarea = ({textareaValue, setTextareaValue}) => {
    let errorField = useRef();

    let handleSetValue = (event) => {
        let value = event.target.value;
        let flag = firstSpaceValid(value, errorField.current, setTextareaValue); //permission flag to continue the function
        if(!flag) return;
        
        textareaValidator(value, errorField.current, setTextareaValue)
    }

    return (
        <div className="textareaBlock">
            <textarea type="text" 
                      placeholder="Сообщение" 
                      value={textareaValue}
                      onChange={handleSetValue}
                      id="textarea"/>
            <span className="errorMessage" ref={errorField}>Заполните поле</span>
        </div>
    );
}

export default Textarea;