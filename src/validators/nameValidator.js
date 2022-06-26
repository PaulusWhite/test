import { showErrorMessage } from "../validators/common";

let errorsList = {
    default: "Заполните поле",
    enterValid: "Допускаются только латинские буквы, без цифр и спец.символов",
    shortFullName: "Имя и фамилия не должны содержать менее 3 символов",
    shortFirstName: "Имя не должно содержать менее 3 символов",
    shortLastName: "Фамилия не должна содержать менее 3 символов",
    longFullName: "Имя и фамилия не должны содержать более 30 символов",
    longFirstName: "Имя не должно содержать более 30 символов",
    longLastName: "Фамилия не должна содержать более 30 символов",
    shortNameLongLastName: "Имя не должно содержать менее 3 символов, а фамилия более 30",
    shortLastNameLongName: "Фамилия не должна содержать менее 3 символов, а имя более 30",
    manySpaces: "Поле не может содержать более одного пробела",
    noErrors: "",
}

let lengthValidation = (name, lastName) => {
    if(lastName.length > 30 ) return errorsList.longLastName;
    if(name.length < 3 && lastName.length > 30) return errorsList.shortNameLongLastName;
    if(lastName.length < 3 && name.length > 30) return errorsList.shortLastNameLongName;
    if(name.length < 3 && lastName.length < 3) return errorsList.shortFullName;
    if(name.length < 3) return errorsList.shortFirstName;
    if(lastName.length < 3) return errorsList.shortLastName;
    if(name.length > 30 && lastName.length > 30) return errorsList.longFullName;
    if(name.length > 30) return errorsList.longFirstName;

    return errorsList.noErrors; //if everything okay 
}

let getErrorName = (value) => {
    let [name = "", lastName = ""] = value.split(" "); //get name and lastName from value string
    let reLatin = /^[A-z ]+$/; //regEx    
    let wrongLengthError = lengthValidation(name, lastName);

    if(!value){
        let error = errorsList.default;
        return error; //return errorText
    }

    if(!reLatin.test(value) || /[Ёё`^\\]/.test(value)){
        let error = errorsList.enterValid;
        return error; //return errorText
    }

    return wrongLengthError; //return errorTet
}

let nameValidator = (target, errorField, setValue, setCursorPosition) => {
    let selectionStart = target.selectionStart; //cursor position
    let value = target.value.toUpperCase(); //get value and convert register at once
    let [name = "", lastName = ""] = value.split(" "); //get name and lastName from value string

    let error = getErrorName(value);
    showErrorMessage(errorField.current, error);

    if(error === errorsList.enterValid || name.length > 30 || lastName.length > 30 ){
        return;
    }

    let arr = value.split("");
    let spacesAmount = 0;

    arr.forEach(symbol => symbol === " " && spacesAmount++);

    if(spacesAmount < 2){
        setValue(value);
        setCursorPosition(selectionStart);
    }else{
        showErrorMessage(errorField.current, errorsList.manySpaces);
    }
}

export {nameValidator, getErrorName};