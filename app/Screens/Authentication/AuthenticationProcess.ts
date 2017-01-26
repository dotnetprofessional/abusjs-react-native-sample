import { Authentication } from "../../Config/Store";
import { WorkflowContext } from '../../Host';
import {AreYouSureDialog} from '../../Components/AreYouSureDialog';

export class AuthenticationProcess {
    public static Actions = {
        signedIn: "signedIn",
        signedOut: "signedOut",
        error: "error"
    }
    public static processName = "AuthenticationProcess";
    public context: WorkflowContext;

    //@handler(NavigationCommand.TYPE)
    async execute(store: Authentication, username: string) {
        // Do some work here and update the store!
        let workflowResult = "";
        if (username !== "a") {
            store.isAuthenticated = true;
            store.username = username;
            workflowResult = AuthenticationProcess.Actions.signedIn;
        } else {
            store.isAuthenticated = false;
            AuthenticationProcess.Actions.error;
        }

        // now complete fire a workflow result command
        var result = await this.context.workflowDialogAsync(AreYouSureDialog.processName);
        this.context.workflowResult(workflowResult);
    }
}