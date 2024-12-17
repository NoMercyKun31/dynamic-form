import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormField } from './models/form-field.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `
    <div class="app-container">
      <div class="form-container">
        <div class="form-header">
          <div class="header-content">
            <h1>Formulario Dinámico</h1>
            <p>Crea tu formulario personalizado agregando los campos que necesites</p>
          </div>
          <div class="header-decoration"></div>
        </div>
        
        <app-dynamic-form></app-dynamic-form>
        
        <div class="button-container">
          <h3>Agregar Campos</h3>
          <div class="button-grid">
            <button class="btn add-field" (click)="addPhoneField()">
              <i class="fas fa-phone"></i>
              <span>Teléfono</span>
            </button>
            <button class="btn add-field" (click)="addEmailField()">
              <i class="fas fa-envelope"></i>
              <span>Email</span>
            </button>
            <button class="btn add-field" (click)="addDateField()">
              <i class="fas fa-calendar"></i>
              <span>Fecha</span>
            </button>
            <button class="btn add-field" (click)="addUrlField()">
              <i class="fas fa-link"></i>
              <span>URL</span>
            </button>
          </div>
          <button class="btn remove-field" (click)="removeLastField()">
            <i class="fas fa-trash"></i>
            <span>Eliminar Último Campo</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

    :host {
      font-family: 'Poppins', sans-serif;
    }

    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .form-container {
      width: 100%;
      max-width: 800px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .form-header {
      position: relative;
      padding: 2rem;
      background: white;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      .header-content {
        position: relative;
        z-index: 2;
      }

      .header-decoration {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(45deg, #667eea22 25%, transparent 25%) -40px 0,
                    linear-gradient(-45deg, #764ba222 25%, transparent 25%) -40px 0;
        background-size: 80px 80px;
        opacity: 0.1;
      }

      h1 {
        color: #2d3748;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        color: #718096;
        font-size: 1.1rem;
        font-weight: 300;
      }
    }

    .button-container {
      padding: 2rem;
      background: #f7fafc;
      border-top: 1px solid rgba(0, 0, 0, 0.1);

      h3 {
        color: #4a5568;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        text-align: center;
      }

      .button-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
    }

    .btn {
      padding: 1rem;
      border: none;
      border-radius: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;

      i {
        font-size: 1.5rem;
      }

      &.add-field {
        background: white;
        color: #4a5568;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
        }
      }

      &.remove-field {
        background: #fff5f5;
        color: #c53030;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        margin-top: 1rem;
        border: 1px solid #feb2b2;

        &:hover {
          background: #fc8181;
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(252, 129, 129, 0.3);
        }
      }
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 1rem;
      }

      .form-header {
        h1 {
          font-size: 2rem;
        }
      }

      .button-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class AppComponent {
  title = 'dynamic-form';

  @ViewChild(DynamicFormComponent) formComponent!: DynamicFormComponent;

  addPhoneField() {
    const phoneField: FormField = {
      type: 'text',
      name: 'phone_' + Date.now(),
      label: 'Teléfono',
      validations: {
        required: true,
        pattern: '^[0-9]{9}$'
      }
    };
    this.formComponent.addField(phoneField);
  }

  addEmailField() {
    const emailField: FormField = {
      type: 'email',
      name: 'email_' + Date.now(),
      label: 'Correo Electrónico',
      validations: {
        required: true,
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      }
    };
    this.formComponent.addField(emailField);
  }

  addDateField() {
    const dateField: FormField = {
      type: 'date',
      name: 'date_' + Date.now(),
      label: 'Fecha',
      validations: {
        required: true
      }
    };
    this.formComponent.addField(dateField);
  }

  addUrlField() {
    const urlField: FormField = {
      type: 'url',
      name: 'url_' + Date.now(),
      label: 'URL',
      validations: {
        required: true,
        pattern: '^https?://[\\w\\d.-]+\\.[a-z]{2,}(?:/.*)?$'
      }
    };
    this.formComponent.addField(urlField);
  }

  removeLastField() {
    const fields = this.formComponent.formFields;
    if (fields.length > 0) {
      const lastField = fields[fields.length - 1];
      this.formComponent.removeField(lastField.name);
    }
  }
}
