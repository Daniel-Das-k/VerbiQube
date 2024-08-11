import React from 'react'
import { useContext } from 'react';
import styled from 'styled-components'
import { Context } from '../context/Context';
const InputBox = styled.input`
  padding: 1rem;
  width: 50%;
  border-radius: 30px;
  margin: 2rem 1rem;
  background: #424242;
  color: #fff;
  border: none;
  outline: none;
  box-shadow: 0 0 4px 4px #424242;
`;

const Input = ({type,placeholder,name,style,value,onChange,onKeyPress}) => {
  return (
    <InputBox
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        style={style}
         // Align input field to the right
          />
  )
}

export default Input;
