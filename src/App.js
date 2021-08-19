import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import NavBar from './components/NavBar.js';
import Home from "./components/Home.js";
import Explore from "./components/Explore.js";
import Discover from "./components/Discover.js";
import AlbumView from "./components/AlbumView.js";
import useData from "./hooks/useData";
import './App.css';

//import getImageList from "./helper/getImageList.js";

function App() {
  const data = useData();
  

  return (
    <Router>
      <Main>
          <NavBar/>
          <Switch>
            <Route path="/" exact component={()=> <Home data={data}/>}/>
            <Route path="/explore" exact component={()=> <Explore data={data}/>}/>
            <Route path="/explore/:location/:year" component={AlbumView}/>
            <Route path="/discover" component={()=> <Discover data={data}/>}/>
          </Switch>
      </Main>
    </Router>
  );
}

const Main = styled.main`
  background-color: var(--bg-color);
  color: var(--font-color);
  min-height: 100vh;
`;

export default App;
