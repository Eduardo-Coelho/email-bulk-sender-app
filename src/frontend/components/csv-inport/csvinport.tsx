import * as React from "react";
import { useContext, useState } from "react";
import { Context } from "../../store/context";
import { Button, Col, Input, Row, Title, Wrapper } from "../../styled";

const CsvInport = () => {
  const { dispatch } = useContext(Context);
  const [csvstate, setstate] = useState({
    filename: "",
    file: null,
  });

  const processCSV = (str: any, delim = ",") => {
    /**
     * @todo - add types to the any
     */

    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row: any) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj: any, header: string, i: any) => {
        const h = header.trim();
        obj[h] = values[i];

        return obj;
      }, {});
      return eachObject;
    });
    const arr = newArray.filter(
      (i: { Name: string; Email: string }) => i.Name && i.Email
    );

    dispatch({
      Action: "UPDATE",
      Payload: {
        CsvData: arr,
        Page: 2,
      },
    });
  };

  const submit = (event: any) => {
    /**
     * @todo - add types to the any
     */
    event.preventDefault();
    if (csvstate.file) {
      const file = csvstate.file;
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e?.target?.result;
        processCSV(text);
      };
      reader.readAsText(file);
    }
  };

  const onChange = (event: any) => {
    /**
     * @todo - add types to the any
     */
    const fileName: string = event?.target?.files[0]?.name;
    if (fileName && fileName.includes(".csv")) {
      setstate({
        ...csvstate,
        file: event?.target?.files[0],
        filename: fileName,
      });
    }
  };

  return (
    <Wrapper>
      <form onSubmit={(event) => submit(event)}>
        <Col>
          <Title> Import Your CSV File </Title>

          <Row>
            <Input
              type="file"
              accept=".csv"
              onChange={(event) => onChange(event)}
            />
          </Row>
          <Row>
            <Button type="submit" disabled={!csvstate.filename}>
              Submit CSV File
            </Button>
          </Row>
        </Col>
      </form>
    </Wrapper>
  );
};

export default CsvInport;
