import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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
    this.defaultColDef = {};
    this.gridOptions = {
      rowGroupPanelShow: 'always',
      columnDefs: [
        {
          field: 'Daypart Name',
        },
        {
          field: 'Daypart Type',
        },
        {
          field: 'Days',
        },
        {
          field: 'End Date',
          rowGroup: true,
          enableRowGroup: true,
          hide: false,
        },
        {
          field: 'End Time',
        },
        {
          field: 'End Week No',
        },
        {
          field: 'Length',
          rowGroup: true,
          enableRowGroup: true,
          hide: true,
        },
        {
          field: 'Sales Area',
        },
        {
          field: 'Sales Area Code',
        },
        {
          field: 'Start Date',
        },
        {
          field: 'Start Time',
        },
        {
          field: 'Start Week No',
        },
        {
          field: 'Target Area',
        },
        {
          field: 'Target Area Code',
        },
        {
          field: 'Withdrawn Length',
        },
        {
          field: 'HW - Base CPT',
        },
        {
          field: 'HW - Base CPT Actual',
        },
        {
          field: 'HW - CPT (Actual)',
        },
        {
          field: 'CPT',
        },
        {
          field: 'CPT Index',
        },
        {
          field: 'CPT Index (Actual)',
        },
        {
          field: 'Deal CPT',
        },
        {
          field: 'Deal CPT Index',
        },
        {
          field: 'Deal Net CPT Index',
        },
        {
          field: 'Net CPT',
        },
        {
          field: 'Net CPT Index',
        },
        {
          field: 'Net Deal CPT',
        },
        {
          field: 'HW - +/- Impacts',
        },
        {
          field: 'HW - +/- Impacts Excl Payback',
        },
        {
          field: 'HW - Base Impacts',
        },
        {
          field: 'HW - Base Impacts %',
        },
        {
          field: 'HW - Base Impacts (Actual)',
        },
        {
          field: 'HW - Base Impacts Exc PB',
        },
        {
          field: 'HW - Base Impacts(Actual) %',
        },
        {
          field: 'HW - Impacts',
        },
        {
          field: 'HW - Impacts %',
        },
        {
          field: 'HW - Impacts (Actual)',
        },
        {
          field: 'HW - Impacts Actual (A)',
        },
        {
          field: 'HW - Impacts Actual (P)',
        },
        {
          field: 'HW - Impacts Exc PB',
        },
        {
          field: 'HW - Impacts(Actual) %',
        },
        {
          field: 'HW - Outstanding Impacts',
        },
        {
          field: 'HW - Base CPP',
        },
        {
          field: 'HW - Base CPP Actual',
        },
        {
          field: 'HW - CPP (Actual)',
        },
        {
          field: 'CPP',
        },
        {
          field: 'CPP Index',
        },
        {
          field: 'CPP Index (Actual)',
        },
        {
          field: 'Deal CPP',
        },
        {
          field: 'Deal CPP Index',
        },
        {
          field: 'Deal Net CPP Index',
        },
        {
          field: 'Net CPP',
        },
        {
          field: 'Net CPP Index',
        },
        {
          field: 'Net Deal CPP',
        },
        {
          field: 'HW - Base Ratings',
        },
        {
          field: 'HW - Base Ratings %',
        },
        {
          field: 'HW - Base Ratings (Actual)',
        },
        {
          field: 'HW - Base Ratings Exc PB',
        },
        {
          field: 'HW - Base Ratings(Actual) %',
        },
        {
          field: 'HW - Ratings',
        },
        {
          field: 'HW - Ratings %',
        },
        {
          field: 'HW - Ratings (Actual)',
        },
        {
          field: 'HW - Ratings Exc PB',
        },
        {
          field: 'HW - Ratings(Actual) %',
        },
        {
          field: ' +/-  Ratings Exc PB',
        },
        {
          field: '+/- Base Ratings',
        },
        {
          field: '+/- Ratings',
        },
        {
          field: '+/- Ratings Value',
        },
        {
          field: '+/- Ratings Value Exc PB',
        },
        {
          field: 'Achieved %',
        },
        {
          field: 'Efficiency',
        },
        {
          field: 'Outs Exc PB',
        },
        {
          field: 'Outs',
        },
        {
          field: 'Outstanding Base Ratings',
        },
        {
          field: 'Outstanding Ratings',
        },
        {
          field: 'Weighted Efficiency',
        },
        {
          field: '+/- Base Revenue',
        },
        {
          field: 'Actual Revenue %',
        },
        {
          field: 'Length Weighted Budget',
        },
        {
          field: 'Nominal  Price',
        },
        {
          field: 'Revenue Booked',
        },
        {
          field: 'Revenue Booked %',
        },
        {
          field: 'Revenue Budget',
        },
        {
          field: 'Revenue Budget %',
        },
        {
          field: 'RPM',
        },
        {
          field: 'RPM (Actual)',
        },
        {
          field: '+/- Spots',
        },
        {
          field: 'Spots',
        },
        {
          field: 'Spots %',
        },
        {
          field: 'Spots (Actual)',
        },
        {
          field: 'Spots(Actual) %',
        },
        {
          field: 'Cost Per Spot',
        },
        {
          field: 'Net Cost Per Spot\r',
        },
      ],
      defaultColDef: {
        flex: 1,
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
