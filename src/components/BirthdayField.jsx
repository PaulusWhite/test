import { useRef } from "react";
import { birthdayValidator } from "../validators/birthdayValidator";

let BirthdayField = ({birthdayValue, setBirthdayValue}) => {
    let errorField = useRef();

    let handleSetValue = (event) => {
        let value = event.target.value;
        birthdayValidator(value, errorField.current, setBirthdayValue);
    }
    return (
        <div>
            <label htmlFor="birthdayInput">Дата рождения</label>
            <input type="date" 
                    placeholder="Дата рождения" 
                    max="2022-12-31"
                    min="1900-01-01"
                    value={birthdayValue}
                    onChange={handleSetValue}
                    id="birthdayInput"/>
            <span className="errorMessage" ref={errorField}>Заполните поле</span>
        </div>
    );
}

export default BirthdayField;