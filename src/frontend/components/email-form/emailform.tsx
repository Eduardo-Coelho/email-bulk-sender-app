import * as React from "react";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Section, SectionName } from "../../store/context";

import {
  clearState,
  getCsvinportDataSection,
  getUserformDataSection,
} from "../../store/hooks";
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
  const { userformData } = getUserformDataSection();
  const { csvinportData } = getCsvinportDataSection();
  const clear = clearState();

  const [emailstate, setstate] = useState<Section>({
    step: 3,
    sectionName: SectionName.emailformData,
    info: "Sent Your Email",
    complete: false,
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
          userEmail: userformData.userEmail,
          userPassword: userformData?.userPassword,
        },
        emailTemp: {
          emailBody: email,
          subject: emailstate.subject,
        },
        csvData: csvinportData?.csvData,
      };
      const stringJson = JSON.stringify(emailPatload);
      await IpcSend(IPCs.SendEmail, stringJson);
      clear();
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
            Sent Your Email To {csvinportData && csvinportData.csvData?.length}
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
