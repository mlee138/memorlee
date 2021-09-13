import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import Dropdown from './Dropdown';
import uploadImages from '../helper/uploadImages';

function UploadForm({data}){
    const { locations } = data;
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const types = ['image/png', 'image/jpeg', 'image/webp']

    const handleFiles =(e)=>{
        const selected = e.target.files;
        for(let i=0; i<selected.length; i++){
            if(!types.includes(selected[i].type)){
                setFiles(null);
                setError("Please enter a valid image file (png, jpeg, webp)");
                return false;
            }
        }
        setFiles(selected);
        setError(null);
    }

    const handleSubmit =async(e)=> {
        e.preventDefault();
        console.log("submitting");
        setMessage('');
        setUploading(true);
        try{
            let res = await uploadImages(files, year, location);
            console.log(res);
            setYear('');
            setError('');
            setLocation('');
            setFiles(null);
            setMessage('Successfully uploaded!');
            setUploading(false);
        } catch (err) {
            setMessage(`Error uploading files - ${err}`);
            setUploading(false);
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            
            <h1>Upload New Pictures</h1>
            <input type="file" multiple onChange={handleFiles}/>
            <Subtext>{error}</Subtext>
            <Section>
                <H2>Enter the Trip Location</H2>
                <Subtext>Choose from existing locations or type in a new one</Subtext>
                <Dropdown name="location" options={locations} set={setLocation}/>
                <Separator>or</Separator>
                <TextInput 
                    type="text" 
                    onChange={(e)=>setLocation(e.target.value)}
                    value={location}
                    />
            </Section>
            <Section>
                <H2>Enter the Year</H2>
                <TextInput 
                    type="number" 
                    onChange={(e)=>setYear(e.target.value)}
                    value={year}
                    />
            </Section>
            <Submit 
                className={uploading ? 'uploading' : null}
                type="submit" 
                value="Upload Images"
                disabled={error || 
                          !files || 
                          !year ||
                          !location ||
                          uploading ? true : false}/>
            <Subtext>{message}</Subtext>
        </Form>
    );
}

const uploadingAnimation = keyframes `
    0% {background-position: 0% 50%}
    100% {background-position: 100% 50%}
`;

const Form = styled.form`
    padding: 5em 20%;

    & .uploading {
        background: linear-gradient(90deg, #dde7e9, skyBlue, #dde7e9, skyBlue, #dde7e9, #3ae9b7);
        background-size: 500% 500%;
        animation: ${uploadingAnimation} 1s linear infinite;
    }
`;

const Section = styled.section`
    background-color: white;
    padding: 2rem 1rem;
    margin: 1rem 0rem;
    border-radius: 10px;
`;

const H2 = styled.h2`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const Subtext = styled.small`
    display: block;
    margin: 0.5rem 0;
    font-style: italic;
`;

const Separator = styled.span`
    margin-right: 1rem;
`;

const TextInput = styled.input`
    padding: 0.5rem 0.75rem; 
`;

const Submit = styled.input`
    padding: 1rem 2rem;
    font-family: var(--font);
    background-color: skyBlue;
`;


export default UploadForm;