import { Spinner } from "react-bootstrap";

const Loading = ({ size = 100 }) => {
  return (
    <div className="spinner-container">
      <Spinner style={{ width: size, height: size }} animation="border" />
    </div>
  );
};

export default Loading;
