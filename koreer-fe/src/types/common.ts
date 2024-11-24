export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}

export interface SliceState {
    status: Status;
}