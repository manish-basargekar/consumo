import { movies } from "./list";
import Style from "./App.module.scss";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	
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
	






	const handleFinished = (m) => {
		console.log(m);
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
			.then((res) => setActiveList([...activeList, res.data]))
			.then(setTitle(""))
			.catch((error) => console.log(error));
	};





	// Filter list
	//  first filter is to check, user is in which tab and then filter according to the tab
	const filterlist = (filter) => {
		// Check if tab is in finished or to finish
		let activeFinish = activeTab === "toFinish" ? false :true
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
		setFilter("all")
	};
	const showNotFinished = () => {
		// console.log(allContent)
		setActiveTab("toFinish");
		const Notfinished = allContent.filter((a) => a.Finished === false);
		setActiveList(Notfinished);
		setFilter("all")
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

	return (
		<div className={Style.App}>
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
			<div className={Style.topbar}>
				<div className={Style.left}>
					<h2
						className={activeTab === "toFinish"? `${Style.active}` :""}
						onClick={showNotFinished}
					>
						{" "}
						To finish{" "}
					</h2>
					<h2
						onClick={showFinished}
						className={activeTab === "Finished" ? `${Style.active}` :""}
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
			<div
				className={Style["card-c"]}
				// breakpointCols={5}
				// columnClassName="my-masonry-grid_column"
			>
				{/* {movies.map((m) => (
					<div className={Style.card} onClick={() => handleFinished(m)}>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<span>{m.content}</span>
							<span
								className={
									m.type === "movie" ? `${Style.type}` : `${Style.bookType}`
								}
							>
								{m.type}
							</span>
						</div>
					</div>
				))} */}
				{activeList.map((m) => (
					<div
						className={Style.card}
						key={m._id}
						onClick={() => handleFinished(m)}
					>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<span>{m.title}</span>
							<span
								className={
									m.contentType === "movie"
										? `${Style.type}`
										: `${Style.bookType}`
								}
							>
								{m.contentType}
							</span>
						</div>
						{/* <button>finished</button> */}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
