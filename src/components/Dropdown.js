import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const SelectWrap = styled.div`
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    padding: 0.4em 0.9em;
    margin: 1em;
`

const Select = styled.select`
    border: none;
    padding: 0.2em;
    outline:none;
`

function Dropdown(props){
    let {name, options} = props;

    const handleChange = (e) =>{
        const value = e.target.value;
        //console.log(value);
        props.set(value);
    }

    return(
        <SelectWrap>
            <label>
                {`${name} |`}
                <Select onChange={e=>handleChange(e)}>
                    {
                        options.map((item, i) => {
                            return <option key={i} value={item}>{item}</option>
                        })
                    }
                </Select>
            </label>
        </SelectWrap>
    )
}

Dropdown.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array
};

export default Dropdown;