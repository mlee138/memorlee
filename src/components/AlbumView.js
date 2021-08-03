import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 2em 20%;
`

function AlbumView({ match }) {
    const {location, year} = match.params;
    useEffect(()=>{
        //fetchImages();
    }, []);

    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        const res = await [];
        const data = await res.json();
        setImages(data);
        console.log(images);
    }

    return (
        <Container>
            <h1>{location}</h1>
            <h2>{year}</h2>
        </Container>
    )
}

export default AlbumView;