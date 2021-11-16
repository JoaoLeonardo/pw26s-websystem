import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const ArtigoDescricaoValidator: ValidatorFn = (descricaoControl: AbstractControl): ValidationErrors | null => {
    if (descricaoControl && descricaoControl.value) {
        return (descricaoControl.value as string).length > 140 ? { descricaoMaiorQueMax: true } : null;
    }

    return null;
};
