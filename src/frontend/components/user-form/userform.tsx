import * as React from "react";
import { ChangeEvent, useContext, useState } from "react";
import { Context } from "../../store/context";
import { Row, Col, Input, Title, Wrapper, Button } from "../../styled";

const UserForm = () => {
  const { dispatch } = useContext(Context);

  const [formstate, setstate] = useState({
    userEmail: "",
    userPassword: "",
    page: 1,
  });

  const submit = (event: any) => {
    event.preventDefault();
    dispatch({
      action: "UPDATE",
      payload: formstate,
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const val: string = event.target.value.trim();
    setstate({ ...formstate, [type]: val });
  };

  const validate = (): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/g;
    return (
      emailRegex.test(formstate.userEmail) && formstate.userPassword.length >= 3
    );
  };

  return (
    <Wrapper>
      <form onSubmit={(event) => submit(event)}>
        <Col>
          <Title> Add Your Details </Title>
          <Row>
            <Input
              type="text"
              placeholder="Email"
              onChange={(event) => onChange(event, "userEmail")}
            />
            <Input
              type="text"
              placeholder="Password"
              onChange={(event) => onChange(event, "userPassword")}
            />
          </Row>
          <Row>
            <Button type="submit" disabled={!validate()}>
              Submit
            </Button>
          </Row>
        </Col>
      </form>
    </Wrapper>
  );
};

export default UserForm;
