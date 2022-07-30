import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import Main from "../../components/Main";
import "./LoginsScreen.css";

const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        { username, password },
        config
      );
      // console.log(data);
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/home");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <Main title="Login">
      <div className="login-container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default LoginScreen;
