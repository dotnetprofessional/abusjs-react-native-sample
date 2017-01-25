import {IMessage} from "abus";

export class WorkflowResult {
    process: string;
    action: string;
    data?: any;
}

export class WorkflowResultCommand implements IMessage<WorkflowResult> {
    static TYPE = "WorkflowResultCommand";

    constructor(process: string, action: string, data?: string) {
        this.message = new WorkflowResult();
        this.message.process = process;
        this.message.action = action;
        this.message.data = data;
    }
    type = WorkflowResultCommand.TYPE;
    message: WorkflowResult;
}