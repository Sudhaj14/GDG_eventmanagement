import { Navbar, Nav, Container } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Mavbar = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/");
        alert("Logout Success");
    };

    return (
        <div className="fixed top-0 left-0 w-full z-10">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">GoodDeeds</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/services">Services</Nav.Link>
                            <Nav.Link href="/about">About Us</Nav.Link>
                        </Nav>
                        {user ? (
                            <div className="text-white flex items-center">
                                <div className="relative">
                                    <span className="dropbtn cursor-pointer">
                                        Welcome, {user.username}
                                    </span>
                                    <div className="dropdown-content absolute right-0 bg-gray-700 text-white shadow-lg rounded-lg p-2 hidden group-hover:block">
                                        <ul className="list-none p-0 m-0">
                                            <li className="py-1">{user.username}</li>
                                            <li className="py-1">{user.email}</li>
                                            <li
                                                className="cursor-pointer text-red-400 hover:text-red-500"
                                                onClick={handleClick}
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Nav>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Mavbar;
