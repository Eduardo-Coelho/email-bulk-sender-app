import * as React from "react";
import { useEffect, useState } from "react";
import { getPage } from "../../store/hooks";
import CsvInport from "../csv-inport/csvinport";
import EmailForm from "../email-form/emailform";
import ProgressNav from "../progress-nav/progressnav";
import UserForm from "../user-form/userform";

const DashBord = () => {
  const [page, setPage] = useState<number>(0);
  const currentPage = getPage();

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <>
      <ProgressNav />
      {page === 1 && <UserForm />}
      {page === 2 && <CsvInport />}
      {page === 3 && <EmailForm />}
    </>
  );
};

export default DashBord;
