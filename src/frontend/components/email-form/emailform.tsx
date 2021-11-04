import * as React from "react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Context } from "../../store/context";
import {
  Button,
  Col,
  Input,
  Row,
  Textarea,
  Title,
  Wrapper,
  Label,
  Signature,
} from "../../styled";
import { IPCs, IpcSend } from "../../utils/ipc";

const EmaiSignatureyplaceholder = `Kind Regards,
Name
`;

const EmailForm = () => {
  const { state, dispatch } = useContext(Context);

  const [emailstate, setstate] = useState({
    subject: "",
    recipientName: "Hi FLAG_NAME",
    emailBody: "",
    signature: "",
  });

  const submit = async (event: FormEvent<Element>) => {
    event.preventDefault();
    if (emailstate.subject && emailstate.emailBody && emailstate.signature) {
      const email = `
        <p> ${emailstate.recipientName}</p>
         <p>${newLine(emailstate.emailBody)}</p>
        <p> ${newLine(emailstate.signature)}</p>
      `;

      const emailPatload = {
        user: {
          userEmail: state.userEmail,
          userPassword: state.userPassword,
        },
        emailTemp: {
          emailBody: email,
          subject: emailstate.subject,
        },
        csvData: state.csvData,
      };

      const stringJson = JSON.stringify(emailPatload);
      await IpcSend(IPCs.SendEmail, stringJson);

      setstate({
        subject: "",
        recipientName: "Hi FLAG_NAME",
        emailBody: "",
        signature: "",
      });

      dispatch({
        action: "UPDATE",
        payload: {
          csvData: [],
          page: 0,
        },
      });
    }
  };

  const newLine = (input: string) => {
    return input.replace(/\r\n|\r|\n/g, "<br />");
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const val: string = event.target.value;

    setstate({ ...emailstate, [type]: val });
  };

  return (
    <Wrapper>
      <form onSubmit={(event) => submit(event)}>
        <Col>
          <Title>
            Sent Your Email To {state.csvData && state.csvData.length}
          </Title>
          <Row>
            <Input
              placeholder="Subject"
              type="text"
              onChange={(event) => onChange(event, "subject")}
            />
            <Input
              placeholder="Hi FLAG_NAME"
              type="text"
              onChange={(event) => onChange(event, "recipientName")}
            />
          </Row>
          <Label> Email Body: </Label>
          <Textarea
            rows={3}
            onChange={(event) => onChange(event, "emailBody")}
          />

          <Label> Signature: </Label>
          <Signature
            onChange={(event) => onChange(event, "signature")}
            placeholder={EmaiSignatureyplaceholder}
          />

          <Row>
            <Button
              type="submit"
              disabled={
                !emailstate.subject ||
                !emailstate.signature ||
                !emailstate.emailBody
              }
            >
              Send Email
            </Button>
          </Row>
        </Col>
      </form>
    </Wrapper>
  );
};

export default EmailForm;
