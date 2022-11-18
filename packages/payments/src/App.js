import './App.css';
import './data-table'

function App() {
  return (
    <div className='app'>
      <data-table
                src="https://jsonplaceholder.typicode.com/users"
                cols="id,name,username,email,phone"
        ></data-table>
    </div>
  );
}

export default App;
