import { AbstractControl } from "@angular/forms"

export class isOlder {
  static age(control: AbstractControl) {
    const bornDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - bornDate.getFullYear();

    if (age < 18) {
      return { age: true };
    } else {
      console.log(age)
      return null
    }
  }
}