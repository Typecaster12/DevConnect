import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, Eye, EyeOff, LoaderCircle } from "lucide-react";

import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const emptyRegistration = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

const Login = () => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [registrationDetails, setRegistrationDetails] = useState(emptyRegistration);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isRegistration = mode === "register";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setShowPassword(false);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((current) => ({ ...current, [name]: value }));
  };

  const handleRegistrationChange = (event) => {
    const { name, value } = event.target;
    setRegistrationDetails((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (isRegistration) {
        await register(
          registrationDetails.firstName.trim(),
          registrationDetails.lastName.trim(),
          registrationDetails.username.trim(),
          registrationDetails.email.trim(),
          registrationDetails.password,
        );
        setRegistrationDetails(emptyRegistration);
        setSuccess("Your account has been created. Sign in to continue.");
        setMode("login");
      } else {
        await login(loginDetails.email.trim(), loginDetails.password);
        navigate("/", { replace: true });
      }
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-muted/40 px-4 py-10">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="items-center text-center">
          <Link to="/" className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Code2 className="size-6 text-blue-600" />
            <span>DevConnect</span>
          </Link>
          <CardTitle className="text-2xl">{isRegistration ? "Create your account" : "Welcome back"}</CardTitle>
          <CardDescription>
            {isRegistration ? "Join a community built for developers." : "Sign in to continue to DevConnect."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 grid grid-cols-2 rounded-lg bg-muted p-1">
            <Button type="button" variant={isRegistration ? "ghost" : "secondary"} onClick={() => switchMode("login")}>Sign in</Button>
            <Button type="button" variant={isRegistration ? "secondary" : "ghost"} onClick={() => switchMode("register")}>Create account</Button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegistration && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" name="firstName" value={registrationDetails.firstName} onChange={handleRegistrationChange} autoComplete="given-name" />
                  <Field label="Last name" name="lastName" value={registrationDetails.lastName} onChange={handleRegistrationChange} autoComplete="family-name" />
                </div>
                <Field label="Username" name="username" value={registrationDetails.username} onChange={handleRegistrationChange} autoComplete="username" />
              </>
            )}

            <Field label="Email" name="email" type="email" value={isRegistration ? registrationDetails.email : loginDetails.email} onChange={isRegistration ? handleRegistrationChange : handleLoginChange} autoComplete="email" />

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} required minLength={6} value={isRegistration ? registrationDetails.password : loginDetails.password} onChange={isRegistration ? handleRegistrationChange : handleLoginChange} autoComplete={isRegistration ? "new-password" : "current-password"} className="pr-10" />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
            {success && <p className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400" role="status">{success}</p>}

            <Button className="w-full" size="lg" type="submit" disabled={submitting}>
              {submitting && <LoaderCircle className="animate-spin" />}
              {submitting ? "Please wait..." : isRegistration ? "Create account" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

const Field = ({ label, name, type = "text", ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium" htmlFor={name}>{label}</label>
    <Input id={name} name={name} type={type} required {...props} />
  </div>
);

export default Login;
