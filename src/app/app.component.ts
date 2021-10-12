import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

interface IBookingListImportItem {
  'Campaign Number': string;
  'External reference': string;
  'Sales Area Code': string;
  'Break Date': string;
  Length: string;
  Sequence: string;
  'Industry Code': string;
  'Copy Code': string;
  'Protected Copy': string;
  'Spot Number': string;
  Tolerance: string;
}

@Component({
  selector: 'my-app',
  template: `
    <ag-grid-angular
      #agGrid
      style="width: 100vw; height: 100vh;"
      id="myGrid"
      class="ag-theme-alpine"
      [defaultColDef]="defaultColDef"
      [rowData]="monitorData"
      [frameworkComponents]="frameworkComponents"
      [gridOptions]="gridOptions"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  private gridOptions;
  private columnDefs;
  private defaultColDef;
  private gridOptionsApi;

  private monitorData = [];

  constructor(private httpClient: HttpClient) {
    this.defaultColDef = {
      width: 120,
      sortable: true,
      resizable: true,
    };
    this.gridOptions = {
      rowGroupPanelShow: 'always',
      suppressAggFuncInHeader: true,
      rowHeight: 34,
      rowSelection: 'multiple',
      checkboxSelection: true,
      autoGroupColumnDef: {
        headerName: '',
        minWidth: 220,
        cellRendererParams: {
          suppressCount: true,
          checkbox: false,
        },
      },
      columnDefs: [
        {
          width: 50,
          checkboxSelection: true,
        },
        {
          headerName: '',
          children: [
            {
              field: 'Target Area',
              enableRowGroup: true,
            },
            {
              field: 'Sales Area',
            },

            {
              field: 'Daypart Type',
              hide: true,
            },
            {
              field: 'Days',
              hide: true,
            },
            {
              field: 'Length',
              rowGroup: true,
              enableRowGroup: true,
            },
            {
              field: 'Start Date',
              rowGroup: true,
              enableRowGroup: true,
            },
            {
              field: 'End Date',
              rowGroup: true,
              enableRowGroup: true,
            },
            {
              field: 'Start Time',
            },
            {
              field: 'End Time',
            },
          ],
        },
        {
          headerName: 'Ratings',
          children: [
            {
              field: 'HW - Ratings',
              aggFunc: 'roundSum',
            },
            {
              field: 'HW - Ratings %',
              aggFunc: 'roundSum',
            },
            {
              field: 'HW - Ratings (Actual)',
              aggFunc: 'roundSum',
            },
            {
              field: 'HW - Ratings Exc PB',
              aggFunc: 'roundSum',
            },
          ],
        },
        {
          headerName: 'Spots',
          children: [
            {
              field: 'Spots (Actual)',
              aggFunc: 'roundSum',
            },
          ],
        },
      ],
      defaultColDef: {
        flex: 1,
        enableRowGroup: true,
      },
      aggFuncs: {
        // this overrides the grids built-in sum function
        roundSum: (params) => {
          let sum = 0;
          params.values.forEach((value) => (sum += value));
          return Math.round(sum * 100) / 100;
        },
      },
    };
  }

  ngOnInit() {
    this.httpClient
      .get<any>('assets/campaign-760416.json')
      .subscribe((data) => {
        console.log('data recieved');

        this.monitorData = data;
        console.log(this.monitorData);

        this.gridApi.setRowData(this.monitorData);
      });
  }

  onGridReady(params) {
    console.log('grid ready');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptionsApi = this.gridOptions.api;
  }
}
