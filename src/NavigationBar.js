import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  const { user, logout } = useAuth();
console.log(user)
  const handleLogout = () => {
    // Call the logout function from the AuthContext
    logout();
  };

  return (
<>

    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand to="/">Posts App</Navbar.Brand>
      <Nav className="me-auto">
        <Link to="/">Home</Link>
        <Navbar.Collapse className="justify-content-end">
        {user ? (
          
          <>
          <Navbar.Text>
          <Link to={`user/${user.loggedUser.id}`}>Hello, {user.loggedUser.name}</Link>
          <button onClick={handleLogout}>Log me out</button>
          </Navbar.Text>
           
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
          
        </Navbar.Collapse>

        
     
      </Nav>
    </Container>
  </Navbar>
  
  </>
    
  );
};

export default NavigationBar;