import { Container, Title, Form, DocumentImg } from "./Login.styles";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const IMAGE_SOURCE = "https://cdn-icons-png.flaticon.com/512/3135/3135686.png";

const LoginPage = () => {

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/v1/auth/google`, {
        method: "POST",
        body: JSON.stringify({
        token: credentialResponse.credential
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
  }

  return (
    <Container>
      <DocumentImg src={IMAGE_SOURCE} />
      <Title>Welcome Back</Title>
      <Form>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </Form>
    </Container>
  );
};

export default LoginPage;
