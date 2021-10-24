import * as React from "react";
import { useReducer, createContext } from "react";
import Reducer from "./reducer";

const IntState: PayLoad = {
  UserEmail: "",
  UserPassword: "",
  EmailTitle: "",
  EmailBody: "",
  Page: 0,
  CsvData: [""],
};

export const Context = createContext({});

export interface UserContext {
  dispatch: React.Dispatch<string>;
  state: PayLoad;
}

export interface PayLoad {
  UserEmail: string;
  UserPassword: string;
  EmailTitle: string;
  EmailBody: string;
  Page: number;
  CsvData: any[];
}
/**
 * @todo - add types to the any
 */

const UserContext = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, IntState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default UserContext;
