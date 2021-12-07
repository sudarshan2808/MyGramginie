import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HeaderService } from '../app.service';

@Component({
  selector: 'app-orders-pending',
  templateUrl: './orders-pending.component.html',
  styleUrls: ['./orders-pending.component.scss']
})
export class OrdersPendingComponent implements OnInit {

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns = ["Order ID", "Date", "Influencer", "Platform", "Job-Description", "Amount", "Confirmation"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public loginid:any="";

  constructor(private router:Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    if(!(localStorage.getItem('token')) || (localStorage.getItem('token')) == null || (localStorage.getItem('token')) == 'undefined'){
      this.loginid="";
      }else{
      this.loginid = localStorage.getItem('token');
    }
  }

  signOut() {
    localStorage.removeItem('token');
    this.headerService.updateHeader('loginheader');
    this.router.navigate(['/login']);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
  feedback: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 'Hydrogen', feedback: 1.0079},
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',status: 'Hydrogen', feedback: 1.0079},
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'Hydrogen', feedback: 1.0079 },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'Hydrogen', feedback: 1.0079 },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'Hydrogen', feedback: 1.0079 },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'Hydrogen', feedback: 1.0079 },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status: 'Hydrogen', feedback: 1.0079 },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status: 'Hydrogen', feedback: 1.0079 },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status: 'Hydrogen', feedback: 1.0079 },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status: 'Hydrogen', feedback: 1.0079 },
];

