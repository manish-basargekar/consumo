import { useState } from "react";
import Style from "./styles/Login.module.scss";
import { Link, useNavigate } from "react-router-dom";


import axios from "axios";

function SignUp() {
	const [passwordShown, setPasswordShown] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			// const response = await fetch("http://localhost:5000/api/user/register", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({
			// 		name,
			// 		email,
			// 		password,
			// 	}),
			// });

			const response = await axios.post(
				"http://localhost:5000/api/user/register",
				{
					name,
					email,
					password,
				}
			);

			const data = await response.data;

			localStorage.setItem("token", data.user);
			alert("Login successful");
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={Style.container}>
			<Link to="/">
				<div className={Style.home}>Home</div>
			</Link>
			<div className={Style.wrapper}>

			<h1>Sign Up</h1>
			<form onSubmit={handleSignup}>
				<div className={Style.formField}>
					<label htmlFor="username">First name</label>
					<input
						type="text"
						placeholder="First name"
						onChange={(e) => setName(e.target.value)}
					/>
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
				<button type="submit" className={Style.submitBtn}>Sign Up</button>
			</form>
			<div className={Style.linkTo}>
				Already have an account?
				<Link to="/login">Log in</Link>
			</div>
			</div>
		</div>
	);
}

export default SignUp;
