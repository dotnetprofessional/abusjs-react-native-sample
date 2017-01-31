import { MessageHandlerContext } from "abus";
import { Navigator } from "react-native";
import { OpenDialogCommand } from "./OpenDialogCommand";

export class DialogContext {
    constructor(public context: MessageHandlerContext, private navigator: Navigator) {

    }
    reply(data?: any) {
        this.navigator.pop();
        this.context.reply(data);
    }

    async workflowDialogAsync(dialogName: string, data?: any) {
        return this.context.sendAsync(new OpenDialogCommand(dialogName, data));
    }
}