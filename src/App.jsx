// import logo from './logo.svg';
import './App.css';
import { clickMe } from './components/clickmecomponent';
import { Icons, Icons2 } from './components/Icons';


// import Hooks from './topics/hooks';
function App() {

  return (
    <div className="App">
      <>Hiiii React Dev</>

      <button onClick={clickMe}>click Me</button>
      <button onClick={clickMe}>click Me1</button>
      <button onClick={clickMe}>click Me2</button>
      <Icons/>
      <Icons2/>
      <div>Hello there</div>



      {/* Hooks */}
      {/* <Hooks /> */}
      
    </div>
  );
}

export default App;
