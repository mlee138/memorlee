import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import useRandomImage from '../hooks/useRandomImage';
import { fadeIn } from '../animations/fade';
import { loadingTurn } from '../animations/loading';
import { cloudinaryFileName } from '../helper/format';

function Discover({ data }){
    const {years, locations} = data;
    const [name, loading, newTrip] = useRandomImage({ year: '', location:''});
    const [prompt, setPrompt] = useState('');
    const [choices, setChoices] = useState([]);
    const [answer, setAnswer] = useState('');
    const [userChoice, setUserChoice] = useState('');
    const [year, setYear] = useState();
    const [location, setLocation] = useState('');
    const radiosRef = useRef(null);
    const promptRef = useRef(null);

    useEffect(()=>{
        if(years && locations){
            newQuestion();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const resetButtons = () => {
        setUserChoice('');
        promptRef.current.style.backgroundColor = "#b7bb8f";
        const radios = radiosRef.current.children;
        for(let i=0; i<radios.length; i++){
            radios[i].children[1].style.backgroundColor = "#dee0cc";
        }
    }

    const newQuestion = () => {
        resetButtons();
        //remove duplicates from years and locations for later use
        const yearSet = [...new Set(years)];
        const locationSet = [...new Set(locations)];
        //get a random trip
        const randIndex = Math.floor(Math.random()*years.length);
        const randYear = years[randIndex];
        const randLocation = locations[randIndex];
        setYear(randYear);
        setLocation(randLocation);
        newTrip(randYear, randLocation);
        
        let arr, correctValue, q;
        //choose a year or location question
        if (Math.floor(Math.random()*2) === 0){
            arr = yearSet;
            correctValue = yearSet.indexOf(randYear);
            q = 'What year was this photo taken?';
        } else {
            arr = locationSet;
            correctValue = locationSet.indexOf(randLocation);
            q = 'Where was this photo taken?';
            
        }
        
        //retrieve random question choices
        let indexSet = new Set();
        while (indexSet.size < 3) {
            let rand = Math.floor(Math.random()*arr.length);
            if(rand !== correctValue){
                indexSet.add(rand);    
            }
        }
        
        //randomly insert correct answer into choices
        let newChoices =  [...indexSet];
        newChoices.splice(
                    Math.floor(Math.random()*indexSet.size),
                    0,
                    correctValue);
        //set all values
        setUserChoice('');
        setPrompt(q);
        setAnswer(arr[correctValue]);
        setChoices( newChoices.map(index => arr[index]) );
        
    }

    const checkAnswer = (e) => {
        let { value }= e.target;
        //console.log(e);
        if(value === answer){
            //e.target.style.backgroundColor = "hsl(107, 74%, 71%)";
            promptRef.current.style.backgroundColor = "#93c993";
            setUserChoice("correct");
            setPrompt(`${answer} was correct! Play again?`)
        } else {
            //e.target.style.backgroundColor = "hsl(0, 74%, 62%)"; 
            promptRef.current.style.backgroundColor = "#fe7f7f";
            setUserChoice("incorrect");
            setPrompt(`Incorrect, it was ${answer}! Play again?`)
        }
        e.target.checked = false;
        
    }

    const radioPressed = (e) => {
        e.target.style.backgroundColor = "#b1b3a2";
    }
//
    return(
        <Container>
            <QuestionContainer>
                <ImageContainer>
                    {
                        loading ?
                        <Loading></Loading>
                        :
                        <Image src={cloudinaryFileName(year, location, name)} alt={`${answer} vacation`} />
                    }
                    
                </ImageContainer>
                <Prompt ref={promptRef}>
                    <p>{prompt}</p>
                    <Button 
                        className={userChoice ? null : "hide" }
                        onClick={newQuestion}>
                        Next
                    </Button>
                </Prompt>
            </QuestionContainer>
            <RadioContainer ref={radiosRef}>
                {   (choices.length !== 0) &&
                    choices.map((choice, i) => {
                        return  <div key={i}>
                                    <Label 
                                        htmlFor={choice} 
                                        onClick={(e) => radioPressed(e)}>
                                            {choice}
                                    </Label>
                                    <Radio 
                                        type="radio"
                                        id={choice} 
                                        value={choice} 
                                        name="choices"
                                        disabled={userChoice ? true : false}
                                        onChange={(e) => checkAnswer(e)}/>
                                </div>
                    })
                }
            </RadioContainer>
        </Container>
    );
}


const Container = styled.div`
    padding: 5em 20%;
    display: flex;
    justify-content: space-between;
    
    @media screen and (max-width: 500px){
        flex-direction: column;
        justify-content: space-between;
        padding: 4em 0;
    }
    
    .hide {
        display: none;
    }
    
    .correct {
        background-color: green;
    }
    
    .incorrect {
        background-color: red;
    }
    
    input[type="radio"]:checked+label{
        background-color: #3a953b;
        font-weight: bold;
    }
`;

const QuestionContainer = styled.div`
    width: 100%;
    min-height: 300px;
    margin-right: 40px;
    box-shadow: var(--shadow);
    @media screen and (max-width: 500px){
        width: 100%;
        max-height: 50%;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    background-color: #1c1c1c;
    width: 100%;
    height: 85%;
    box-shadow: inset 7px 7px 10px #181818,
            inset -7px -7px 10px #202020;
`;

const Loading = styled.div`
    height: 50px;
    width: 50px;
    border: 10px solid darkgrey;
    border-right-color: grey;
    border-radius: 50%;
    margin: 2em;
    animation-name: ${loadingTurn};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`;

const Prompt = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-height: 15%;
    padding: 1rem 2rem;
    box-sizing: border-box;
    background-color: #b7bb8f;
    font-size: 1.5rem;
    @media screen and (max-width: 500px){
        font-size: 1rem;
    }
`;

const Image = styled.img`
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    animation-name: ${fadeIn};
    animation-duration: 2s;
    animation-fill-mode: forwards;
`;

const Button = styled.button`
    padding: 0.7rem 1rem;
    box-sizing: border-box;
    background-color: hsla(0, 0%, 100%, 0.65);
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    &:hover {
        background-color: hsla(0, 0%, 100%, 0.7);
    }
    &:active {
        background-color: hsla(0, 0%, 100%, 0.8);
    }
`;

const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    & input[type="radio"]:checked+label{
        background-color: #3a953b;
        font-weight: bold;
    }
    @media screen and (max-width: 500px){
        display: grid;
        justify-content: center;
        align-content: center;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 80px);
    }
`;

const Label = styled.label`
    display: block;
    box-shadow: 2px 2px 4px #828282;
    background-color: hsl(66, 24%, 84%);
    border-radius: 5px;
    padding: 0.5em 1em;
    box-sizing: border-box;
    width: 140px;
    text-align:center;
    color: black;

    &:hover {
        background-color: hsl(66, 24%, 75%);
    }

    &:active {
        background-color: hsl(66, 40%, 70%);
    }

    @media screen and (max-width: 500px){
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
`;

const Radio = styled.input`
    display: none;
`;

export default Discover;