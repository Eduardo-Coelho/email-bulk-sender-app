import * as React from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import CsvInport from "../csv-inport/csvinport";
import EmailForm from "../email-form/emailform";
import UserForm from "../user-form/userform";

const DashBord = () => {
  const { state, dispatch } = useContext(Context);
  /**
   * @todo - add types to the any
   */
  return (
    <>
      {state.Page === 0 && <UserForm />}
      {state.Page === 1 && <CsvInport />}
      {state.Page === 2 && <EmailForm />}
    </>
  );
};

export default DashBord;
