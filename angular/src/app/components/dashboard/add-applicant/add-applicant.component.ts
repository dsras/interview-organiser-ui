import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestCenterService } from '../../requester/request-center.service';

@Component({
  selector: 'add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.scss']
})
export class AddApplicantComponent implements OnInit {

  modalRef?: BsModalRef

  addApplicantForm: FormGroup = this.fb.group({
    name: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    }),
    email: ['', Validators.required, Validators.email],
    mobile: ['', Validators.minLength(3)],
    skill: [''],    
  })

  constructor(
    private fb: FormBuilder,
    private ms: BsModalService,
    private rs: RequestCenterService,
  ) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ms.show(template);
  }

  
  onSubmit(f: FormGroup) {
    this.addApplicantForm.setValue(f.value)
    //TODO this.rs.addApplicant(f.value.attribute, **) 
    console.log(f.value)
    this.addApplicantForm.reset()
  }

}


