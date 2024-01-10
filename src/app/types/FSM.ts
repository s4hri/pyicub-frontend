
interface State {
  stateName: string;
  action: string;
  triggers?: { [key: string]: string };
}

export type FSM = State[]
