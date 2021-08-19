import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from './Modal';
import useFirestore from '../hooks/useFirestore';

function ImageGrid({ year, location }) {
    const ImagesPerPage = 10;
    const [ docs ] = useFirestore(year, location);
    const [modalImg, setModalImg] = useState('');
    const [ range, setRange ] = useState({start:0, end: ImagesPerPage});
    const [ numButtons, setNumButtons ] = useState(0);
    const [ selected, setSelected ] = useState(0);

    const showModal = (e) => {
        setModalImg(e.target.src);
    }

    const closeModal = () => {
        setModalImg('');
    }

    const handleClick = (index) => {
        const startIndex = index * ImagesPerPage;
        const finalIndex = startIndex + ImagesPerPage;
        setRange({start: startIndex, end: finalIndex});
        setSelected(index);
    }

    useEffect(() => {
        if(Object.entries(docs).length !== 0){
            const maxBtns = Math.ceil(docs[0].images.length / ImagesPerPage);
            if(maxBtns !== numButtons){ setNumButtons(maxBtns); }
        }
    }, [docs,range, numButtons])

    return (
        <div>
            <ButtonsContainer>
                {
                    numButtons && 
                    [...Array(numButtons).keys()].map(item => <button className={item === selected ? "selected" : null } onClick={()=>handleClick(item)} key={item}>{item+1}</button>)
                }
            </ButtonsContainer>
            <Grid>
                { 
                    docs.length !== 0 && docs[0].images.slice(range.start, range.end).map((url, i) => {
                        return (
                            <ImageContainer key={i} >
                                <Image 
                                    src={url} 
                                    alt={`${location} ${year}`}
                                    onClick={showModal}
                                    loading="lazy"/>
                            </ImageContainer>
                        )
                    })
                }
            </Grid>
            { modalImg ? <Modal closeModal={closeModal} url={modalImg}/> : null }

        </div>
    )
}

ImageGrid.propTypes = {
    year: PropTypes.string,
    location: PropTypes.string,
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 2em;
    @media screen and (max-width: 500px){
        grid-gap: 0.5em;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
    }
`;

const ButtonsContainer = styled.div`
    margin-bottom: 0.5em;
    & button {
        padding: 0.5em 1em;
        font-family: var(--font);
    }
    & .selected {
        background-color: #009688;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; 
    box-shadow: var(--shadow);
`;

export default ImageGrid;