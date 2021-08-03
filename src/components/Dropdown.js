import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectWrap = styled.div`
    display: inline-block;
    border: 3px solid #87de9e;
    border-radius: 20px;
    padding: 0 0.9em;
    margin: 1em;
    cursor: pointer;
    background-color: #87de9e;
    color: black;
`

const Label = styled.label`
    cursor: inherit;
`

const Select = styled.select`
    background-color: #87de9e;
    border: none;
    padding: 0.6em 0.4em;
    cursor: inherit;
`

function Dropdown({name, options, set}){

    const handleChange = (e) =>{
        const value = e.target.value;
        //console.log(value);
        set(value);
    }

    return(
        <SelectWrap>
            <Label>
                {`${name} |`}
                <Select  onChange={e=>handleChange(e)}>
                    {
                        options.map((item, i) => {
                            return <option key={i} value={item}>{item}</option>
                        })
                    }
                </Select>
            </Label>
        </SelectWrap>
    )
}

Dropdown.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array
};

export default Dropdown;