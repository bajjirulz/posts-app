import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/Navbar';


const NavigationBar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    // Call the logout function from the AuthContext
    logout();
  };

  return (
<>


    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand to="/">Posts App</Navbar.Brand>
      <Nav className="me-auto">
        <Link to="/" className='nav-link'>Home</Link>
      </Nav>

      <Nav>
      <Navbar.Collapse className="float-end">
        {user ? (
          
          <>
          <Link to={`user/${user.loggedUser.id}`} className='nav-link' style={{"marginRight":"20px"}}>Hello, {user.loggedUser.name}</Link>
          <button onClick={handleLogout} className='mx-auto pr-3'>Log me out</button>           
          </>
        ) : (
          <Link to="/login" className="btn btn-outline-light" >Login</Link>
        )}
          
        </Navbar.Collapse>
      </Nav>
 
          
     
    </Container>
  </Navbar>

  
  
  </>
    
  );
};

export default NavigationBar;