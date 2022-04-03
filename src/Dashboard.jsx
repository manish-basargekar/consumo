import Style from "./styles/Dashboard.module.scss";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


import { Navigate, useNavigate } from "react-router-dom";



function Dashboard() {
	// const auth = useAuth();
	// sets the active list rendered
	// this is allContent with various filters
	const [activeList, setActiveList] = useState([]);

	//list all all content regardless of any filters
	const [allContent, setAllContent] = useState([]);

	// onchange for title input
	const [title, setTitle] = useState("");
	// onchange for dropdown input
	const [option, setOption] = useState("movie");
	// onchange for filter dropdown input
	const [filter, setFilter] = useState("all");
	// sets the active tab i.e finished or to finish
	const [activeTab, setActiveTab] = useState("toFinish");

	const baseURL = "http://localhost:5000/api/content";

	// Whats its supposed to do
	// update allContent with the newly finished object

	const handleFinished = (m) => {
		// console.log(m._id)
		// console.log(activeList);
		// console.log(allContent);

		axios
			.patch(`${baseURL}/update/${m._id}`, { Finished: true })
			.then((res) => {
				let newActiveList = activeList.filter((a) => a._id !== res.data._id);
				setActiveList(newActiveList);
				// update allContent
				console.log(res.data);
				console.log(newActiveList);
				// console.log(res.data)
				const updatedAllContent = allContent.filter(
					(a) => a._id !== res.data._id
				);
				// update the all content with the new finished content
				setAllContent([res.data, ...updatedAllContent]);
			})
			.then(toast.success(`Successfully added ${m.title} to Finished`))
			.catch((error) => console.log(error));
	};

	// Handle form submit to add new content
	const handleSubmit = (e) => {
		e.preventDefault();
		const newContent = {
			title: title,
			contentType: option,
		};
		axios
			.post(`${baseURL}/add`, newContent)
			.then(toast.success(`Successfully Added ${newContent.title} `))
			.then((res) => {
				setActiveList([res.data, ...activeList]);
				setAllContent([res.data, ...allContent]);
			})
			.then(setTitle(""))
			.catch((error) => toast.error(error));
	};

	// Filter list
	//  first filter is to check, user is in which tab and then filter according to the tab
	const filterlist = (filter) => {
		// Check if tab is in finished or to finish
		let activeFinish = activeTab === "toFinish" ? false : true;
		const toFinishList = allContent.filter((a) => a.Finished === activeFinish);
		if (filter === "all") {
			setActiveList(toFinishList);
		} else {
			const filteredList = toFinishList.filter((a) => a.contentType === filter);
			// console.log(filteredList.filter(a => a.Finished === true));
			setActiveList(filteredList);
		}
	};

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleOption = (e) => {
		setOption(e.target.value);
	};

	const handleFilter = (e) => {
		setFilter(e.target.value);
		// console.log(e.target.value);
		filterlist(e.target.value);
	};

	const showFinished = () => {
		// console.log(allContent)
		setActiveTab("Finished");
		const finished = allContent.filter((a) => a.Finished === true);
		setActiveList(finished);
		setFilter("all");
		// axios.get(`${baseURL}/finished`).then(res => setActiveList(res.data))
	};
	const showNotFinished = () => {
		// console.log("to finish", allContent);

		setActiveTab("toFinish");
		const Notfinished = allContent.filter((a) => a.Finished === false);

		// console.log(Notfinished);

		setActiveList(Notfinished);
		setFilter("all");
	};

	useEffect(() => {
		const getContent = () => {
			axios.get(`${baseURL}`).then((res) => {
				setActiveList(res.data.filter((a) => a.Finished === false));
				setAllContent(res.data);
			});
			// .then(console.log(activeList));
		};
		getContent();
	}, []);

	// useEffect(() => {

	// },[])

	const navigate = useNavigate();
	const handleLogout = () => {
		// auth.signout()
		navigate("/")
	};

	// const user = true
	return (
		<>
		{/* {console.log(auth.user)} */}
			<div className={Style.App}>
				<Toaster />
				<div className={Style.head}>
					<form
						action="submit"
						className={Style.addForm}
						onSubmit={(e) => handleSubmit(e)}
					>
						<select value={option} onChange={(e) => handleOption(e)}>
							<option value="movie">Movie</option>
							<option value="book">Book</option>
						</select>
						<input
							type="text"
							placeholder="title"
							name="title"
							onChange={(e) => handleTitle(e)}
							value={title}
							required
						/>
						<button action="submit">ADD</button>
					</form>
					<div className={Style.profile}>
						<button onClick={handleLogout}>LOGOUT</button>
					</div>
				</div>
				<div className={Style.topbar}>
					<div className={Style.left}>
						<h2
							className={activeTab === "toFinish" ? `${Style.active}` : ""}
							onClick={showNotFinished}
						>
							{" "}
							To finish{" "}
						</h2>
						<h2
							onClick={showFinished}
							className={activeTab === "Finished" ? `${Style.active}` : ""}
						>
							Finished
						</h2>
					</div>
					<div className={Style.right}>
						<span>Filter by type: </span>
						<select
							placeholder="Filter by type"
							onChange={(e) => handleFilter(e)}
							value={filter}
						>
							<option value="all">All</option>
							<option value="movie">Movies</option>
							<option value="book">Books</option>
						</select>
					</div>
				</div>
				<div className={Style["card-c"]}>
					{activeList.map((m) => (
						<div className={Style.card} key={m._id}>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<div
									className={Style.dotmenu}
									style={{ display: activeTab === "toFinish" ? "none" : "" }}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="orangered"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										// class="ai ai-Check"
									>
										<path d="M4 12l6 6L20 6" />
									</svg>
								</div>
								<div
									className={Style.dotmenuFinished}
									style={{ display: activeTab === "Finished" ? "none" : "" }}
									onClick={() => handleFinished(m)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#1b1b1b"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										// class="ai ai-Check"
									>
										<path d="M4 12l6 6L20 6" />
									</svg>
								</div>
								<div className={Style.contentTitle}>{m.title}</div>
								<span
									className={
										m.contentType === "movie"
											? `${Style.type}`
											: `${Style.bookType}`
									}
								>
									{m.contentType === "movie" ? "🎬 " : "📖 "}
									{m.contentType}
								</span>
							</div>
							{/* <button>finished</button> */}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Dashboard;
