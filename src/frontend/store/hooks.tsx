import { useContext } from "react";
import { convertArrayToObject } from "../utils/helperfuc";
import { Context, Section, SectionName } from "./context";

export const getUserformDataSection = () => {
  const { state } = useContext(Context);
  const get = state.section.filter(
    (s: Section) => s.sectionName === SectionName.userformData
  );
  const section = convertArrayToObject(get);
  return section;
};

export const getCsvinportDataSection = () => {
  const { state } = useContext(Context);
  const get = state.section.filter(
    (s: Section) => s.sectionName === SectionName.csvinportData
  );
  const section = convertArrayToObject(get);
  return section;
};

export const getEmailformDataSection = () => {
  const { state } = useContext(Context);
  const get = state.section.filter(
    (s: Section) => s.sectionName === SectionName.emailformData
  );
  const section = convertArrayToObject(get);
  return section;
};

export const getPage = () => {
  const { state } = useContext(Context);
  return state.page;
};

export const clearState = () => {
  const { dispatch } = useContext(Context);
  return () =>
    dispatch({
      action: "CLEAR",
      section: {},
      page: 1,
    });
};
