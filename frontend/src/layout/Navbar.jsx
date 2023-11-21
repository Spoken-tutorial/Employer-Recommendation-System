import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button, Navbar, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className='me-2'>
              <Button variant="primary">Login</Button>
            </Link>
            <Link to="/">
              <Button variant="primary">Register</Button>
            </Link>
            
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;