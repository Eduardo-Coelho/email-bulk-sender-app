import { PayLoad } from "./context";

interface Type {
  Action: string;
  Payload: PayLoad;
}

export default function Reducer(state: PayLoad, type: Type) {
  const { Action, Payload }: Type = type;

  switch (Action) {
    case "UPDATE":
      const newState = { ...state, ...Payload };
      return { ...newState };

    default:
      throw new Error();
  }
}
