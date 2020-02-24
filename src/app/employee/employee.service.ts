import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models';

@Injectable()
export class EmployeeService {    
 
public url = require("../apiurl.json");
private commonURL = this.url[0].apiurl+'employee/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(employee: Employee){
    console.log('service....');
    return this.http.post<Employee>(this.commonURL+'save',employee);
}

// Load 
load(){
    return this.http.get(this.commonURL+'load');
}

// get 
get(id:number){
    return this.http.get<Employee>(this.commonURL+'get?id='+id);
}

// Update 
update(employee: Employee){
    return this.http.put<Employee>(this.commonURL+'update',employee);

}

// Remove 
remove(employeecode:string){
    return this.http.delete<Employee>(this.commonURL+'remove?employeecode='+employeecode);
}
}
