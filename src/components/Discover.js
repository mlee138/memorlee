import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import useSingleTrip from '../hooks/useSingleTrip';


function Discover({ data }){
    const { years, locations } = data;
    const randNum = Math.floor(Math.random()*years.length);
    const randYear = years[randNum];
    const randLocation = years[randLocation];
    const [ urls ] = useSingleTrip({
                                        year: randYear, 
                                        location: randLocation
                                    });
    const [choices, setChoices] = useState([]);
    //const [answer, setAnswer] = useState();

    useEffect(()=>{
        newQuestion(randYear, randLocation);
    },[])

    const newQuestion = (year, location) => {
        //ADD CODE TO SPLICE IN THE CORRECT ANSWER
        let rand = Math.floor(Math.random()*2)
        let arr, correctValue;
        if (rand === 0){
            arr = years;
            correctValue = year;
        } else {
            arr = locations;
            correctValue = location;
        }
        let indexArr = [];
        while (indexArr.length < 3) {
            rand = Math.floor(Math.random()*(arr.length-1));
            if (indexArr.indexOf(rand) === -1)
                indexArr.push(rand);
        }
        setChoices( indexArr.map(index => arr[index]) );
        
    }

    const checkAnswer = (e) => {
        const choice = e.target.innerHTML;
        console.log(choice);
    }

    return(
        <Container>
            <div>
                <Image publicId="sample" />
                <p>What year is this from?</p>
            </div>
            <RadioContainer>
                {
                    choices.map((choice, i) => {
                        return  <div>
                                    <Radio type="radio" id={choice} value="choice" name="question"/>
                                    <Label onClick={(e) => checkAnswer(e)} key={i} for={choice}>{choice}</Label>
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
`;

const Radio = styled.input`
    display: none;

    &:checked {
    }
`;

export default Discover;