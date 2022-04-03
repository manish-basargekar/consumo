import { useState } from "react";
import Style from "./styles/Login.module.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";






function Login() {
	const [passwordShown, setPasswordShown] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};
	

	const navigate = useNavigate()




	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/api/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (data.user) {
				localStorage.setItem("token", data.user);
				alert("Login successful");
				navigate("/dashboard")
			} else {
				alert("Please check your username and password");
			}
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<div className={Style.container}>
			<Link to="/">
				<div className="home">Home</div>
			</Link>
			{/* <div className={Style.formField}>
				<label htmlFor="username">Username</label>
                <input type="text" placeholder="username" />
			</div> */}
			<h1>Log In</h1>
			<form onSubmit={handleLogin}>
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
				<button type="submit">Log in</button>
			</form>
			<div>
				Need an account?
				<Link to="/signup">Sign up</Link>
			</div>
		</div>
	);
}

export default Login;
