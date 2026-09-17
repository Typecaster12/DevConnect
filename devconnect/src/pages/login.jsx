import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Code2, Copy, Eye, EyeOff, LockKeyhole, LogIn, Mail, Menu, Search, Users } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

const emptyRegistration = { firstName: "", lastName: "", username: "", email: "", password: "" };
const features = [
  { icon: Users, title: "Connect", text: "Find and follow developers" },
  { icon: Code2, title: "Share", text: "Showcase your projects and ideas" },
  { icon: BarChart3, title: "Grow", text: "Learn, collaborate, and level up" },
];

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

  const selectMode = (nextMode) => {
    setMode(nextMode); setError(""); setSuccess(""); setShowPassword(false);
  };
  
  const handleLoginChange = ({ target: { name, value } }) => setLoginDetails((current) => ({ ...current, [name]: value }));
  const handleRegistrationChange = ({ target: { name, value } }) => setRegistrationDetails((current) => ({ ...current, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    try {
      if (isRegistration) {
        await register(registrationDetails.firstName.trim(), registrationDetails.lastName.trim(), registrationDetails.username.trim(), registrationDetails.email.trim(), registrationDetails.password);
        setRegistrationDetails(emptyRegistration);
        setMode("login");
        setSuccess("Account created successfully. Sign in to continue.");
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
    <div className="min-h-screen overflow-x-hidden bg-[#fcfcfc] text-[#111318] [background-image:linear-gradient(#eef0f2_1px,transparent_1px),linear-gradient(90deg,#eef0f2_1px,transparent_1px)] [background-size:36px_36px]">
      <header className="relative z-10 border-b border-[#e3e5e8] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-[1536px] items-center gap-8 px-6 lg:px-10">
          <Brand />
          <div className="hidden max-w-[560px] flex-1 lg:block"><div className="flex h-10 items-center gap-3 rounded-xl border border-[#dfe2e6] bg-white px-3 text-[#697386] shadow-sm"><Search className="size-5" /><span className="text-[16px]">Search developers...</span></div></div>
          <nav className="ml-auto hidden items-center gap-9 text-[16px] font-medium text-[#4b5565] md:flex"><Link to="/">Feed</Link><Link to="/developers">Developers</Link><Link to="/notifications">Notifications</Link></nav>
          <div className="hidden size-10 items-center justify-center rounded-full border border-[#e4e7eb] bg-[#f7f8fa] text-sm md:flex">HM</div>
          <Link to="/logout" aria-label="Log out" className="hidden text-[#4b5565] md:block"><LogIn className="size-5" /></Link>
          <button type="button" className="ml-auto md:hidden" aria-label="Open navigation"><Menu /></button>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-6 py-12 sm:py-16 lg:min-h-[calc(100vh-78px)] lg:grid-cols-[1fr_576px] lg:gap-20 lg:px-10">
        <section className="mx-auto w-full max-w-[500px] lg:mx-0">
          <div className="mb-9 inline-flex items-center gap-2 rounded-xl border border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2 text-xs font-medium text-[#4c5564] shadow-sm"><span className="font-mono text-base">//</span> DEVELOPERS TOGETHER</div>
          <h1 className="max-w-[480px] text-[42px] leading-[1.28] font-bold tracking-[-0.045em] text-[#101114] sm:text-[55px]">DevConnect<br />Code. Share.<br />Build Together.</h1>
          <p className="mt-4 max-w-[490px] text-[18px] leading-[1.5] text-[#586274]">A community for developers to share ideas, showcase projects, and connect with like-minded builders around the world.</p>
          <div className="mt-8 space-y-4">{features.map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-5"><span className="grid size-[54px] place-items-center rounded-xl border border-[#e6e8eb] bg-[#f5f6f7]"><Icon className="size-6" /></span><div><h2 className="text-[18px] font-semibold">{title}</h2><p className="text-[16px] text-[#586274]">{text}</p></div></div>)}</div>
          <div className="relative mt-8 rounded-xl border border-[#e0e3e7] bg-[#f5f6f8] p-4 font-mono text-[14px] leading-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between"><span className="flex gap-1.5"><i className="size-3 rounded-full bg-[#68717e]" /><i className="size-3 rounded-full bg-[#68717e]" /><i className="size-3 rounded-full bg-[#68717e]" /></span><Copy className="size-4 text-[#4d5767]" /></div>
            <div className="grid grid-cols-[20px_1fr] text-[#465264]"><span className="text-[#727d8c]">1<br />2<br />3<br />4</span><code><span className="text-[#075bff]">const</span> community = <span className="text-[#075bff]">new</span> DevConnect();<br />community.<span className="text-[#075bff]">connect</span>();<br />community.<span className="text-[#075bff]">share</span>();<br />community.<span className="text-[#075bff]">grow</span>();</code></div>
          </div>
        </section>

        <section className="w-full rounded-2xl border border-[#d9dde3] bg-white px-5 py-10 shadow-[0_20px_50px_rgba(32,44,65,0.05)] sm:px-9 sm:py-11">
          <div className="mb-6 text-center"><Brand centered /><h2 className="mt-7 text-[34px] leading-none font-bold tracking-[-0.04em]">{isRegistration ? "Create your account" : "Welcome back"}</h2><p className="mt-2 text-[17px] text-[#586274]">{isRegistration ? "Join the DevConnect developer community." : "Sign in to continue to DevConnect."}</p></div>
          <div className="mb-7 grid grid-cols-2 rounded-xl bg-[#f1f2f4] p-1"><button type="button" onClick={() => selectMode("login")} className={`h-11 rounded-[10px] text-[16px] font-medium transition ${!isRegistration ? "bg-white text-black shadow-sm ring-1 ring-[#dce0e5]" : "text-[#4f5a6a]"}`}>Sign in</button><button type="button" onClick={() => selectMode("register")} className={`h-11 rounded-[10px] text-[16px] font-medium transition ${isRegistration ? "bg-white text-black shadow-sm ring-1 ring-[#dce0e5]" : "text-[#4f5a6a]"}`}>Create account</button></div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegistration && <div className="grid gap-4 sm:grid-cols-2"><FormField label="First name" name="firstName" value={registrationDetails.firstName} onChange={handleRegistrationChange} autoComplete="given-name" /><FormField label="Last name" name="lastName" value={registrationDetails.lastName} onChange={handleRegistrationChange} autoComplete="family-name" /></div>}
            {isRegistration && <FormField label="Username" name="username" value={registrationDetails.username} onChange={handleRegistrationChange} autoComplete="username" />}
            <FormField label="Email" name="email" type="email" value={isRegistration ? registrationDetails.email : loginDetails.email} onChange={isRegistration ? handleRegistrationChange : handleLoginChange} autoComplete="email" icon={Mail} placeholder="you@example.com" />
            <PasswordField value={isRegistration ? registrationDetails.password : loginDetails.password} onChange={isRegistration ? handleRegistrationChange : handleLoginChange} showPassword={showPassword} setShowPassword={setShowPassword} autoComplete={isRegistration ? "new-password" : "current-password"} />
            {!isRegistration && <div className="flex items-center justify-between pt-0.5 text-[16px] text-[#586274]"><label className="flex items-center gap-2"><input type="checkbox" className="size-5 rounded border-[#9ca4b0]" />Keep me signed in</label><button type="button" className="underline underline-offset-2">Forgot password?</button></div>}
            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            {success && <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>}
            <button type="submit" disabled={submitting} className="h-[52px] w-full rounded-xl bg-[#171717] text-[17px] font-medium text-white transition hover:bg-[#303030] disabled:opacity-60">{submitting ? "Please wait..." : isRegistration ? "Create account" : "Sign in"}</button>
          </form>
          {!isRegistration && <><div className="my-6 flex items-center gap-4 text-sm text-[#8a93a2]"><span className="h-px flex-1 bg-[#e6e8eb]" />OR<span className="h-px flex-1 bg-[#e6e8eb]" /></div><button type="button" className="flex h-[53px] w-full items-center justify-center gap-3 rounded-xl border border-[#dfe2e6] text-[17px] font-medium"><Code2 className="size-6" />Continue with GitHub</button></>}
          <p className="mt-8 text-center text-[16px] text-[#596374]">{isRegistration ? "Already have an account?" : "Don’t have an account?"} <button type="button" onClick={() => selectMode(isRegistration ? "login" : "register")} className="font-semibold text-[#171717]">{isRegistration ? "Sign in" : "Create account"}</button></p>
        </section>
      </main>
    </div>
  );
};

const Brand = ({ centered = false }) => <Link to="/" className={`flex items-center gap-3 font-bold tracking-[-0.04em] ${centered ? "justify-center text-[27px]" : "shrink-0 text-[26px]"}`}><Code2 className="size-8 text-[#075bff]" strokeWidth={3} />DevConnect</Link>;
const FormField = ({ label, icon: Icon, ...props }) => <label className="block"><span className="mb-2 block text-[16px] font-semibold">{label}</span><span className="relative block">{Icon && <Icon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#4e5968]" />}<Input required className={`h-[52px] rounded-xl border-[#d9dde3] bg-white px-4 text-[16px] placeholder:text-[#aab3c1] focus-visible:ring-2 ${Icon ? "pl-11" : ""}`} {...props} /></span></label>;
const PasswordField = ({ showPassword, setShowPassword, ...props }) => <label className="block"><span className="mb-2 block text-[16px] font-semibold">Password</span><span className="relative block"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#4e5968]" /><Input name="password" type={showPassword ? "text" : "password"} required minLength={6} placeholder="Enter your password" className="h-[52px] rounded-xl border-[#d9dde3] bg-white px-11 text-[16px] placeholder:text-[#aab3c1] focus-visible:ring-2" {...props} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)} className="absolute right-0 top-0 grid h-[52px] w-12 place-items-center text-[#3e4857]">{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></span></label>;

export default Login;
