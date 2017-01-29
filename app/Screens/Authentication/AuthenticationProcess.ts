import { Authentication } from "../../Config/Store";
import { WorkflowContext } from '../../Host';
import { AreYouSureDialog } from '../../Components/AreYouSureDialog';

export class AuthenticationProcess {
    public static Actions = {
        signedIn: "signedIn",
        signedOut: "signedOut",
        cancel: "cancel",
        error: "error"
    }
    public static processName = "AuthenticationProcess";
    public context: WorkflowContext;

    //@handler(NavigationCommand.TYPE)
    async execute(store: Authentication, username: string) {
        // Do some work here and update the store!
        let workflowResult = "";
        let data = {};

        if (!username || username === "") {
            store.displayMessage = "You must enter a username to login!";
            workflowResult = AuthenticationProcess.Actions.error;
        } else {
            store.displayMessage = "";

            var result = await this.context.workflowDialogAsync(AreYouSureDialog.processName, { text: "Are you sure you want to login??" });
            if (result && result.response === "Yes") {
                if (username !== "a") {
                    store.isAuthenticated = true;
                    store.username = username;
                    workflowResult = AuthenticationProcess.Actions.signedIn;
                } else {
                    workflowResult = AuthenticationProcess.Actions.error;
                    store.isAuthenticated = false;
                }
            } else {
                workflowResult = AuthenticationProcess.Actions.cancel;
            }
        }
        // now complete fire a workflow result command
        this.context.workflowResult(workflowResult, data);
    }
}