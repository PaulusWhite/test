import { showErrorMessage } from "../validators/common";

let errorsList = {
    default: "Укажите полный номер телефона цифрами",
    litleNum: "Номер должен содержать 11 цифр",
    noErrors: "",
}

let getErrorTel = (value) => {
    let solidNumber = value.replace(/\D/g, ""); //only number
    let error = "";
    if(solidNumber.length === 1 || !value){
        error = errorsList.default;
        return error;
    }
    if(solidNumber.length < 11 && solidNumber.length > 1) error = errorsList.litleNum;

    return error;
}

let telValidator = (target, currentValue, errorField, setValue, setCursorPosition) => {
    let selectionStart = target.selectionStart;
    let value = target.value;
    let solidNumber = value.replace(/\D/g, ""); //only number
    let countryCode = value.slice(0, 3);

    let error = getErrorTel(value);
    showErrorMessage(errorField, error);

    if(countryCode !== "+7 ") return setCursorPosition(3);

    if(solidNumber.length > 11) return;

    let newValueArr = [];
    let solidNumberArr = solidNumber.split("");
    
    solidNumberArr.forEach( (num, index) => {
        index === 0 && (num = "+" + num + " ");
        index === 1 && (num = "(" + num);
        index === 3 && (num = num + ") ");
        (index === 6 || index === 8) && (num = num + " ");
        if((index === 0 || index === 3) && currentValue.length <= value.length) selectionStart++;

        newValueArr.push(num);
    });

    value = newValueArr.join("");

    setValue(value, selectionStart);
}

export { telValidator, getErrorTel }