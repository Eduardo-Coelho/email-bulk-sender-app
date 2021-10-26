import * as React from "react";
import { useContext, useState } from "react";
import { Context } from "../../store/context";
import { Row, Col, Input, Title, Wrapper, Button } from "../../styled";

const UserForm = () => {
  const { dispatch } = useContext(Context);

  const [formstate, setstate] = useState({
    UserEmail: "",
    UserPassword: "",
    Page: 1,
  });

  const submit = (event: any) => {
    event.preventDefault();
    dispatch({
      Action: "UPDATE",
      Payload: formstate,
    });
  };

  const onChange = (event: any, type: string) => {
    const val: string = event.target.value.trim();
    setstate({ ...formstate, [type]: val });
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
              onChange={(event) => onChange(event, "UserEmail")}
            />
            <Input
              type="text"
              placeholder="Password"
              onChange={(event) => onChange(event, "UserPassword")}
            />
          </Row>
          <Row>
            <Button
              type="submit"
              disabled={
                formstate.UserEmail.length < 3 ||
                formstate.UserPassword.length < 3
              }
            >
              Submit
            </Button>
          </Row>
        </Col>
      </form>
    </Wrapper>
  );
};

export default UserForm;
