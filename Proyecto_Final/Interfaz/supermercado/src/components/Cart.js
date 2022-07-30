import { CartState } from "../context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import PayPal from "./PayPal";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();
  const [checkout, setCheckOut] = useState(false);

  useEffect(() => {
    setTotal(
      cart.reduce(
        (accumulate, current) =>
          accumulate + Number(current.price) * current.qty,
        0
      )
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="product-conatiner">
        <ListGroup style={{ margin: 10 }}>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>${product.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: { id: product.id, qty: e.target.value },
                      })
                    }
                  >
                    {[...Array(Number(product.inStock)).keys()].map((i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: $ {total}
        </span>
        {/* {checkout ? } */}
        <Button
          type="button"
          className="button"
          disabled={cart.length === 0}
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Want to Pay
        </Button>
        {checkout && total > 0 ? (
          <div className="mt-3">
            <PayPal total={total.toFixed(2)} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
