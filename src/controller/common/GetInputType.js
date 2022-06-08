import { InputBoolean ,
         InputNumber  , 
         InputSelect  , 
         InputString  , 
         InputTextArea } from "../../view/common/InputType"


export function GetInputType(type) {
    let InputType

    if (type === "boolean") {
        InputType =  InputBoolean
    }
    else if (type === "number") {
        InputType = InputNumber
    }
    else if (type === "string") {
        InputType = InputString
    }
    else if (type === "textArea") {
        InputType = InputTextArea
    }
    else if (type === "object") {
        InputType = InputSelect
    }

    return InputType

}