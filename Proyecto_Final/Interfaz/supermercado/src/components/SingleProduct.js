import { Button, Card } from "react-bootstrap";
import { CartState } from "../context/Context";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>{product.category}</span>
          </Card.Subtitle>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>${product.price}</span>
          </Card.Subtitle>
          {cart.some((element) => element.id === product.id) ? (
            <Button
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: product });
              }}
              variant="outline-danger"
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              className="btn-product"
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: product });
              }}
              disabled={!product.inStock}
            >
              {!product.inStock ? "Out of stock" : "Add to cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
