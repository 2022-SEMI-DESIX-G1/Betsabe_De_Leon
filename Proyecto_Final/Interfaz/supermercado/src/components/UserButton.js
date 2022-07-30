import { Dropdown } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const UserButton = () => {
  const navigate = useNavigate();

  return (
    <Dropdown style={{ marginLeft: "10px" }} align={{ sm: "right" }}>
      <Dropdown.Toggle className="button">
        <FaUserAlt color="white" fontSize="25" />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ minWidht: 370 }}>
        <Dropdown.Item
          onClick={() => {
            localStorage.removeItem("userInfo");
            navigate("/");
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserButton;
