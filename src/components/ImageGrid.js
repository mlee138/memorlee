import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from './Modal';
import useFirestore from '../hooks/useFirestore';
import backfillFileNames from '../firebase/backfill';

function ImageGrid({ year, location }) {
    const ImagesPerPage = 10;
    const [ urls ] = useFirestore(year, location);
    const [modalImg, setModalImg] = useState('');
    const [ range, setRange ] = useState(ImagesPerPage);

    useEffect(() => {
        if(urls.length) backfillFileNames(year, location);
    }, [urls]);

    const showModal = (e) => {
        setModalImg(e.target.src);
    }

    const closeModal = () => {
        setModalImg('');
    }

    return (
        <div>
            <Grid>
                { 
                    urls.length !== 0 && urls.slice(0, range).map((url, i) => {
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
            {
                (range < urls.length) ? 
                    <Button onClick={()=>setRange((prev)=>prev+ImagesPerPage)}>Load More</Button>
                    :
                    <p>End of Album</p>
            }
            
           
            
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
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    min-height: 150px;
    background-color: black;

    @media screen and (max-width: 500px){
        min-height: 80px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; 
    box-shadow: var(--shadow);
`;

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

export default ImageGrid;