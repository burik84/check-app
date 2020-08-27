import React from "react";
import { Form, Input, InputNumber } from "antd";

interface IInitialTask {
  getDataFoo: (data: string) => void;
  getDataFromInputNumber: (data: number) => void;
  taskName: string;
  inputNumberValue: number;
}

const { TextArea } = Input;

const InitialTask: React.FC<IInitialTask> = ({
  getDataFoo,
  getDataFromInputNumber,
  taskName,
  inputNumberValue,
}) => {
  
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDataFoo(e.target.value);
  };

  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    getDataFoo(e.target.value);
  };

  const onInputNumberChange = (value) => {
    getDataFromInputNumber(value);
  };

  return (
    <Form name="basic">
      <Form.Item
        name={"name"}
        label="Task Name"
        rules={[
          {
            required: true,
            message: "Please input task name!",
          },
        ]}
      >
        <Input onChange={changeInputHandler} />
      </Form.Item>
      <Form.Item name={"description"} label="Task description">
        <TextArea onChange={changeTextAreaHandler} autoSize={true} style={{ minHeight: "200px" }} />
      </Form.Item>
      <Form.Item
        name={"score"}
        label="Maximum score"
        rules={[
          {
            required: true,
            message: "Please input score!",
          },
        ]}
      >
        <InputNumber min={1} max={500} onChange={onInputNumberChange} />
      </Form.Item>
    </Form>
  );
};

export default InitialTask;
