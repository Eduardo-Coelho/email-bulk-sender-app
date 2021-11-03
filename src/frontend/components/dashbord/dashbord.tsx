import * as React from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import CsvInport from "../csv-inport/csvinport";
import EmailForm from "../email-form/emailform";
import UserForm from "../user-form/userform";

const DashBord = () => {
  const { state } = useContext(Context);
  /**
   * @todo - add types to the any
   */
  return (
    <>
      {state.page === 0 && <UserForm />}
      {state.page === 1 && <CsvInport />}
      {state.page === 2 && <EmailForm />}
    </>
  );
};

export default DashBord;
