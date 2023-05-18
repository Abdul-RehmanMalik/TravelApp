import Header from "../components/Header";
import Forgotpassword from "../components/Forgotpassword";
export default function ForgotPasswordPage() {
  return (
    <>
      {" "}
      <Header
        heading="Forgot your password?"
        paragraph="Don't worry! Just Enter your Email"
        linkName=""
        linkUrl=""
      />
      <Forgotpassword />
    </>
  );
}
