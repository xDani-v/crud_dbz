import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerAddEditComponent } from './per-add-edit/per-add-edit.component';
import { PersonajesService } from './services/personajes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Codigo', 'Nombre', 'Ciudad', 'Poder', 'Acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _perSerive: PersonajesService) { }

  ngOnInit(): void {
    this.getPersonajeList();
  }

  openFormulario() {
    const dialogRef = this._dialog.open(PerAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPersonajeList();
        }
      },
    });
  }

  getPersonajeList() {
    this._perSerive.getPersonajes().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this, this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deletePersonaje(id: number) {
    this._perSerive.deletePersonajes(id).subscribe({
      next: (res) => {
        //alert('eliminado exitosamente');
        this.getPersonajeList();
      },
      error: console.log,
    })
  }


  openEditForm(data: any) {
    const dialogRef = this._dialog.open(PerAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPersonajeList();
        }
      },
    });
  }


}
