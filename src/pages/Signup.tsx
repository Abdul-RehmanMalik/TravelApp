import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignUpPage() {
  return (
    <>
      {" "}
      <Header
        heading="Sign up to create an account"
        paragraph="Already Have an account?"
        linkName="login"
        linkUrl="/"
      />
      <Signup />
    </>
  );
}
