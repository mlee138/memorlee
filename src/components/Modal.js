import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Modal({ url, closeModal }){

    return(
        <Container onClick={ closeModal }>
            <Image src={url}></Image>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: hsla(0, 0%, 0%, 0.85);
    z-index: 100;
`;

const Image = styled.img`
    width: 75%;
    height: 75%;
    object-fit: contain;

    @media screen and (max-width: 500px){
        width: 90%;
        height: 90%;    
    }
`;

Modal.propTypes = {
    url: PropTypes.string,
    closeModal: PropTypes.func
};

export default Modal;