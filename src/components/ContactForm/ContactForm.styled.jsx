import styled from 'styled-components';
import { Field } from 'formik';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding-bottom: 20px;
`;

export const Input = styled(Field)`
  /* color: #25242443; */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

export const ButtonAdd = styled.button`
  border-radius: 5px;

  cursor: pointer;
  :hover {
    background-color: rgb(85, 212, 176);
  }
  :active {
    transform: translateY(3px);
  }
`;
