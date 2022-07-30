import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import UserButton from "./UserButton";

const Header = () => {
  const currentLocation =
    window.location.pathname === "/" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/register"
      ? true
      : false;

  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar variant="dark" style={{ height: 80, backgroundColor: "#b9557d" }}>
      <Container>
        <Navbar.Brand>
          <Link to="home" style={{ fontSize: 30 }}>
            SuperMarket
          </Link>
        </Navbar.Brand>
        {!currentLocation ? (
          <>
            <Navbar.Text className="search">
              <FormControl
                style={{ width: 500 }}
                placeholder="Search a Product"
                className="m-auto"
                onChange={(e) =>
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  })
                }
              />
            </Navbar.Text>
            <Nav>
              <Dropdown align={{ sm: "right" }}>
                <Dropdown.Toggle className="button">
                  <FaShoppingCart color="white" fontSize="25" />
                  <Badge bg="none">{cart.length}</Badge>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidht: 370 }}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((product) => (
                        <span className="cart-item" key={product.id}>
                          <img
                            src={product.image}
                            className="cart-item-img"
                            alt={product.name}
                          />
                          <div className="cart-item-detail">
                            <span>{product.name}</span>
                            <span>${product.price}</span>
                          </div>
                          <AiFillDelete
                            fontSize="20px"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: product,
                              })
                            }
                          />
                        </span>
                      ))}
                      <Link to="cart">
                        <Button
                          style={{ width: "90%", margin: "0 10px" }}
                          className="btn-product"
                        >
                          Go To Cart!
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <span style={{ padding: 10 }}>Cart is Empty!</span>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              {!currentLocation && <UserButton />}
            </Nav>
          </>
        ) : (
          <>
            <UserButton />
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
