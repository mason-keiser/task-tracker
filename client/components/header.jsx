import React from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    if (window.innerWidth < 768) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    let offset = -86;
    if (window.innerWidth < 768) {
      offset = -286;
    }
    if (!this.props.user.firstname) {
      return (
        <Container fluid={true} className="py-3 navcont bg-white sticky-top shadow-sm">
          <Navbar color="faded" light
            expand="md"
            className="row py-0">
            <NavbarToggler onClick={this.handleToggle} navbar="true" style={{ border: 'none' }} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <div className='navbar'>
                  <a
                    offset={offset}
                    duration={1000}
                    className="pointer px-0 nav-link"
                    onClick={this.handleToggle, () => { this.props.setView('login', {}); }}>
                    Login
                  </a>
                </div>
                <div className="navbar ml-md-5">
                  <a
                    offset={offset}
                    duration={1000}
                    className="pointer px-0 nav-link"
                    onClick={this.handleToggle, () => { this.props.setView('signup', {}); }}>
                    Sign Up
                  </a>
                </div>
                 <div className="navbar ml-md-5">
                  <a
                    offset={offset}
                    duration={1000}
                    className="pointer px-0 nav-link"
                    onClick={this.handleToggle, () => { this.props.setView('main', {}); }}>
                    Create Item
                    </a>
                </div>
                    <div className="navbar ml-md-5">
                      <a
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle, () => { this.props.setView('not-complete', {}); }}>
                        Incomplete
                      </a>
                    </div>
                    <div className="navbar ml-md-5">
                      <a
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle, () => { this.props.setView('complete', {}); }}>
                        Complete
                      </a>
                    </div>
                <div className="navbar ml-md-5">
                  <a
                    href="https://masonkeiser.com/"
                    offset={offset}
                    duration={1000}
                    className="pointer px-0 nav-link"
                    onClick={this.handleToggle}>
                    Mason's Portfolio
                  </a>
                </div>
              </Nav>
            </Collapse>
            <NavbarBrand className="pointer decoration-none" onClick={() => {
              scroll.scrollToTop();
              if (this.state.isOpen) {
                this.handleToggle();
              }
              this.props.setView('home', {});
            }}>
              Welcome {this.props.user.firstname}
            </NavbarBrand>
          </Navbar>
        </Container>
      );
    } else {
        return (
            <Container fluid={true} className="py-3 navcont bg-white sticky-top shadow-sm">
              <Navbar color="faded" light
                expand="md"
                className="row py-0">
                <NavbarToggler onClick={this.handleToggle} navbar="true" style={{ border: 'none' }} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav  navbar>
                    <div className="navbar">
                      <a
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle, () => { this.props.setView('main', {}); }}>
                        Create Item
                      </a>
                    </div>
                    <div className="navbar ml-md-5">
                      <a
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle, () => { this.props.setView('not-complete', {}); }}>
                        Incomplete
                      </a>
                    </div>
                    <div className="navbar ml-md-5">
                      <a
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle, () => { this.props.setView('complete', {}); }}>
                        Complete
                      </a>
                    </div>
                    <div className="navbar ml-md-5">
                      <a
                        href="https://masonkeiser.com/"
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle}>
                        Mason's Portfolio
                      </a>
                    </div>
                  </Nav>
                </Collapse>
                <NavbarBrand className="pointer decoration-none" onClick={() => {
                  scroll.scrollToTop();
                  if (this.state.isOpen) {
                    this.handleToggle();
                  }
                  this.props.setView('home', {});
                }}>
                  Welcome {this.props.user.firstname}
                </NavbarBrand>
              </Navbar>
            </Container>
          );
    }
  }
}
