import { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from "react-router-dom";
import { auth } from "./firebase/config.js";

import styled from "styled-components";
import NavBar from './components/NavBar.js';
import Home from "./components/Home.js";
import Explore from "./components/Explore.js";
import Discover from "./components/Discover.js";
import AlbumView from "./components/AlbumView.js";
import useData from "./hooks/useData";
import UploadForm from "./components/UploadForm.js";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setReady] = useData();

  useEffect(()=> {
    auth.signInAnonymously()
      .then(()=>{
        console.log("signed in");
        setLoggedIn(true);
        setReady(true);
      })
      .catch((error) => {
        console.log(error.message);
      })
  },[setReady])
  
  
  return (
    <Router>
      <Main>
          <NavBar/>
          {
            loggedIn ? 
            <Switch>
              <Route path="/" exact component={()=> <Home data={data}/>}/>
              <Route path="/explore" exact component={()=> <Explore data={data}/>}/>
              <Route path="/explore/:location/:year" component={AlbumView}/>
              <Route path="/discover" component={()=> <Discover data={data}/>}/>
              <Route path="/upload" component={()=><UploadForm data={data}/>}/>
            </Switch>
            :
            null
          }
          
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
