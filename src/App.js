import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}

export default App;
