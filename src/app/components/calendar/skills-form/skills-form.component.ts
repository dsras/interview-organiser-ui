import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { SkillOptions, Skills } from 'src/app/shared/models/types';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * Component for submiting new skills to users skill set
 */
@Component({
  selector: 'skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss'],
})
export class SkillsFormComponent implements OnInit, OnDestroy {
  /** Empty array to be populated with skill id's and information */
  skillsAvailable: Array<Skills> = [];

  /** Empty sets to be populated and used as options for skill form */
  formOptions: SkillOptions = {
    skillNames: new Set<string>(),
    skillLevels: new Set<string>(),
  };

  /** Empty skills form to be populated by user */
  addSkillsForm: FormGroup = this.fb.group({
    skill: ['', Validators.required],
    level: ['', Validators.required],
  });

  destroy$: Subject<boolean> = new Subject();

  /** @ignore */
  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    private _dialog: MatDialogService,
    private userService: GetUserDataService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.rs.getAllSkills(this.skillsAvailable, this.formOptions);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // ? should this be private ?
  /** {@link MatDialogService} */
  openDialog(template: TemplateRef<any>): void {
    this._dialog.openDialog(template);
    this._dialog.dialogRef
      ?.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.addSkillsForm.reset();
      });
  }

  // ? Should this be private ?
  /** {@link ModalControllerService} */
  closeDialog(): void {
    this._dialog.closeDialog();
  }

  /**
   * Selects and submits the correct skill id with user's username to be sent
   * to request handling service.
   * {@link RequestCenterService}
   *
   * Triggered on press of submit button.
   *
   * @param form completed form to be submitted
   */
  onSubmit(form: FormGroup | any): void {
    const skillName: string = JSON.stringify(form.value.skill).slice(1, -1);
    const skillLevel: string = JSON.stringify(form.value.level).slice(1, -1);
    let id: number = 0;
    this.skillsAvailable.forEach((element) => {
      if (
        element.skillName === skillName &&
        element.skillLevel === skillLevel
      ) {
        id = element.id;
      }
    });
    this.rs.addSkills(id, this.userService.getUsername());
  }
}
