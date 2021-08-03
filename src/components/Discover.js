import React from 'react';
import styled from 'styled-components';
import {Image} from 'cloudinary-react'

const Container = styled.div`
    padding: 2em 20%;
`;

const RadioContainer = styled.div`
    display: grid;
    grid-template-areas: 
    'btn1 ... btn2'
    'btn3 ... btn4';
    grid-template-columns: 1fr 0.5fr 1fr;
`;

function Discover(){
    return(
        <Container>
            <Image publicId="sample" />
            <div>

            </div>
        </Container>
    );
}

export default Discover;