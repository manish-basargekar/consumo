import { movies, books } from "./list";




function App() {
	return (
		<div className="App">
			<select name="" id="">
				<option value="movie">movie</option>
				<option value="book">book</option>
			</select>
			<input type="text" placeholder="name" />
			<button>ADD</button>
			<h1> Movie list </h1>
			{movies.map((m) => (
				<div>
					<span>{m}</span>
					<button>finished</button>
				</div>
			))}
			<h2>Books</h2>
			{books.map((b) => (
				<div>
					<span>{b}</span>
					<button>finished</button>
				</div>
			))}

      <h2>Finished</h2>
		</div>
	);
}

export default App;
