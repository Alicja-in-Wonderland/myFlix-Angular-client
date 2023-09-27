import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Represents the Info Dialog component.
 */
@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  /**
   * Data to be displayed in the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
