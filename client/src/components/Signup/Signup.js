import { Logo } from "../NavBar/NavBar";
import "./Signup.css";
import AuthCard from "../Auth/AuthCard";
import AuthForm from "../Auth/AuthForm";
import AuthFooter from "../Auth/AuthFooter";
import { signupFields } from "../../data/authFieldData";

export default function Signup() {
  return (
    <AuthCard>
      <Logo />
      <SignupHeader />
      <AuthForm formFields={signupFields} submitBtnText="Sign up" type="signup" message="Signup" />
      <AuthFooter type="signup" />
    </AuthCard>
  );
}

export function SignupHeader() {
  return (
    <header className="form-header">
      <p className="signup-title">Sign up</p>
      <p>Enter your credentials to access your account</p>
    </header>
  );
}
