import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link 
} from "react-router-dom";
import styled from "styled-components";

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
        <Nav>
          <StyledLink to="/">memorlee</StyledLink>
          <ul>
            <li><StyledLink to="/">Home</StyledLink></li>
            <li><StyledLink to="/explore">Explore</StyledLink></li>
            <li><StyledLink to="/discover">Discover</StyledLink></li>
          </ul>
        </Nav>
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

const Nav = styled.nav`
  position: fixed;
  top:0;
  left:0;
  right: 0;
`;

const Main = styled.main`
  background-color: var(--bg-color);
  color: var(--font-color);
  min-height: 100vh;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

export default App;
