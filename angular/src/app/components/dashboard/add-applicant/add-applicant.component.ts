import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { skills } from 'src/app/constants/types';
import { ModalControllerService } from 'src/app/services/modal-controller.service';
@Component({
  selector: 'add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.scss']
})
export class AddApplicantComponent implements OnInit {

  skillsAvailable: skills[] = [];

  skillNamesAvailable: Set<string> = new Set<string>();

  skillLevels: Set<string> = new Set<string>();

  addApplicantForm: FormGroup = this.fb.group({
    name: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    }),
    email: ['', Validators.required, Validators.email],
    mobile: ['', Validators.minLength(3)],
    skill: this.fb.group({
      skillName: [''],
      skillLevel: [''],
    }),
  })

  constructor(
    private fb: FormBuilder,
    private ms: ModalControllerService,
    private rs: RequestCenterService,
  ) { }

  ngOnInit(): void {
    // TODO maybe put in parent as an input/output relationship
    this.rs.getAllSkills(this.skillsAvailable, this.skillNamesAvailable, this.skillLevels);
  }

  openModal(template: TemplateRef<any>): void {
    this.ms.openModal(template);
  }

  closeModal(): void {
    this.ms.closeModal();
  }


  onSubmit(f: FormGroup): void {
    this.addApplicantForm.setValue(f.value)
    //TODO this.rs.addApplicant(f.value.attribute, **) 
    console.log(f.value)
    this.addApplicantForm.reset()
  }

}


