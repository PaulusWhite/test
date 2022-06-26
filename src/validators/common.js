let showErrorMessage = (errorField, errorText) => {
    errorField.innerHTML = errorText;
}

let firstSpaceValid = (value, errorField, setValue) => {
    if(value[0] === " "){
        showErrorMessage(errorField, "Первый символ не может быть пробелом");
        return false; //flag
    };
    if(!value){
        showErrorMessage(errorField, "Заполните поле");
        setValue(value.trim());
        return false; //flag
    }
    return true; //flag
}

export { firstSpaceValid, showErrorMessage }