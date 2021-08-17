import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import useSingleTrip from '../hooks/useSingleTrip';


function Discover({ data }){
    const [years] = useState(data.years);
    const [locations] = useState(data.locations);
    const [url, newTrip] = useSingleTrip({ year: '', location:''});
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);
    const [answer, setAnswer] = useState('');

    useEffect(()=>{
        if(years.length && locations.length){
            newQuestion();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const newQuestion = () => {
        const yearSet = [...new Set(years)];
        const locationSet = [...new Set(locations)];

        const randIndex = Math.floor(Math.random()*years.length);
        const randYear = years[randIndex];
        const randLocation = locations[randIndex];
        
        newTrip(randYear, randLocation);

        let arr, correctValue, q;
        if (Math.floor(Math.random()*2) === 0){
            arr = yearSet;
            correctValue = yearSet.indexOf(randYear);
            q = 'Where was this photo taken?';
        } else {
            arr = locationSet;
            correctValue = locationSet.indexOf(randLocation);
            q = 'What year was this photo taken?';
        }
        let indexSet = new Set();
        while (indexSet.size < 3) {
            let rand = Math.floor(Math.random()*arr.length);
            if(rand !== correctValue){
                indexSet.add(rand);    
            }
        }
        let newChoices =  [...indexSet];
        newChoices.splice(
                    Math.floor(Math.random()*indexSet.size),
                    0,
                    correctValue);
        setQuestion(q);
        setAnswer(arr[correctValue]);
        setChoices( newChoices.map(index => arr[index]) );
        
    }

    const checkAnswer = (e) => {
        const choice = e.target.innerHTML;
        if(choice === answer){
            e.target.style.backgroundColor = "blue";
        } else {
            e.target.style.backgroundColor = "red"; 
        }
    }

    return(
        <Container>
            <div>
                <Image src={url} alt={`${answer} vacation`} />
                <p>{question}</p>
            </div>
            <RadioContainer>
                {   (choices.length !== 0) &&
                    choices.map((choice, i) => {
                        return  <div key={i}>
                                    <Radio type="radio" id={choice} value={choice} name="question"/>
                                    <Label onClick={(e) => checkAnswer(e)} htmlFor={choice}>{choice}</Label>
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
`;

const Image = styled.img`
    width: 75%;
    object-fit: cover;
`;

const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    & input[type="radio"]:checked+label{
        background-color: #3a953b;
    }

`;

const Label = styled.label`
    display: block;
    border:3px solid green;
    border-radius: 5px;
    padding: 0.5em 1em;
    box-sizing: border-box;
    width: 140px;
    text-align:center;

    &:hover {
        background-color: #2fbb31;
    }
`;

const Radio = styled.input`
    display: none;

    &:checked {
    }
`;

export default Discover;