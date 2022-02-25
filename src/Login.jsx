import { useState } from "react";
import Style from "./styles/Login.module.scss";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword} from "firebase/auth"

import auth from "./Firebase-config"


function Login() {
	const [passwordShown, setPasswordShown] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};
	



	const handleLogin = async (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);
		try {
			await signInWithEmailAndPassword(auth, email, password)
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
