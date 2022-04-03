import Style from "./styles/Homepage.module.scss";

import { Link } from "react-router-dom";




function Homepage() {




	const handleGoogle = () => {
		
	}


	return (
		<div className={Style.container}>
			<button onClick={handleGoogle}>Login with google</button>
			<Link to="/login">
				<button>Login with email</button>
			</Link>
			<Link to="/signup">
				<button>Sign up with email</button>
			</Link>
		</div>
	);
}

export default Homepage;
