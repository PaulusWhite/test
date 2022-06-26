import { getErrorBirthday } from "./birthdayValidator";
import { getErrorEmail } from "./emailValidator";
import { getErrorName } from "./nameValidator";
import { getErrorTel } from "./telValidator";
import { getErrorTextarea } from "./textareaValidator";

let getErrorsAfterSubmit = (value, key) => {
    let error;
    key === "nameInput" && (error = getErrorName(value));
    key === "emailInput" && (error = getErrorEmail(value));
    key === "telInput" && (error = getErrorTel(value));
    key === "birthdayInput" && (error = getErrorBirthday(value));
    key === "textarea" && (error = getErrorTextarea(value));
    return error;
}

export default getErrorsAfterSubmit;