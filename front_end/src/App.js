import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './component/Nav';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
      <Footer />
      
    </div>
  );
}

export default App;
