import React from "react";
import { uuid } from "uuidv4";

import { Select } from "antd";

const { Option } = Select;

interface ICustomInput {
  arr: any;
  isRepo?: boolean;
  onHandleRepoSelect?: (value: string) => void;
}

const CabinetInput: React.FC<ICustomInput> = ({
  arr,
  isRepo,
  onHandleRepoSelect
}: ICustomInput) => {
  const onChange = (value: string) => {
    onHandleRepoSelect(value);
  };

  return (
    <>
      <Select
        showSearch
        style={{ width: 200, marginRight: "20px" }}
        onChange={onChange}
        placeholder={isRepo ? "Select repository" : "Select brunch"}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {arr.map((i) => {
          return (
            <Option key={uuid()} value={i.name}>
              {i.name || i.node.name}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default CabinetInput;
