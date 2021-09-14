import React from 'react';
import styled from 'styled-components';
import ImageGrid from './ImageGrid';

function AlbumView({ match, history }) {
    const {location, year} = match.params;

    const handleBack = () => {
        console.log("back btn clicked")
        history.goBack();
    }

    return (
        
        <Container>
            <Button onTouchStart={handleBack} onClick={handleBack}>&lt; Back</Button>
            <h1>{location}</h1>
            <h2>{year}</h2>
            <ImageGrid year={year} location={location}/>
        </Container>
    )
}

const Container = styled.div`
    padding: 2em 20%;
    text-align: center;
    position: relative;
    font-size: 1.5em;
    @media screen and (max-width: 500px){
        padding: 4em 15px;
        font-size: 1em;
    }

    & h1 {
        margin-bottom: 0;
    }

    & h2 {
        margin-top: 0;
        font-style: italic;
        opacity: 0.75;
    }
`

const Button = styled.button`
    background: rgba(255,255,255, 0);
    border: 3px solid var(--font-color);
    color: var(--font-color);
    margin-top: 2em;
    padding: 0.5em 1em;
    font-size: 1rem;
    cursor: pointer;
    &:hover { 
        background: rgba(255,255,255, 0.5);
    }
    &:active {
        background: rgba(255,255,255, 0.75);
    }
`;



export default AlbumView;