import React, {useState} from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';

function UploadForm({data}){
    const { years, locations } = data;
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');

    return(
        <Form>
            <h1>Upload New Pictures</h1>
            <input type="file" multiple/>
            <Section>
                <H2>Enter the Trip Location</H2>
                <p>Choose from existing locations or type in a new one</p>
                <Dropdown name="location" options={locations} set={setLocation}/>
                <span>or</span>
                <TextInput 
                    type="text" 
                    onChange={(e)=>setLocation(e.target.value)}
                    value={location}
                    />
            </Section>
            <Section>
                <H2>Enter the Year</H2>
                <TextInput 
                    type="text" 
                    onChange={(e)=>setYear(e.target.value)}
                    value={year}
                    />
            </Section>
            <Submit type="submit" value="Upload Images"/>
        </Form>
    );
}

const Form = styled.form`
    padding: 5em 20%;
`;

const Section = styled.section`
    background-color: white;
    padding: 2rem 1rem;
    margin: 1rem 0rem;
    border-radius: 10px;
`;

const H2 = styled.h2`
    margin: 0;
`;

const TextInput = styled.input`

`;

const Submit = styled.input`
    padding: 1rem 2rem;
    font-family: var(--font);
    background-color: skyBlue;
`;

export default UploadForm;