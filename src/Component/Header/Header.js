import React from 'react';
import logo_travel from '../../logo_travel.png';
import { Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Container } from '@material-ui/core';

const Header = () => {

    return (
        <div className="row">
            <div className="col-md-12 d-flex justify-content-around">
                <Container fluid mr-auto style={{ fontSize: '15px', margin: '0 15px', }}>
                    <Navbar className="m-2 p-2 d-flex justify-content-between" bg="light" variant="light" >
                        <Navbar.Brand href="#home" >
                            <img src={logo_travel} width="60" height="30"
                                className="d-inline-block align-top" alt="R"
                            />
                        </Navbar.Brand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        </Form>
                        <Nav className="mr-auto p-3 mr-sm-3">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/destination">Destination</Nav.Link>
                            <Nav.Link href="/pricing">Blog</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                            <Nav.Link className="btn btn-success" href="/login">Login</Nav.Link>
                            <Nav.Link className="btn btn-warning" href="/">Logout</Nav.Link>
                        </Nav>
                    </Navbar>
                </Container>
            </div>
        </div>
    );
}

export default Header;
