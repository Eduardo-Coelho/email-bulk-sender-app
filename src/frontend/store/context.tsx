import * as React from "react";
import { useReducer, createContext, useMemo } from "react";
import Reducer, { Type } from "./reducer";

const defaultState = {
  userEmail: "",
  userPassword: "",
  emailTitle: "",
  emailBody: "",
  page: 0,
  csvData: [],
};

export const Context = createContext<UserContext>({
  state: defaultState,
  dispatch: () => {},
});
export interface UserContext {
  dispatch: React.Dispatch<Type>;
  state: PayLoad;
}

export interface CsvData {
  email: string;
  name: string;
}

export interface PayLoad {
  userEmail?: string;
  userPassword?: string;
  emailTitle?: string;
  emailBody?: string;
  page?: number;
  csvData?: CsvData[];
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
