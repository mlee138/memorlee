import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectWrap = styled.div`
    display: inline-block;
    border: 3px solid #afba4c;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 0 0.9em;
    margin: 1em;
    cursor: pointer;
    background-color: var(--btn-color);
    color: black;
`

const Label = styled.label`
    cursor: inherit;
`

const Select = styled.select`
    background-color: var(--btn-color);
    border: none;
    padding: 0.6em 0.4em;
    cursor: inherit;
    outline: none;
`

function Dropdown({name, options, set}){
    const optionsSet = [...new Set(options)].sort();

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
                    <option value=""></option>
                    {
                        optionsSet.map((item, i) => {
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