import { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");

  //   if (userInfo) {
  //     history.push("/home");
  //   }
  // }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 style={{ fontSize: "90px" }}>Welcome to Supermarket App</h1>
              <p className="subtitle">A Safe place for your customer wishes</p>
            </div>
            <div className="button-container">
              <Link to="login">
                <Button size="lg" className="landing-button">
                  Login
                </Button>
              </Link>
              <Link to="register">
                <Button
                  size="lg"
                  className="landing-button"
                  variant="outline-primary"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
