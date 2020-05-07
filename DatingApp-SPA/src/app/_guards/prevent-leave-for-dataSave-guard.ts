import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../members/member-edit/member-edit.component";

@Injectable()
export class PreventLeaveForSaveChangesGuard implements CanDeactivate<MemberEditComponent {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('You have unsaved data, Do you need to continue without saving it?');
        }
    }
}