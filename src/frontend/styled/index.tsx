import styled, { css } from "styled-components";

interface BoxProps {
  padding?: string;
  margin?: string;
  textAlign?: string;
  borderTop?: boolean;
  borderBottom?: boolean;
  border?: boolean;
}
interface BoxWidthProps {
  width: string;
}
interface CircleProps {
  complete: boolean;
}

export const Box = styled.div<BoxProps>`
  padding: ${(props) => props.padding || 0};
  margin: ${(props) => props.margin || 0};
  text-align: ${(props) => props.textAlign || "auto"};
  border-top: ${(props) => (props.borderTop ? "1px solid #DBDDE0" : "")};
  border-bottom: ${(props) => (props.borderBottom ? "1px solid #DBDDE0" : "")};
  border: ${(props) => (props.border ? "1px solid #DBDDE0" : "")};
`;

export const WidthBox = styled.div<BoxWidthProps>`
  width: ${(props) => props.width || 0};
`;

const complete = css`
  background-color: #52bdb7;
`;
const notcomplete = css`
  background-color: #ffffff;
`;

export const Circle = styled.div<{ complete: any }>`
  padding: 15px;
  border-radius: 50%;
  border: 1px solid #e4e4e4;
  ${(props) => {
    if (props.complete) {
      return complete;
    }
    if (!props.complete) {
      return notcomplete;
    }
  }}
`;

export const Line = styled.div<{ complete: any }>`
  padding: 8px 32px 0px 39px;
  margin: 11px 0px 0px -1px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  ${(props) => {
    if (props.complete) {
      return complete;
    }
    if (!props.complete) {
      return notcomplete;
    }
  }}
`;

export const BreadCrumbs = styled.small``;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #585858;
  font-weight: bold;
`;

export const Wrapper = styled.section`
  padding: 4em;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0 2px 3px #ccc;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
`;

export const Col = styled.div`
  flex-direction: column;
`;

export const Label = styled.label`
  background: #fff;
`;

export const Input = styled.input`
  font-size: 15px;
  padding: 10px;
  margin: 10px;
  width: 100%;
  background: #ffffff;
  border: none;
  border-radius: 3px;
  border-radius: 10px;
  ::placeholder {
    color: #000000;
  }
  box-shadow: 0 1px 2px #ccc;
`;

export const Textarea = styled.textarea`
  white-space: pre-wrap;
  font-size: 15px;
  padding: 10px;
  margin: 10px 0 10px 0;
  font-weight: bold;
  background: #ffffff;
  border: none;
  width: 100%;
  height: 200px;
  border-radius: 3px;
  border-radius: 10px;
  ::placeholder {
    color: #b4b4b4;
  }
  box-shadow: 0 1px 2px #ccc;
`;
export const Signature = styled.textarea`
  white-space: pre-wrap;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin: 10px 0 10px 0;
  background: #ffffff;
  border: none;
  width: 100%;
  height: 50px;
  border-radius: 3px;
  border-radius: 10px;
  ::placeholder {
    color: #b4b4b4;
  }
  box-shadow: 0 1px 2px #ccc;
`;

export const Button = styled.button`
  background-color: #52bdb7;
  color: #fff;
  width: 200px;
  font-size: 1rem;
  padding: 10px;
  margin-top: 30px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 2px #ccc;
  cursor: pointer;
  :hover {
    background: #2f87fa;
  }

  :disabled {
    background: #cfcfcf;
    color: #ffffff;
    box-shadow: none;
  }
`;

export const ProgressNavWrapper = styled.nav`
  margin: 20px;
`;
