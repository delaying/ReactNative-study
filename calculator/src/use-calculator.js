import { useState } from "react";

// hook은 use라는 이름으로 시작해야함
export const useCalculator = () =>{
    const [input,setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result,setResult] = useState(null);
    const [tempInput,setTempInput] = useState(null);
    const [tempOpertor,setTempOperator] = useState(null);
    const [isClickedOperator, setIsClickedOperator] = useState(false);
    const [isClickedEqual,setIsClickedEqual] =useState(false);

    // const hasInput = input ? true : false;
    const hasInput = !!input;

    const onPressNum = (num) => {
        if(currentOperator && isClickedOperator){
            setResult(input);
            setInput(num);
            setIsClickedOperator(false);
        }else{
            const newInput = Number(`${input}${num}`);//맨앞의 0은 뜨지않아야하므로 다시 number로변환
            setInput(newInput);
        }
    }

    const onPressOperator = (operator) =>{
        if(operator !== "="){
            setCurrentOperator(operator);
            setIsClickedOperator(true);
            setIsClickedEqual(false);
        }else{
            let finalResult = result;
            const finalInput = isClickedEqual ? tempInput : input;
            const finalOperator = isClickedEqual ? tempOpertor : currentOperator;
            switch(finalOperator){
                case "+":
                    finalResult = result + finalInput;
                    break;
                case "-":
                    finalResult = result - finalInput;
                    break;
                case "*":
                    finalResult = result * finalInput;
                    break;
                case "/":
                    finalResult = result / finalInput;
                    break;
                default:
                    break;
            }
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(null);
            setTempOperator(finalOperator);
            setIsClickedEqual(true);
        }
    }

    const onPressReset = ()=>{
        if(hasInput){
            setInput(0);
        }else{
            setInput(0);
            setCurrentOperator(null);
            setResult(null);
            setTempInput(null);
            setTempOperator(null);
        }  
    }
    
    return{
        input,
        currentOperator,
        result,
        tempInput,
        tempOpertor,
        hasInput,
        onPressNum,
        onPressOperator,
        onPressReset,
    };
  
};