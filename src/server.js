import getErrorsAfterSubmit from "./validators/getErrorsAfterSubmit";

//Here is server emulatuin
let dataProccessing = (data) => {
    let request = new Promise( (res, rej) => {
        let dataObjKeys = Object.keys(data);
        let errorsArr = [];
        dataObjKeys.forEach( key => {
            let inputValue = data[key];
            let error = getErrorsAfterSubmit(inputValue, key);

            error && errorsArr.push({
                wrongInput: key,
                errorText: error,
            });
        });

        setTimeout( () => {
            let response = {};

            if(errorsArr.length > 0){
                response = {
                    isSuccess: false,
                    error: "There are incorrect datas",
                    errorBody: JSON.stringify(errorsArr),
                }
            }else response = { 
                isSuccess: true,
                success: "Datas are accepted successful"
            };
            
            res(response);
        }, 2000);
    });

    return request;
}

export default dataProccessing;