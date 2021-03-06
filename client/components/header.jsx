import React from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap';
import {
  animateScroll as scroll
} from 'react-scroll';

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
    // header will hide on scroll 
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-100px";
      }
    prevScrollpos = currentScrollPos;
    }

    let offset = -86;
    if (window.innerWidth < 768) {
      offset = -286;
    }
    if (!this.props.user.firstname) {
      return (
        <Container fluid={true} className="py-3 navcont bg-white sticky-top shadow-sm" id="navbar">
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
                        Active
                      </a>
                    </div>
                    <div className="navbar ml-md-5">
                      <a
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle, () => { this.props.setView('complete', {}); }}>
                        Inactive
                      </a>
                    </div>
              </Nav>
            </Collapse>
            <NavbarBrand className="pointer decoration-none" onClick={() => {
              scroll.scrollToTop();
              if (this.state.isOpen) {
                this.handleToggle();
              }
            }}>
              Welcome, {this.props.user.firstname}
            </NavbarBrand>
          </Navbar>
        </Container>
      );
    } else {
        return (
            <Container fluid={true} className="py-3 navcont bg-white sticky-top shadow-sm" id="navbar">
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
                        Active
                      </a>
                    </div>
                    <div className="navbar ml-md-5">
                      <a
                        offset={offset}
                        duration={1000}
                        className="pointer px-0 nav-link"
                        onClick={this.handleToggle, () => { this.props.setView('complete', {}); }}>
                        Inactive
                      </a>
                    </div>
                   
                  </Nav>
                </Collapse>
                <NavbarBrand className="pointer decoration-none" onClick={() => {
                  scroll.scrollToTop();
                  if (this.state.isOpen) {
                    this.handleToggle();
                  }
                }}>
                  Welcome, {this.props.user.firstname}
                </NavbarBrand>
              </Navbar>
            </Container>
          );
    }
  }
}
