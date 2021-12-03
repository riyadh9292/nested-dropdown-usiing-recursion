import React, { useState } from "react";

const NestedDropdown = () => {
  const options = [
    {
      id: 1,
      text: "option 1",
      options: [
        {
          id: 3,
          text: "nested one level",
          options: [{ id: 4, text: "nested two level" }],
        },
      ],
    },
    {
      id: 2,
      text: "option 2",
    },
  ];
  const [selectedIds, setSelectedIds] = useState([]);
  //   const
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropDownToggle = () => {
    setShowDropdown((prev) => !prev);
  };
  const handleDropdownClose = () => {
    setShowDropdown(false);
  };
  const handleSelectedId = (selected, depthLevel) => {
    return () => {
      const updatedArray = selectedIds.slice(0);
      updatedArray[depthLevel] = selected;
      setSelectedIds(updatedArray);
    };
  };
  const renderSubMenu = (options, depthLevel = 0) => {
    if (showDropdown !== true) {
      return null;
    }
    const menuOptions = options.map((option) => {
      const display = <span>{option.text}</span>;
      const hasOptions = option.options && option.options.length > 0;
      let subMenu;
      if (selectedIds[depthLevel] === option.id && hasOptions) {
        const newDepthLevel = depthLevel + 1;
        subMenu = renderSubMenu(option.options, newDepthLevel);
      }

      return (
        <li
          key={option.id}
          onMouseEnter={handleSelectedId(option.id, depthLevel)}
        >
          {display}
          {subMenu}
        </li>
      );
    });
    return (
      <div className="dropdown__options">
        <ul>{menuOptions}</ul>
      </div>
    );
  };
  return (
    <div>
      <p style={{ cursor: "pointer" }} onClick={handleDropDownToggle}>
        Click here{" "}
      </p>
      {renderSubMenu(options)}
    </div>
  );
};

export default NestedDropdown;
