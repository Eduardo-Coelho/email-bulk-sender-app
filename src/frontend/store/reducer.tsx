import { defaultPayLoad, PayLoad, Section } from "./context";

export interface IncomingState {
  action: string;
  section: Section;
  page: number;
}

export default function Reducer(
  currentState: PayLoad,
  incomingState: IncomingState
): PayLoad {
  const { action, section, page }: IncomingState = incomingState;

  switch (action) {
    case "UPDATE":
      const updateSection = currentState.section.filter(
        (s: Section) => s.sectionName !== section.sectionName
      );
      updateSection.push({ ...section });
      const sort = updateSection.sort((a, b) => a.step - b.step);
      return { section: updateSection, page: page };

    case "CLEAR":
      return { ...defaultPayLoad };

    default:
      throw new Error();
  }
}
