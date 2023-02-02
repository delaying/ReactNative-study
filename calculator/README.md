# 계산기
## 결과 화면 
<img src="https://user-images.githubusercontent.com/72879145/216340692-852fe86f-5d5a-4a77-9137-d7e75a820440.gif" width="200" height="400">


## 실행 
```
npx expo start
```
Expo Go 어플을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리
### Double exclamation `!!` 연산자
느낌표 2개를 연달아 사용하는 `!!` 연산자는 확실한 boolean결과(true 또는 false)를 얻기위해 사용한다.

기존의 느낌표 연산자`!`는 true를 false로, false를 true로 바꾸는 역할이었다면,

`!!`는 변수에 값이 존재할 경우(String, Number, Boolean 등)에는 true를 반환하고, undefined나 null값은 false값을 반환한다.


프로젝트에서 사용한 코드인데, 두 코드는 같은역할을 한다.
```
const hasInput = input ? true : false;
```
```
const hasInput = !!input;
```

### 인자없는 함수
```
onPress={()=>onPressReset()}
```
이처럼 인자를 받지 않는 함수는 다음처럼 간단하게 줄여서 작성할 수 있다.
```
onPress={onPressReset}
```

### 변수 -> String
변수를 화면에 출력하거나, String의 특성을 사용하고싶을 때는 String으로 변환이 필요하다.

두 가지 방법으로 변환이 가능하다.
- String(변수명)
- \`${변수명}\`


### Test 코드
개발에 필요한 state값들을 확인하기 위해 화면에 test코드를 작성하였다.
```
<Text>input:{input}</Text>
<Text>currentOperator:{currentOperator}</Text>
<Text>result:{result}</Text>
<Text>tempInput:{tempInput}</Text>
<Text>tempOpertor:{tempOpertor}</Text>
```

개발상황이 아닐 경우에는 화면에 이런 test코드는 보여지지 않아야하므로 `__DEV__`를 입력하여 개발환경에서만 출력되도록 설정하면된다.

앱 시뮬레이터나 usb로 연결한 기기일 경우 true값을 반환하고, 앱 번들로 제출한 배포버전에서는 false값을 반환한다.
```
{ __DEV__ && (
    <>
        <Text>input:{input}</Text>
        <Text>currentOperator:{currentOperator}</Text>
        <Text>result:{result}</Text>
        <Text>tempInput:{tempInput}</Text>
        <Text>tempOpertor:{tempOpertor}</Text>
    </>
)}
```


### Refactoring
- 반복되는 버튼 컴포넌트를 map을 사용하여 리팩토링
    - 기존 코드
    ```
    <ButtonContainer>
        <Button
            type="num"
            text="7"
            onPress={()=>null}
            flex={1}
            />
        <Button
            type="num"
            text="8"
            onPress={()=>null}
            flex={1}
            />
        <Button
            type="num"
            text="9"
            onPress={()=>null}
            flex={1}
            />
        <Button
            type="operator"
            text="X"
            onPress={()=>null}
            flex={1}
            />
    </ButtonContainer>
    ```
    - 리팩토링 후 코드
    ```
    <ButtonContainer>
        {[7,8,9].map((num)=>(
            <Button
            type="num"
            text={`${num}`}
            onPress={()=>null}
            flex={1}
            />
        ))}
        <Button
            type="operator"
            text="X"
            onPress={()=>null}
            flex={1}
            />
    </ButtonContainer>
    ```

- 커스텀 Hook을 만들어 화면뷰와 기능구현함수들을 분리하여 가독성을 높혔다. 
    - 기존 코드는 화면구현과 기능구현을 한 파일 내에서 진행했었다.
    ```
    export default () => {
    const [input,setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result,setResult] = useState(null);
    
    [ ...생략 ]

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

    return (
        <View style={{flex:1, width:250, justifyContent:"center"}}>
            <Text>input:{input}</Text>
            <Text>currentOperator:{currentOperator}</Text>
            <Text>result:{result}</Text>
            <Text>tempInput:{tempInput}</Text>
            <Text>tempOpertor:{tempOpertor}</Text>
        {/* 결과 */}
        <InputContainer>
            <Text style={{color:"white", fontSize:35, textAlign:"right"}}>{input}</Text>
        </InputContainer>

        {/* [AC ~ /] */}
        [ ...생략 ]
        </View>
    )
    }
    ```

    - 리팩토링 후 코드
    외부에서 필요한 변수와 함수들만 return해준다.
    ```
    //use-calculator.js
    export const useCalculator = () =>{
        const [input,setInput] = useState(0);

        [ ...생략 ]

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
    ```

    커스텀 Hook인 useCalculator를 가져와서 구조분해할당하여 사용하면된다.
    ```
    //Calculator.js
    import { useCalculator } from './use-calculator';

    export default () => {
        const {
            input,
            currentOperator,
            result,
            tempInput,
            tempOpertor,
            hasInput,
            onPressNum,
            onPressOperator,
            onPressReset,
        } = useCalculator();
        
    return (
        <View style={{flex:1, width:250, justifyContent:"center"}}>
            <ButtonContainer>

            [ ...생략 ]
            </ButtonContainer>
        </View>
    )
    }
    ```