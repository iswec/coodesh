import './App.css';
import EmailSearch from './Componentes/EmailSearch';
import UseContext from './Estados/UseContext';

function App() {
  return (
    <div className="App">
      <UseContext />
      <EmailSearch />
    </div>
  );
}

export default App;
