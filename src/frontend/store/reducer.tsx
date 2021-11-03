import { PayLoad } from "./context";

export interface Type {
  action: string;
  payload: PayLoad;
}

export default function Reducer(state: PayLoad, type: Type): PayLoad {
  const { action, payload }: Type = type;

  switch (action) {
    case "UPDATE":
      const newState = { ...state, ...payload };
      return { ...newState };

    default:
      throw new Error();
  }
}
