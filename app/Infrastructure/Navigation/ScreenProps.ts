import {WorkflowContext} from "../Workflow/WorkflowContext";

export class ScreenProps<S> {
    messageContext: WorkflowContext;
    store: S;
}