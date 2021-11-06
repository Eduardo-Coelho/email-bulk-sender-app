import * as React from "react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Context, CsvData, Section, SectionName } from "../../store/context";
import { Button, Col, Input, Row, Title, Wrapper } from "../../styled";

const CsvInport = () => {
  const { dispatch } = useContext(Context);
  const [csvstate, setstate] = useState<Section>({
    step: 2,
    sectionName: SectionName.csvinportData,
    info: "Import Your CSV File",
    complete: true,
    csvData: [],
    filename: "",
    file: null,
  });

  const processCSV = (str: string, delim = ",") => {
    /**
     * @todo - CSV File Validator
     */

    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row: string) => {
      const values = row.split(delim);
      const eachObject = headers.reduce(
        (obj: any, header: string, i: number) => {
          const h = header.trim().toLowerCase();
          obj[h] = values[i];

          return obj;
        },
        {}
      );
      return eachObject;
    });
    const validateCsv: CsvData[] = newArray.filter(
      (i: CsvData) => i.name && i.email
    );

    dispatch({
      action: "UPDATE",
      section: { ...csvstate, csvData: validateCsv },
      page: 3,
    });
  };

  const submit = (event: FormEvent<Element>) => {
    event.preventDefault();
    if (csvstate.file) {
      const file = csvstate.file;
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e?.target?.result;
        if (typeof text === "string") processCSV(text);
      };
      reader.readAsText(file);
    }
  };

  const onChange = (event: ChangeEvent<any>) => {
    /**
     * @todo - add types to the any
     */
    if (event && event?.target && event?.target?.files) {
      const fileName: string = event?.target?.files[0]?.name;
      if (fileName && fileName.includes(".csv")) {
        setstate({
          ...csvstate,
          file: event?.target?.files[0],
          filename: fileName,
        });
      }
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
