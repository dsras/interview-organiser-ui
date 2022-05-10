import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { SkillOptions, skills } from 'src/app/shared/models/types';

/**
 * Component for submiting new skills to users skill set
 */
@Component({
  selector: 'skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss'],
})
export class SkillsFormComponent implements OnInit {
  /** Empty array to be populated with skill id's and information */
  skillsAvailable: Array<skills> = [];

  /** Empty sets to be populated and used as options for skill form */
  formOptions: SkillOptions = {
    levels: new Set<string>(),
    names: new Set<string>(),
  };

  /** Empty skills form to be populated by user */
  addSkillsForm: FormGroup = this.fb.group({
    skill: ['', Validators.required],
    level: ['', Validators.required],
  });

  /** @ignore */
  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    private ms: ModalControllerService
  ) {}

  /** @ignore */
  ngOnInit(): void {
    this.rs.getAllSkills(
      this.skillsAvailable,
      this.formOptions    );
  }

  // ? should this be private ?
  /** {@link ModalControllerService} */
  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }

  // ? Should this be private ?
  /** {@link ModalControllerService} */
  closeModal(): void {
    this.ms.closeModal();
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
  onSubmit(form: FormGroup): void {
    let skillName: string = JSON.stringify(form.value.skill);
    let skillLevel: string = JSON.stringify(form.value.level);
    skillName = skillName.slice(1, -1);
    skillLevel = skillLevel.slice(1, -1);
    let id: number = 0;
    this.skillsAvailable.forEach((element) => {
      if (
        element.skillName === skillName &&
        element.skillLevel === skillLevel
      ) {
        id = element.id;
      }
    });
    this.rs.addSkills(id, this.rs.getUsername());
    form.reset();
  }
}
