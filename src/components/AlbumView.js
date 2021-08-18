import React, {useState} from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import useFirestore from '../hooks/useFirestore';

function AlbumView({ match, history }) {
    const {location, year} = match.params;
    const [ docs ] = useFirestore(year, location);
    const [modalImg, setModalImg] = useState('');

    const handleBack = () => {
        history.goBack();
    }

    const showModal = (e) => {
        setModalImg(e.target.src);
    }

    const closeModal = () => {
        setModalImg('');
    }

    return (
        
        <Container>
            <Button onClick={handleBack}>&lt; Go back</Button>
            <h1>{location}</h1>
            <h2>{year}</h2>
            <ImageGrid>
                { 
                    docs.length !== 0 && docs[0].images.map((url, i) => {
                        return (
                            <ImageContainer key={i} >
                                <Image 
                                    src={url} 
                                    alt={`${location} ${year}`}
                                    onClick={showModal}/>
                            </ImageContainer>
                        )
                    })
                }
            </ImageGrid>
            { modalImg ? <Modal closeModal={closeModal} url={modalImg}/> : null }
        </Container>
    )
}

const Container = styled.div`
    padding: 2em 20%;
`

const Button = styled.button`
    background: rgba(255,255,255, 0);
    border: 3px solid var(--font-color);
    color: var(--font-color);
    margin-top: 2em;
    padding: 0.5em 1em;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover { 
        background: rgba(255,255,255, 0.1);
    }

    &:active {
        background: rgba(255,255,255, 0.25);
    }
`;

const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 2em;
`;

const ImageContainer = styled.div`
    width: 200px;
    height: 150px;
    background-color: black;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; 
    box-shadow: 4px 4px 4px hsl(240, 3%, 7%)
`;

export default AlbumView;