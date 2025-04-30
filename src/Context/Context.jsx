import { createContext, useState } from "react" ;
import  { generateGeminiResponse } from "../config/Gemini";

export const Context = createContext();

const ContextProvider =(props)=>{

    const [input , setInput] = useState(""); //used to save the inp data
    const [recentPrompt , setRecentPrompt] = useState(""); //on clicking sent btn inp field data will stored in it and displayed
    const [prevPrompts , setPrevPrompts] = useState([]); //used to store all the inp history and display in recent history
    const [showResult , setShowResult] = useState(false); //if true then , hide the greet text and boxes and displayes the result
    const [loading , setLoading]= useState(false);//if true display loading animation and then data
    const [resultData , setResultData]=useState("");//used to display result on web page

    const delayPara=(index,nextWord)=>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const  onSent = async(prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let text;
        if(prompt!==undefined){
            text = await generateGeminiResponse(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev , input])
            setRecentPrompt(input)
            text= await generateGeminiResponse(input)
        }
        const responseArray = text.split("**");
        let newResponse ="";
        for(let i=0;i<responseArray.length;i++){
            if(i===0 || i%2 !==1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br/>");
        // setResultData(newResponse2);
        let newResponseArray = newResponse2.split(" ")
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord + " ")
        }
        setLoading(false)
        setInput("")

    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    // onSent("what is react")

    const contextValue={

        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider