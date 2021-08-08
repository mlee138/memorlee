import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link 
} from "react-router-dom";
import styled from "styled-components";
import {CloudinaryContext} from 'cloudinary-react';

import Home from "./components/Home.js";
import Explore from "./components/Explore.js";
import Discover from "./components/Discover.js";
import AlbumView from "./components/AlbumView.js";
import useData from "./hooks/useData";
import './App.css';

function App() {
  const { years, locations } = useData();
  
  return (
    <Router>
      <Main>
        <nav>
          <StyledLink to="/">memorlee</StyledLink>
          <ul>
            <li><StyledLink to="/">Home</StyledLink></li>
            <li><StyledLink to="/explore">Explore</StyledLink></li>
            <li><StyledLink to="/discover">Discover</StyledLink></li>
          </ul>
        </nav>
        <CloudinaryContext cloudName="memorlee-pics" secure="true" upload_preset="my_unsigned_preset">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/explore" exact component={Explore}/>
            <Route path="/explore/:location/:year" component={AlbumView}/>
            <Route path="/discover" component={Discover}/>
          </Switch>
        </CloudinaryContext>
      </Main>
    </Router>
  );
}


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
