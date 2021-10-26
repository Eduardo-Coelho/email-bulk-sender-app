import { PayLoad } from "./context";

export interface Type {
  Action: string;
  Payload: PayLoad;
}

export default function Reducer(state: PayLoad, type: Type): PayLoad {
  const { Action, Payload }: Type = type;

  switch (Action) {
    case "UPDATE":
      const newState = { ...state, ...Payload };
      return { ...newState };

    default:
      throw new Error();
  }
}
