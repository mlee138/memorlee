import React from 'react';
import styled from 'styled-components';
import {Image} from 'cloudinary-react'

const Container = styled.div`
    padding: 2em 20%;
    display: flex;
`;

const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const Label = styled.label`
    border: 3px solid blue;
    border-radius: 5px;
    padding: 0.5em 1em;
    box-sizing: border-box;
`;

const Radio = styled.input`
`;

function Discover(){
    return(
        <Container>
            <Image publicId="sample" />
            <RadioContainer>
                <Label>FILL1
                    <Radio type="radio" value="FILL" name="question"/>
                </Label>

                <label>FILL2
                    <input type="radio" value="FILL" name="question"/>
                </label>
                
                <label>FILL3
                    <input type="radio" value="FILL" name="question"/>
                </label>

                <label>FILL4
                    <input type="radio" value="FILL" name="question"/>
                </label>
            </RadioContainer>
        </Container>
    );
}

export default Discover;