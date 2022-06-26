import { showErrorMessage } from "../validators/common";

let errorsList = {
    default: "Заполните поле",
    wrongEmail: `Поле может содержать только один символ @ и быть по типу youremail@gmail.com`,
    manySpaces: "Поле не может содержать пробел",
    nonLatin: "Поле не может содержать нелатинские буквы",
    test: `Символы № ; % ^ : ? * / ' { } " \`\ недопустимы`,
    noErrors: "",
}

let getErrorEmail = (value) => {
    let regEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

    let errorMessage = !regEmail.test(value) ? errorsList.wrongEmail : errorsList.noErrors;

    if(!value){
        errorMessage = errorsList.default;
        return errorMessage;
    }
    if(/[А-яё]/g.test(value)){
        errorMessage = errorsList.nonLatin;
        return errorMessage;
    }
    if(/["№;%^:?*\\/'{}\}\{`]/i.test(value)){
        errorMessage = errorsList.test;
        return errorMessage;
    }
    if(/\s/.test(value)){
        errorMessage = errorsList.manySpaces;
        return errorMessage;
    }

    return errorMessage;
}

let emailValidator = (value, errorField, setValue) => {
    
    let error = getErrorEmail(value);

    showErrorMessage(errorField, error);

    if(error === errorsList.nonLatin || error === errorsList.manySpaces ||
        error === errorsList.test) return;
                                     
    setValue(value.trim())
}

export { emailValidator, getErrorEmail }