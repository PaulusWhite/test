import { showErrorMessage } from "../validators/common";

let errorsList = {
    default: "Заполните поле",
    litleText: "Поле не может содержать менее 10 символов",
    bigText: "Поле не может содержать более 300 символов",
    noErrors: "",
}

let getErrorTextarea = (value) => {
    if(value.length > 300) return errorsList.bigText;
    if(value.length === 0) return errorsList.default;
    if(value.length < 10) return errorsList.litleText;

    return errorsList.noErrors;
}

let textareaValidator = (value, errorField, setValue) => {
    let error = getErrorTextarea(value);

    showErrorMessage(errorField, error);
        
    if(value.length > 300) return;
    setValue(value);
}

export { textareaValidator, getErrorTextarea }