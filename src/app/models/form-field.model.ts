export interface FormField {
    type: 'text' | 'number' | 'email' | 'select' | 'checkbox' | 'date' | 'url';
    name: string;
    label: string;
    value?: any;
    options?: { key: string; value: string }[];
    validations?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        min?: number;
        max?: number;
    };
}
