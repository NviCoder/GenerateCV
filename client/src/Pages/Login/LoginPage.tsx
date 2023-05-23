import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Container, Title, Form, DocumentImg } from "./Login.styles";
const IMAGE_SOURCE = "https://cdn-icons-png.flaticon.com/512/3135/3135686.png";

const LoginPage = () => {
  return (
    <Container>
      <DocumentImg src={IMAGE_SOURCE} />
      <Title>Welcome Back</Title>
      <Form>
        <GoogleLogin
           onSuccess={(response: CredentialResponse) => {
            console.log(response);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </Form>
    </Container>
  );
};

export default LoginPage;
