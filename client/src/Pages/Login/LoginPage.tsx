import {
  Container,
  Title,
  Form,
  Input,
  SubmitButton,
  ForgotPassword,
  SignupLink,
  DocumentImg,
  SSOButton,
  GoogleButtonIcon
} from "./Login.styles";

const IMAGE_SOURCE = "https://cdn-icons-png.flaticon.com/512/3135/3135686.png";

const LoginPage = () => {
  return (
    <Container>
      <DocumentImg src={IMAGE_SOURCE} />
      <Title>Welcome Back</Title>
      <Form>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <SSOButton>
          <GoogleButtonIcon
            src={"https://cdn-icons-png.flaticon.com/512/300/300221.png"}
          />
          Sign in with Google
        </SSOButton>
        <SubmitButton>Sign In</SubmitButton>
        <ForgotPassword>Forgot Password?</ForgotPassword>
      </Form>
      <SignupLink>Don't have an account? Sign up</SignupLink>
    </Container>
  );
};

export default LoginPage;