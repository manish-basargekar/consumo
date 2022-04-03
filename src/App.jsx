import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import SignUp from "./SignUp";

// import { ProvideAuth, useAuth } from "./use-auth.js";

function App() {
	// const auth = useAuth();

	return (
		// <ProvideAuth>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		// </ProvideAuth>
	);
}

export default App;
