import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import CryptoJS from 'crypto-js';
import Dropdown from './Dropdown';
import uploadImage from '../helper/uploadImage';

function UploadForm({data}){
    const { locations } = data;
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');

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

    const checkPassword =()=>{
        const cipher = 'U2FsdGVkX18Sx0SN5+2cc42JZSv/9sLCk2tx2dh1B4E='; 
        try{
            let decipher = CryptoJS.AES.decrypt(cipher, key);
            decipher = decipher.toString(CryptoJS.enc.Utf8);
            if(decipher === "UPLOAD_UNLOCKED"){
                return true;
            } else {
                setMessage('password incorrect');
                return false;
            }
        } catch(error) {
            console.log(error);
            setMessage('password incorrect');
            return false;
        }
        
    }

    const handleSubmit =async(e)=> {
        e.preventDefault();
        if(checkPassword()){
            console.log("submitting");
            setMessage('');
            setUploading(true);
            
            try{
                for(let i=0; i<files.length; i++){
                    let res = await uploadImage(files[i], year, location);
                    console.log(res);
                    setMessage((prev) => `${prev}\n${res}`);
                }
                setYear('');
                setError('');
                setLocation('');
                setFiles(null);
                setMessage('All Images Successfully uploaded!');
                setUploading(false);
            } catch (err) {
                setMessage(`Error uploading files - ${err}`);
                setUploading(false);
            }
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            
            <h1>Upload New Pictures</h1>
            <input type="file" multiple onChange={handleFiles}/>
            <Subtext>{error}</Subtext>
            <Section>
                <Number>1</Number>
                <H2>Enter the Trip Location</H2>
                
                <Subtext>Choose from existing locations or type in a new one</Subtext>
                <Dropdown name="location" options={locations} set={setLocation}/>
                <Separator>or</Separator>
                <Input 
                    type="text" 
                    onChange={(e)=>setLocation(e.target.value)}
                    value={location}
                    disabled={uploading ? true : false}/>
            </Section>
            <Section>
                <Number>2</Number>
                <H2>Enter the Year</H2>
                
                <Input 
                    type="number" 
                    onChange={(e)=>setYear(e.target.value)}
                    value={year}
                    disabled={uploading ? true : false}/>
            </Section>
            <Section>
            <Number>3</Number>
                <H2>Upload Password</H2>
                <Subtext>You must enter the secret password to upload files</Subtext>
                <Input 
                    type="password"
                    onChange={(e)=>setKey(e.target.value)}
                    value={key}/>
            </Section>
            
            <Submit 
                className={uploading ? 'uploading' : null}
                type="submit" 
                value="Upload Images"
                disabled={error || 
                          !files || 
                          !year ||
                          !location ||
                          !key ||
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
        background: linear-gradient(90deg, #dde7e9, #4ba3de, #dde7e9, #4ba3de, #dde7e9, #4ba3de);
        background-size: 500% 500%;
        animation: ${uploadingAnimation} 1s linear infinite;
    }

    @media screen and (max-width: 500px){
        padding: 5em 1rem;
    }
`;

const Section = styled.section`
    position: relative;
    background-color: hsla(0, 0%, 100%, 0.75);
    padding: 2rem 1rem;
    margin: 1rem 0rem;
    border-radius: 10px;
    overflow: hidden;
`;

const Number = styled.div`
    position: absolute;
    top: -1rem;
    right: 0;
    font-size: 7em;
    font-family: arial;
    font-weight: bold;
    color: hsla(42, 60%, 91%, 0.5);
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

    @media screen and (max-width: 500px){
        display: block;
        margin-bottom: 1rem;

        
    }
`;

const Input = styled.input`
    padding: 0.5rem 0.75rem; 
`;

const Submit = styled.input`
    display: block;
    padding: 1rem 2rem;
    font-family: var(--font);
    background-color: #4ba3de;
`;


export default UploadForm;