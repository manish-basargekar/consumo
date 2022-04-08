import Style from "./styles/Homepage.module.scss";

import { Link } from "react-router-dom";

function Homepage() {
	// const handleGoogle = () => {

	// }

	return (
		<div className={Style.container}>
			{/* <button onClick={handleGoogle}>Login with google</button> */}
			<div className={Style.wrapper}>
				<h1>Kontent</h1>
				<Link to="/login">
					<button>Login with email</button>
				</Link>
				<Link to="/signup">
					<button className={Style.signup}>Sign up with email</button>
				</Link>
			</div>
		</div>
	);
}

export default Homepage;
