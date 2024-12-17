import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class DynamicFormComponent implements OnInit {
  dynamicForm!: FormGroup;
  formFields: FormField[] = [
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      validations: {
        required: true,
        minLength: 3
      }
    },
    {
      type: 'email',
      name: 'email',
      label: 'Correo Electrónico',
      validations: {
        required: true
      }
    },
    {
      type: 'select',
      name: 'pais',
      label: 'País',
      options: [
        { key: 'es', value: 'España' },
        { key: 'mx', value: 'México' },
        { key: 'ar', value: 'Argentina' }
      ]
    },
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    // El formulario ya se ha creado en el constructor
  }

  createForm() {
    const formGroup: { [key: string]: FormControl } = {};
    
    this.formFields.forEach(field => {
      const validators = [];
      
      if (field.validations) {
        if (field.validations.required) {
          validators.push(Validators.required);
        }
        if (field.validations.minLength) {
          validators.push(Validators.minLength(field.validations.minLength));
        }
        if (field.validations.maxLength) {
          validators.push(Validators.maxLength(field.validations.maxLength));
        }
        if (field.validations.pattern) {
          validators.push(Validators.pattern(field.validations.pattern));
        }
      }

      formGroup[field.name] = new FormControl('', validators);
    });

    this.dynamicForm = this.fb.group(formGroup);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
    } else {
      this.markFormGroupTouched(this.dynamicForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  hasError(fieldName: string, errorType: string): boolean {
    const control = this.dynamicForm.get(fieldName);
    return control?.touched && control?.hasError(errorType) || false;
  }

  // Add new field dynamically
  addField(field: FormField) {
    this.formFields.push(field);
    const validators = [];
    
    if (field.validations?.required) {
      validators.push(Validators.required);
    }
    
    this.dynamicForm.addControl(field.name, this.fb.control('', validators));
  }

  // Remove field dynamically
  removeField(fieldName: string) {
    this.formFields = this.formFields.filter(field => field.name !== fieldName);
    this.dynamicForm.removeControl(fieldName);
  }
}
