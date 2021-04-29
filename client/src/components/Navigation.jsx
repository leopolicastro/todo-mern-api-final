import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import dueFilter from '../helpers/DueFilter';
import wyncode from '../assets/images/Wyncode_icon.png';
import Logout from './Logout';

const Navigation = () => {
  const [active, setActive] = useState({
    completed: false,
    pending: false
  });
  const { currentUser, tasks, setFilteredTasks, setCurrentFilter } = useContext(
    AuthContext
  );
  const filterCompleted = (query) => {
    dueFilter(query, tasks, setFilteredTasks);
    setCurrentFilter(query);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Task Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item
            className="mr-2"
            onClick={() => {
              filterCompleted('Completed');
            }}
            onMouseEnter={() => setActive({ ...active, completed: true })}
            onMouseLeave={() => setActive({ ...active, completed: false })}
            style={{
              cursor: 'pointer',
              textDecoration: active.completed ? 'underline' : 'none'
            }}
          >
            Completed
          </Nav.Item>
          <Nav.Item
            onClick={() => {
              filterCompleted('Pending');
            }}
            onMouseEnter={() => setActive({ ...active, pending: true })}
            onMouseLeave={() => setActive({ ...active, pending: false })}
            style={{
              cursor: 'pointer',
              textDecoration: active.pending ? 'underline' : 'none'
            }}
          >
            Pending
          </Nav.Item>
          <Nav.Item
            className="ml-2"
            onMouseEnter={() => setActive({ ...active, calendar: true })}
            onMouseLeave={() => setActive({ ...active, calendar: false })}
            style={{
              cursor: 'pointer',
              textDecoration: active.calendar ? 'underline' : 'none'
            }}
            as={Link}
            to="/calendar"
          >
            Calendar
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Dropdown drop="down" className="mr-1">
              <Dropdown.Toggle variant="">
                <Image
                  src={currentUser?.avatar || wyncode}
                  height={50}
                  width={50}
                  roundedCircle
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
                <Logout />
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
