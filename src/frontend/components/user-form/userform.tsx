import * as React from "react";
import { ChangeEvent, useContext, useState } from "react";
import { Context, Section, SectionName } from "../../store/context";
import { Row, Col, Input, Title, Wrapper, Button } from "../../styled";

const UserForm = () => {
  const { dispatch } = useContext(Context);

  const [formstate, setstate] = useState<Section>({
    step: 1,
    sectionName: SectionName.userformData,
    info: "Add Your Details",
    complete: true,
    userEmail: "",
    userPassword: "",
  });

  const submit = (event: any) => {
    event.preventDefault();
    dispatch({
      action: "UPDATE",
      section: formstate,
      page: 2,
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const val: string = event.target.value.trim() || "";
    setstate({ ...formstate, [type]: val });
  };

  const validate = (): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/g;
    if (formstate.userEmail && formstate.userPassword) {
      return (
        emailRegex.test(formstate.userEmail) &&
        formstate.userPassword.length >= 3
      );
    }
    return false;
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
