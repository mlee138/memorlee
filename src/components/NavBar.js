import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
function NavBar() {
    const [open, setOpen] = useState(false);
    return (
        <Nav>
          <StyledLink onClick={()=>setOpen(false)} to="/">memorlee</StyledLink>
          <MenuBtn onClick={() => setOpen(!open)} className={open ? "open" : null}>
            <Hamburger/>
          </MenuBtn>
          <MenuOptions className={open ? 'open' : null}>
            <Option><StyledLink to="/" onClick={()=>setOpen(false)}>Home</StyledLink></Option>
            <Option><StyledLink to="/explore" onClick={()=>setOpen(false)}>Explore</StyledLink></Option>
            <Option><StyledLink to="/discover" onClick={()=>setOpen(false)} >Discover</StyledLink></Option>
            <Option><StyledLink to="/upload" onClick={()=>setOpen(false)}>Upload</StyledLink></Option>
          </MenuOptions>
        </Nav>
    )
}

const Nav = styled.nav`
  position: fixed;
  top:0;
  left:0;
  right: 0;
  z-index: 10;
  height: 50px;
  
  background-color: var(--nav-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
`;

const MenuBtn = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 20px;
  height: 20px;
  &.open div {
    transform: translateX(-30px);
    background: transparent;
    &:before {
      transform: translate(30px, 0px) rotate(45deg);
    }
    &:after {
      transform: translate(30px, 0px) rotate(-45deg);
    }
  }
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

const Hamburger = styled.div`
  width: 100%;
  height: 10%;
  border-radius: 20px;
  background-color: white;
  position: relative;
  transition: all .5s ease-in-out;
  &:before, &:after{
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: white;
    transition: all .5s ease-in-out;
  }
  &:before {
    transform: translateY(-7px);
  }
  &:after {
    transform: translatey(7px);
  }
`;

const MenuOptions = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    &.open li{
      display: block;
    }
  }
`;

const Option = styled.li`
  list-style-type: none;
  @media screen and (max-width: 500px) {
    background-color: var(--nav-color);
    border-bottom: 1px solid #484020;
    width: 100%;
    text-align: center;
    transition: all 0.5s ease-in-out;
    display: none;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 1rem;
  position: relative;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 500px) {
    display: inline-block;
  }
`;

export default NavBar;