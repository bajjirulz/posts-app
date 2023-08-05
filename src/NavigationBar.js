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
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link to="/">Home</Nav.Link>
        <Navbar.Collapse className="justify-content-end">
        {user ? (
          
          <>
          <Navbar.Text>
          Hello, {user.loggedUser.name}
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