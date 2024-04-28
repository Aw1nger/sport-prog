import React, { SetStateAction } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownInput = ({
  item,
  setItem,
  list,
}: {
  item: string;
  setItem: React.Dispatch<SetStateAction<string>>;
  list: string[];
}) => {
  return (
    <Dropdown className="d-flex justify-content-end justify-content-sm-start w-100">
      <Dropdown.Toggle
        id="dropdown-basic"
        className="btn__outline d-flex justify-content-center align-items-center gap-2 w-100"
      >
        {item ? item : "Выбрать..."}
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100" variant="dark">
        {list.map((dropdownItem, index) => (
          <Dropdown.Item className="d-flex justify-content-center" key={index} onClick={() => setItem(dropdownItem)}>
            {dropdownItem}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownInput;
