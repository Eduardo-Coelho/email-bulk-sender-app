import * as React from "react";
import { useReducer, createContext, useMemo } from "react";
import Reducer, { Type } from "./reducer";

const defaultState = {
  UserEmail: "",
  UserPassword: "",
  EmailTitle: "",
  EmailBody: "",
  Page: 0,
  CsvData: [""],
};

export const Context = createContext<UserContext>({
  state: defaultState,
  dispatch: () => {},
});
export interface UserContext {
  dispatch: React.Dispatch<Type>;
  state: PayLoad;
}

export interface PayLoad {
  UserEmail?: string;
  UserPassword?: string;
  EmailTitle?: string;
  EmailBody?: string;
  Page?: number;
  CsvData?: any[];
}
/**
 * @todo - add types to the any
 */

const UserContext = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, defaultState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default UserContext;
