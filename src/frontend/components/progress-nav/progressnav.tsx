import * as React from "react";
import { useEffect, useState } from "react";
import { PayLoad, Section } from "../../store/context";
import { getAll } from "../../store/hooks";
import { Box, Circle, Col, Line, ProgressNavWrapper, Row } from "../../styled";

const ProgressNav = () => {
  const [progress, setProgress] = useState<PayLoad>();
  const getAllSection = getAll();

  useEffect(() => {
    setProgress(getAllSection);
  }, [getAllSection]);

  return (
    <ProgressNavWrapper>
      <Row>
        {progress?.section.map((s: Section, index: number) => {
          return (
            <Box key={`step--${index}`}>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Circle complete={s.complete} />
                    </Col>
                    <Col>
                      <Line complete={s.complete} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Box>
          );
        })}
      </Row>
    </ProgressNavWrapper>
  );
};
export default ProgressNav;
