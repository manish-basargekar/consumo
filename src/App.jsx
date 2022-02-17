import { movies, books } from "./list";
import Style from "./App.module.scss";

function App() {
	// tasks
	// Should be able to add movie or book to db
	// onclick finished show those in finished tab, and remove from current list


	const handleFinished = (m) => {
		console.log(m)
	}	


	return (
		<div className={Style.App}>
			<form action="submit" className={Style.addForm}>
				<select name="" id="">
					<option value="movie">movie</option>
					<option value="book">book</option>
				</select>
				<input type="text" placeholder="name" />
				<button>ADD</button>
			</form>
			<h2> To finish </h2>
			<div className={Style["card-c"]}>
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
			</div>
			{/* {books.map((b) => (
				<div>
					<span>{b}</span>
					<button>finished</button>
				</div>
			))} */}

			<h2>Finished</h2>
		</div>
	);
}

export default App;
