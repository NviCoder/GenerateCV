import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const DocumentImg = styled.img`
  position: absolute;
  z-index: 0;
  opacity: 0.5;
  width: 10%;
  left: 15%;
  transform: translate(-50%, -50%);
  animation: ${fadeIn} 0.5s ease-in-out, ${bounce} 1s ease-in-out infinite;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: white;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

export const Input = styled.input`
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  border: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

export const SubmitButton = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
  background-color: #0070f3;
  color: white;
  border: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  margin-top: 2rem;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const ForgotPassword = styled.a`
  color: #0070f3;
  margin-top: 2rem;
  text-align: center;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0044ad;
  }
`;

export const SignupLink = styled.a`
  color: white;
  margin-top: 4rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #e6e6e6;
  }
`;

export const SSOButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  background-color: #fff;
  color: #737373;
  border-radius: 2px;
  border: 1px solid #737373;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const GoogleButtonIcon = styled.img`
  height: 24px;
  margin-right: 8px;
`;