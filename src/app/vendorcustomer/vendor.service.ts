import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../_models';

@Injectable()
export class VendorService {    

public url = require("../apiurl.json");
private commonURL = this.url[0].apiurl+'vendor/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(vendor: Vendor){
    console.log('service....');
    return this.http.post<Vendor>(this.commonURL+'save',vendor);
}

// Load 
load(){
    console.log("Load vendor service..");
    return this.http.get(this.commonURL+'load');
}

// Load 
loadvendornamecode(){
    console.log("loadvendornamecode service..");
    return this.http.get(this.commonURL+'loadvendornamecode');
}



// get 
get(id:number){
    return this.http.get<Vendor>(this.commonURL+'get?id='+id);
}

// Update 
update(vendor: Vendor){
    return this.http.put<Vendor>(this.commonURL+'update',vendor);

} 

// Remove 
remove(vendorcode:string){
    return this.http.delete<Vendor>(this.commonURL+'remove?vendorcode='+vendorcode);
}
}
