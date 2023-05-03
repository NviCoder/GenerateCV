import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const SpinnerWrapper = styled.div<{ backgroundColor?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.backgroundColor || 'rgba(0, 0, 0, 0.6)'};
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.backgroundColor ? '1' : '0.8')};
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div<{ size?: number; color?: string }>`
  border-radius: 50%;
  width: ${(props) => props.size || 40}px;
  height: ${(props) => props.size || 40}px;
  border: 3px solid ${(props) => props.color || '#fff'};
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;

const Spinner: React.FC<SpinnerProps> = ({
  size,
  color,
  backgroundColor,
}: SpinnerProps) => (
  <SpinnerWrapper backgroundColor={backgroundColor}>
    <SpinnerContainer size={size} color={color} />
  </SpinnerWrapper>
);

export default Spinner;
