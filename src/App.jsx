import { movies } from "./list";
import Style from "./App.module.scss";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	// tasks
	// onclick finished show those in finished tab, and remove from current list

	// const [active, setActive] = useState();

	const [activeList, setActiveList] = useState([]);
	const [allContent, setAllContent] = useState([]);

	const [title, setTitle] = useState("");
	const [option, setOption] = useState("movie");
	const [filter, setFilter] = useState("all");

	const baseURL = "http://localhost:5000/api/content";

	const handleFinished = (m) => {
		console.log(m);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newContent = {
			title: title,
			contentType: option,
		};
		axios
			.post(`${baseURL}/add`, newContent)
			.then((res) => setActiveList([...activeList, res.data]))
			.catch((error) => console.log(error));
	};

	const filterlist = (filter) => {
		if (filter === "all") {
			setActiveList(allContent);
		} else {
			const filteredList = allContent.filter((a) => a.contentType === filter);
			// console.log(filteredList);
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

	useEffect(() => {
		const getContent = () => {
			axios.get(`${baseURL}`).then((res) => {
				setActiveList(res.data);
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
					required
				/>
				<button action="submit">ADD</button>
			</form>
			<div className={Style.topbar}>
				<div className={Style.left}>
					<h2 className={Style.active}> To finish </h2>
					<h2>Finished</h2>
				</div>
				<div className={Style.right}>
					<span>Filter by type: </span>
					<select
						placeholder="Filter by type"
						onChange={(e) => handleFilter(e)}
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
