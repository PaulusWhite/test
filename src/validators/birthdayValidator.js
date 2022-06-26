import { showErrorMessage } from "../validators/common";

let errorsList = {
    default: "Заполните поле",
    bigYear: "Год не может быть больше текущего",
    litleYear: "Год не может быть меньше 1900",
    noErrors: "",
}

let getErrorBirthday = (value) => {
    let year = +value.slice(0, 4);
    let month = +value.slice(5, 7);
    let day = +value.slice(8, 11);

    if(!value) return errorsList.default;
    if(year > 2022) return errorsList.bigYear;
    if(year < 1900) return errorsList.litleYear;
    if(year < 1900 || month < 1 || day < 1) return errorsList.default;

    return errorsList.noErrors;
}

let birthdayValidator = (value, errorField, setValue) => {
    let error = getErrorBirthday(value);

    showErrorMessage(errorField, error);
    setValue(value);
}

export { birthdayValidator, getErrorBirthday };