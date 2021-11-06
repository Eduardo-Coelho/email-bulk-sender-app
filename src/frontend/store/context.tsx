import * as React from "react";
import { useReducer, createContext, useMemo } from "react";
import Reducer, { IncomingState } from "./reducer";

export enum SectionName {
  userformData = "userformData",
  csvinportData = "csvinportData",
  emailformData = "emailformData",
}

const defaultSections = [
  {
    step: 1,
    sectionName: SectionName.userformData,
    info: "Add Your Details",
    complete: false,
    userEmail: "",
    userPassword: "",
  },
  {
    step: 2,
    sectionName: SectionName.csvinportData,
    info: "Import Your CSV File",
    complete: false,
    csvData: [],
    filename: "",
    file: null,
  },
  {
    step: 3,
    sectionName: SectionName.emailformData,
    info: "Sent Your Email",
    complete: false,
    subject: "",
    recipientName: "Hi FLAG_NAME",
    emailBody: "",
    signature: "",
  },
];

export const defaultPayLoad = {
  page: 1,
  section: defaultSections,
};

export const Context = createContext<UserContext>({
  state: defaultPayLoad,
  dispatch: () => {},
});
export interface UserContext {
  dispatch: React.Dispatch<IncomingState>;
  state: PayLoad;
}

export interface CsvData {
  email: string;
  name: string;
}

export interface Section {
  step: number;
  sectionName?: SectionName;
  info?: string;
  complete?: boolean;
  userEmail?: string;
  userPassword?: string;
  csvData?: CsvData[];
  filename?: string;
  file?: null;
  subject?: string;
  recipientName?: string;
  emailBody?: string;
  signature?: string;
}

export interface PayLoad {
  page: number;
  section: Section[];
}
/**
 * @todo - add types to the any
 */

const UserContext = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, defaultPayLoad);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default UserContext;
