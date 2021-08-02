import React, {useState, useEffect} from 'react';

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
        <div>
            <h1>{location}</h1>
            <h2>{year}</h2>
        </div>
    )
}

export default AlbumView;