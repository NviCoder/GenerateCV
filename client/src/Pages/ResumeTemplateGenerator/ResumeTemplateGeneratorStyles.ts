import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 17%;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

export const TextArea = styled.textarea`
  width: 1038px;
  height: 576px;
  padding: 16px;
  font-size: 18px;
  border: 2px solid #d1d1d1;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: #f8f8f8;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover,
  &:focus {
    border-color: #4b6cb7;
    box-shadow: 0px 0px 8px rgba(75, 108, 183, 0.5);
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f8f8f8;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4b6cb7;
    border-radius: 6px;
    border: 3px solid #f8f8f8;
  }

  &::placeholder {
    color: #c2c2c2;
  }

  &:disabled,
  &[readonly] {
    background-color: #e5e5e5;
    color: #7f7f7f;
    border-color: #d1d1d1;
  }
`;