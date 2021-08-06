import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Modal from './Modal';

function AlbumView({ match, history }) {
    const {location, year} = match.params;
    useEffect(()=>{
        //fetchImages();
    }, []);

    const [images, setImages] = useState([]);
    const [modalImg, setModalImg] = useState('');

    const fetchImages = async () => {
        const res = await [];
        const data = await res.json();
        setImages(data);
        console.log(images);
    }

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
            <img onClick={(e) => showModal(e)} src="../images/home-background.jpg" alt="closeup on bees and violet flower"/>
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