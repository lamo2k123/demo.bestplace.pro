export type Action = {|
    type: string
|};

export type Dispatch = (action: Action) => Action;

export type State = {|
    modal: boolean,
    in: boolean,
    up: boolean
|};
