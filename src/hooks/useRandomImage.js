import React, { useState, useEffect } from 'react';

function useRandomImage(){
    const [randImg,setRandImg] = useState('');

    useEffect(() => {
        //get random image here
    }, []);

    return randImg;
}

