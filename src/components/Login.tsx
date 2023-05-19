import { useState, FormEvent } from "react";
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import apiInstance from "../axios";
import SuccessSnackbar from "./SuccessResponseSnackbar";
import FailureSnackbar from "./FailureResponseSnackbar";
const fields = loginFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  const [response, setResponse] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authenticateUser();
  };

  //console.log(loginState);
  const loginReqData = {
    email: loginState.email,
    password: loginState.password,
  };
  //console.log(loginReqData);
  const authenticateUser = async () => {
    try {
      //console.log("called");
      const response = await apiInstance.post("/auth/login", loginReqData);
      setResponse(response.data);
      setIsSuccess(true);
    } catch (error: any) {
      const errorMessage = error.response?.data || "Something went wrong";
      setResponse(errorMessage);
      setIsSuccess(false);
      console.log(error);
    } finally {
      setShowSnackbar(true);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            customClass=" "
          />
        ))}
      </div>

      {showSnackbar && isSuccess && (
        <SuccessSnackbar
          message={response}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      {showSnackbar && !isSuccess && (
        <FailureSnackbar
          message={response}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
};

export default Login;
