import React, {useState} from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import useSingleTrip from '../hooks/useSingleTrip';

function AlbumView({ match, history }) {
    const {location, year} = match.params;
    const [ urls ] = useSingleTrip(match.params);
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
            <div>
                { 
                    urls && urls.map((url, i) => <img key={i} src={url} onClick={(e) => showModal(e)} alt={`vacation at ${location} ${year}`}/>)
                }
            </div>
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

export default AlbumView;