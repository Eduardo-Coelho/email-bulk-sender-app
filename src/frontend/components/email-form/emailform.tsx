import * as React from "react";
import { useContext, useState } from "react";
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

/**
 * @todo refactored  needed
 */

const EmailBodyplaceholder = `**Example text**
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
<br /> <br /> 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
<br /> <br />
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
**Example text**
`;

const EmaiSignatureyplaceholder = `Kind Regards,<br /> 
Jon Smith
`;

const EmailForm = () => {
  const [state, dispatch]: any = useContext(Context);

  const [emailstate, setstate] = useState({
    subject: "",
    recipientName: "Hi FLAG_NAME",
    emailBody: "",
    signature: "",
  });

  const submit = async (event: any) => {
    event.preventDefault();

    if (emailstate.subject && emailstate.emailBody && emailstate.signature) {
      const Email = `
        <p> ${emailstate.recipientName}</p>
        <p> ${emailstate.emailBody}</p>
        <p> ${emailstate.signature}</p>
      `;

      const emailPatload = {
        user: {
          email: state.UserEmail,
          password: state.UserPassword,
        },
        email: {
          emailBody: Email,
          subject: emailstate.subject,
        },
        csvData: state.CsvData,
      };
      await IpcSend(IPCs.SendEmail, emailPatload);

      /**
       * @todo refactored  needed
       */

      setstate({
        subject: "",
        recipientName: "Hi FLAG_NAME",
        emailBody: "",
        signature: "",
      });
    }
  };

  const onChange = (event: any, type: string) => {
    const val: string = event.target.value;

    setstate({ ...emailstate, [type]: val });
  };

  return (
    <Wrapper>
      <form onSubmit={(event) => submit(event)}>
        <Col>
          <Title> Sent Your Email To {state.CsvData.length - 1} </Title>
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
            onChange={(event) => onChange(event, "emailBody")}
            placeholder={EmailBodyplaceholder}
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
