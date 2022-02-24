import { useState } from "react";
import Style from "./styles/Login.module.scss";
import { Link } from "react-router-dom";
function SignUp() {
	const [passwordShown, setPasswordShown] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleGoogleLogin = () => {
		console.log("Log in with google");
	};

	const handleSignup = (e) => {
        e.preventDefault()
		console.log(email);
		console.log(password);
	};

	return (
		<div className={Style.container}>
			<button onClick={handleGoogleLogin}>Sign up with google</button>
			<form onSubmit={handleSignup}>
				<div className={Style.formField}>
					<label htmlFor="username">First name</label>
					<input type="text" placeholder="First name" />
				</div>
				<div className={Style.formField}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						placeholder="Email"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className={Style.formField}>
					<label htmlFor="username">Password</label>
					<input
						type={passwordShown ? "text" : "password"}
						placeholder="Password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className={Style.checkbox}>
					<input
						type="checkbox"
						name="Show password"
						id="check"
						onClick={togglePassword}
					/>
					<label htmlFor="check">Show password</label>
				</div>
				<button type="submit">Sign Up</button>
			</form>
			<div>
				Already have an account?
				<Link to="/login">Log in</Link>
			</div>
		</div>
	);
}

export default SignUp;
