
import { movies } from "./list";



function App() {
  return (
    <div className="App">
      <select name="" id="">
        <option value="movie">movie</option>
        <option value="book">book</option>
      </select>
      <input type="text" placeholder="name"/>
      <button>ADD</button>
     <h1> Consume list </h1>
      {movies.map((m) => <li>{m}</li>)}
    </div>
  );
}

export default App;
