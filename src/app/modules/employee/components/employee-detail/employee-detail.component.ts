import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from "@angular/core";
import { EmployeeDetail } from "./employee-detail.model";
import { EmployeeDetailMock } from "./../../../../config/mock/employee-detail.mock";
import { TranslateService } from "src/app/core/services/translate/translate.service";
import { EmployeeService } from "../../services/employee.service";
import { Utils } from "./../../../../utilities/utilities";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.scss"]
})
export class EmployeeDetailComponent implements OnInit, OnChanges {
  @Input() employeeCode: string;
  @Input() isAddNew: boolean = false;
  @Output() cancelAddNewEmployee = new EventEmitter<number>();

  employee: EmployeeDetail;
  fieldLabels: string[];
  isEditMode: boolean = false;
  model: any = {};

  constructor(
    private ts: TranslateService,
    private employeeService: EmployeeService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isAddNew && changes.isAddNew.currentValue) {
      this.employee = Utils.resetFields(this.employee);
    } else {
      // TODO: REMOVE THE ELSE
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.employee = { ...EmployeeDetailMock };
    this.fieldLabels = Object.keys(this.employee);

    if (this.isAddNew) {
      this.isEditMode = false;
    }
  }

  saveEmployee() {
    this.employeeService.save(this.model).subscribe(
      data => {
        // this.alertService.success("Successfully Saved.");
        setTimeout(() => {
          //this.alertService.clear();
        }, 2000);
        this.model.name = "";
        this.model.rank = "";
        this.model.phonenumber = "";
        this.model.address = "";
        this.model.email = "";
        this.model.dob = "";
        this.model.contractnumber = "";
        this.model.npwp = "";
        this.model.bpjs = "";
        this.model.monthlysalary = "";
        this.model.workHour = "";
        this.model.annualLeave = "";
      },
      error => {
        //this.alertService.success("Serve Error ");
        setTimeout(() => {
          //this.alertService.clear();
        }, 2000);
      }
    );
  }
  navigateBack() {
    this.toggleEditMode();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.isAddNew = false;
  }

  deleteEmployee() {
    this.toggleEditMode();
  }

  cancelAddNew() {
    this.cancelAddNewEmployee.emit(0);
  }
}
