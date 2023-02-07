import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonajesService } from '../services/personajes.service';

@Component({
  selector: 'app-per-add-edit',
  templateUrl: './per-add-edit.component.html',
  styleUrls: ['./per-add-edit.component.scss']
})
export class PerAddEditComponent implements OnInit {
  perForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private _perSerive: PersonajesService,
    private _dialogRed: MatDialogRef<PerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.perForm = this._fb.group({
      codigo: '',
      nombre: '',
      ciudad: '',
      poder: '',
    })
  }

  onFormSubmit() {
    if (this.perForm.valid) {
      if (this.data) {
        this._perSerive
          .putPersonaje(this.data.id, this.perForm.value)
          .subscribe({
            next: (val: any) => {
              //alert('Personaje Actualizado');
              this._dialogRed.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
      } else {
        this._perSerive.addPersonaje(this.perForm.value).subscribe({
          next: (val: any) => {
            //alert('Personaje agregado exitosamente');
            this._dialogRed.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }

    }
  }


  ngOnInit(): void {
    this.perForm.patchValue(this.data);
  }
}
