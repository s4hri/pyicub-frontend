import {Component, OnInit} from '@angular/core';
import {WidgetBaseComponent} from '../../widget-base/widget-base.component';

@Component({
  selector: 'app-actions-manager',
  templateUrl: './actions-manager.component.html',
  styleUrl: './actions-manager.component.css'
})
export class ActionsManagerComponent extends WidgetBaseComponent implements OnInit {

  actions: Action[] = []
  isLoading = true;
  search: string

  showErrorDialog: boolean = false;
  errorMessage: string;

  nodeColors = {
    INACTIVE: 'gray',
    ACTIVE: 'white',
    RUNNING: 'yellow',
    FAILED: 'red',
    DONE: 'green'
  }

  get filteredActions(): Action[] {

    if (!this.search) {
      return this.actions
    } else {
      return this.actions.filter(action => action.actionID.toLowerCase().includes(this.search.toLowerCase()))
    }

  }

  ngOnInit() {
    this.getRobotActions().subscribe({
        next: actions => {
          const filteredActions = actions.filter(action => action.startsWith(this.application.name + ".")).map(action => action.substring(this.application.name.length + 1))
          const newActions: Action[] = filteredActions.map(action => {
            return {actionID: action, actionState: ActionState.ACTIVE}
          })
          this.actions = newActions;
          this.isLoading = false;
          //console.log(this.actions)
        },
        error: err => {
          console.log(err)
          this.isLoading = false;
          this.openErrorDialog("Impossibile caricare le azioni del robot.")
        }
      }
    )
  }

  onActionClick(selectedAction: Action) {

    if (selectedAction.actionState === ActionState.ACTIVE) {

      this.actions.forEach(action => {
        if (selectedAction.actionID !== action.actionID) {
          this.updateActionState(action, ActionState.INACTIVE)
        }
      })

      this.playActionAsync(selectedAction.actionID).subscribe(reqID => {

        //console.log("RISPOSTA PLAYACTION: ",reqID)

        const onRunning = () => {
          this.updateActionState(selectedAction, ActionState.RUNNING)
        }

        const onDone = () => {

          this.updateActionState(selectedAction, ActionState.DONE)
          setTimeout(() => {
            this.actions.forEach(action => {
              this.updateActionState(action, ActionState.ACTIVE)
            })
          }, 2000)

        }

        const onFailed = () => {

          this.updateActionState(selectedAction, ActionState.FAILED)
          setTimeout(() => {
            this.actions.forEach(action => {
              this.updateActionState(action, ActionState.ACTIVE)
            })
          }, 2000)
        }

        this.checkAsyncRequestStatus(reqID, undefined, onRunning, onDone, onFailed)

      })
    }
  }

  private updateActionState(actionToUpdate: Action, updatedState: ActionState) {
    this.actions = this.actions.map(action => {
      if (action.actionID === actionToUpdate.actionID) {
        return {actionID: action.actionID, actionState: updatedState}
      }
      return action
    })
  }

  openErrorDialog(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorDialog = true;
  }

  closeErrorDialog() {
    this.errorMessage = "";
    this.showErrorDialog = false;
  }

}

interface Action {
  actionID: string
  actionState: ActionState
}

enum ActionState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  RUNNING = "RUNNING",
  DONE = "DONE",
  FAILED = "FAILED"
}
