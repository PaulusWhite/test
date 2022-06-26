import { useState } from "react";

//Components
import NameField from "./NameField";
import EmailField from "./EmailField";
import TelField from "./TelField";
import BirthdayField from "./BirthdayField";
import Textarea from "./Textarea";
import Loader from "./Loader";

//Server emulator
import dataProccessing from "../server";

let Form = () => {
    //States for input components
    let [nameValue, setNameValue]= useState("");
    let [emailValue, setEmailValue] = useState("");
    let [telValue, setTelValue] = useState("");
    let [birthdayValue, setBirthdayValue] = useState("");
    let [textareaValue, setTextareaValue] = useState("");

    let [inputsErrorsArr, setInputsErrorsArr] = useState([]);
    let [isLoading, setLoading] = useState(false);

    let wrongInputsArr = inputsErrorsArr.map( errorObj => {
        return (
            <p key={errorObj.id}>{errorObj.input}: {errorObj.text}</p>
        );
    });

    let getDataForPost = () => {
        let obj = {}
        let allInputs = document.querySelectorAll("input");
        let textarea = document.querySelector("textarea");

        allInputs.forEach( input => obj[input.id] = input.value );
        obj[textarea.id] = textarea.value;

        return obj;
    } 

    let getResponseErrors = (errorBody) => {
        let arr = [];

        errorBody.forEach( (error, index) => {
            let errorObj = {
                id: index,
                text: error.errorText,
                input: "",
            };
            error.wrongInput === "nameInput" && (errorObj.input = "Поле имени");
            error.wrongInput === "emailInput" && (errorObj.input = "Поле почты");
            error.wrongInput === "telInput" && (errorObj.input = "Поле телефона");
            error.wrongInput === "birthdayInput" && (errorObj.input = "Поле даты рождения");
            error.wrongInput === "textarea" && (errorObj.input = "Поле сообщения");

            arr.push(errorObj);
        });

        return arr;
    }

    let resetForm = () => {
        setNameValue("");
        setEmailValue("");
        setTelValue("");
        setBirthdayValue("");
        setTextareaValue("");

        setTimeout( () => {
            alert("Форма успешно отправлена");
        }, 100);
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        let data = getDataForPost();

        let submit = async () => {
            let response = await dataProccessing(data);

            if(response.isSuccess){
                setInputsErrorsArr([]);
                resetForm();
            }else{
                let errorBody = JSON.parse(response.errorBody);
                let errorsArr = getResponseErrors(errorBody);
                setInputsErrorsArr(errorsArr);
            }

            setLoading(false);
        }
        
        submit();
    }

    return (
        <form onSubmit={handleSubmit}>
            {isLoading && <Loader />}
            <h1>Связь с нами</h1>
            <NameField nameValue={nameValue} setNameValue={setNameValue}/>
            <EmailField emailValue={emailValue} setEmailValue={setEmailValue}/>
            <TelField telValue={telValue} setTelValue={setTelValue}/>
            <BirthdayField birthdayValue={birthdayValue} setBirthdayValue={setBirthdayValue}/>
            <Textarea textareaValue={textareaValue} setTextareaValue={setTextareaValue}/>
            <div className="errorsBlock">
                {wrongInputsArr}
            </div>
            <button>Отправить</button>
        </form>
    );
}

export default Form;