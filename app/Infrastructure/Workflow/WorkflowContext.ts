import { MessageHandlerContext} from "abus";
import {WorkflowResultCommand} from "./WorkflowResultCommand";
import {OpenDialogCommand} from "../Navigation/OpenDialogCommand";

export class WorkflowContext {
    constructor(public context: MessageHandlerContext, private process: string) {

    }
    workflowResult(action: string, data?: any) {
        this.context.sendAsync(new WorkflowResultCommand(this.process, action, data));
    }

    async workflowDialogAsync(dialogName: string, data?: any) {
        return this.context.sendAsync(new OpenDialogCommand(dialogName, data));
    }
}