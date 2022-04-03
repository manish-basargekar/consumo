import { useState } from "react";
import Style from "./styles/Login.module.scss";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";



function SignUp() {
	const [passwordShown, setPasswordShown] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			// const res = await createUserWithEmailAndPassword(auth, email, password);
			// const user = res.user;
			// console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={Style.container}>
			<Link to="/">
				<div className="home">Home</div>
			</Link>
			<h1>Sign Up</h1>
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
