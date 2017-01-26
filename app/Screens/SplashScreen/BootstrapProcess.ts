import { Bootstrap } from "../../Config/Store";
import { WorkflowContext, Host } from '../../Host';

export class BootstrapProcess {
    public static Actions = {
        complete: "complete",
        error: "error"
    }
    public static processName = "BootstrapProcess";
    public context: WorkflowContext;

    //@handler(NavigationCommand.TYPE)
    async executeAsync(store: Bootstrap) {
        for (let p = 0; p < 10; p++) {
            await Host.sleep(200);
            store.percerntComplete += 10;
        }
        this.context.workflowResult(BootstrapProcess.Actions.complete);
    }
}