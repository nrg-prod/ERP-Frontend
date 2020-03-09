import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Employee } from "../../../_models";
import { environment } from "src/environments/environment";

import { API_ENDPOINTS } from "./../empployee.config";

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  save(employee: Employee) {
    console.log("save employee service");
    return this.http.post<Employee>(
      `${environment.apiUrl}${API_ENDPOINTS.saveEmployee}`,
      employee
    );
  }

  load() {
    return this.http.get(`${environment.apiUrl}${API_ENDPOINTS.allEmployees}`);
  }

  get(id: number) {
    return this.http.get<Employee>(
      `${environment.apiUrl}${API_ENDPOINTS.getEmployee}`.replace(
        "{param}",
        id.toString()
      )
    );
  }

  update(employee: Employee) {
    return this.http.put<Employee>(
      `${environment.apiUrl}${API_ENDPOINTS.updateEmployee}`,
      employee
    );
  }

  remove(employeecode: string) {
    return this.http.delete<Employee>(
      `${environment.apiUrl}${API_ENDPOINTS.remove}`.replace(
        "{param}",
        employeecode
      )
    );
  }
}
