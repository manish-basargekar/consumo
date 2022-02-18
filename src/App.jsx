import { movies } from "./list";
import Style from "./App.module.scss";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	// tasks
	// Should be able to add movie or book to db
	// onclick finished show those in finished tab, and remove from current list

	// const [active, setActive] = useState();

	const [activeList, setActiveList] = useState([]);

	const [title, setTitle] = useState("");
	const [option, setOption] = useState("movie");

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
		console.log(newContent);
	};

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleOption = (e) => {
		setOption(e.target.value);
	};

	useEffect(() => {
		const getContent = () => {
			axios
				.get(`${baseURL}`)
				.then((res) => setActiveList(res.data))
				.then(console.log(activeList));
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
					<select name="filter" id="" placeholder="Filter by type">
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
				{movies.map((m) => (
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
						{/* <button>finished</button> */}
					</div>
				))}
				{activeList.map((m) => (
					<div className={Style.card} onClick={() => handleFinished(m)}>
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
