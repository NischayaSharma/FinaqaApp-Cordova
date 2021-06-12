import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Healthcheck, QueryResponse } from './dtos.service';
import { HTTP } from '@ionic-native/http/ngx';

const URL = "https://beta.finaqa.com"
// const URL = "http://34.68.97.185:4000/"
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  options() {
    var headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    var options = { headers: headers }
    return options
  }

  getOrderId(orderOptions) {
    this.http.setHeader('*', 'Content-Type', 'application/json');
    this.http.useBasicAuth('rzp_test_RYec9ctuWSnty6','MwSfr3fyoSrein6VNOXE33Aw')
    return this.http.post('https://api.razorpay.com/v1/orders', orderOptions, null)
  }

  getCountryList() {
    return this.httpClient.get<any[]>('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code', this.options()).toPromise();
  }

  checkRisk() {
      var body = { "user": this.auth.$loginDetails }
    return this.httpClient.post(URL + '/RiskCustAnswer/isCustRiskQuestion', body, this.options())
  }

  getRisk() {
    return this.httpClient.get(URL + '/riskQuestionsMaster/apiListRiskQuestionAnswer', this.options())
  }

  submitRisk( answers) {
      var response = "["
      answers.forEach(element => {
        response += "{\"questionId\": "+element.questionId+", \"answerId\": "+element.answerId+"}"
        if (answers.length - 1 != answers.indexOf(element)) {
          response = response + ","
        }
      });
      response += "]"
    var user = "{\"loginType\":" + this.auth.$loginDetails.loginType + ", \"password\":" + this.auth.$loginDetails.password +", \"userId\":"+this.auth.$loginDetails.userId+"}"
      var body = {"data": response, "user":user}
      console.log("risk body ==>", body);
    return this.httpClient.post(URL + '/riskCustAnswer/apiAnswerRiskQuestions', body, this.options())
  }

  skipQuery(queryId) {
      var body = { "data": { "queryId": queryId }, "user": this.auth.$loginDetails }
    return this.httpClient.post(URL + '/queryHeader/apiSkipQuestion', body, this.options())
  }

  contactUs(name:string, phone:number, email:string, message:string, purpose:string){
    var body = {
      "data": {
        "name": name,
        "phone": phone,
        "emailId": email,
        "message": message,
        "purpose": purpose,
      }, 
      "user": ""
    }
    return this.httpClient.post(URL + '/home/apiContactUs', body, this.options())
  }

  updateProfile(formdata:FormData) {
    var headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json')
    var options = { headers: headers }
    return this.httpClient.post(URL + '/user/updateProfile', formdata, options)
  }

  sendDiscussion(formdata:FormData) {
    var headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json')
    var options = { headers: headers }
    return this.httpClient.post(URL + '/queryAnswer/apiAnswerToQuery', formdata, options)
  }

  closeQuery(queryId:number) {
      var body = { "data": { "queryId": queryId }, "user": this.auth.$loginDetails }
    return this.httpClient.post(URL + '/queryHeader/apiCloseQuery', body, this.options())
  }

  submitHealthCheck(healthCheck: Healthcheck) {
    var data = { "assetList": [{ "amt": healthCheck.assets.cash, "typeId": 1 }, { "amt": healthCheck.assets.equity, "typeId": 2 }, { "amt": healthCheck.assets.debt, "typeId": 3 }, { "amt": healthCheck.assets.realEstate, "typeId": 4 }, { "amt": healthCheck.assets.preciousMetals, "typeId": 5 }], "liabilityList": []}
    healthCheck.loan.forEach(element => {
      data.liabilityList.push({ "emiAmt": element.emi, "loanAmt": element.balance, "loanType": element.loanType, "percentageCharge": element.rate, "tenure": element.tenure })
    })
      var body = { "data": data, "user": this.auth.$loginDetails }
    return this.httpClient.post(URL + '/fhc/apiSubmitData', body, this.options())
  }

  payment(queryId) {
      var body = { "data": { "queryId": queryId }, "user": this.auth.$loginDetails }
    return this.httpClient.post(URL + '/bypassPg', body, this.options())
  }

  submitFeedback(queryId, rating) {
      var body = { "data": { "queryId": queryId, "rating": rating }, "user": this.auth.$loginDetails}
    return this.httpClient.post(URL + '/queryHeader/apiProvideFeedback', body, this.options())
  }

  uploadClientDocs(formdata:FormData) {
    var headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json')
    var options = { headers: headers }
    console.log(formdata);
    return this.httpClient.post(URL + '/queryHeader/apiCustDocUpload', formdata, options).toPromise()
  }

  getConsultantPayment() {
    var body = {
      "data": "",
      "user": this.auth.$loginDetails
    }
    return this.httpClient.post(URL + '/consultantPayments/apiPayments', JSON.stringify(body), this.options())
  }

  getClientPayment() {
    var body = {
      "data": "",
      "user": this.auth.$loginDetails
    }
    return this.httpClient.post( URL + '/customerPayment/apiGetPayments', JSON.stringify(body), this.options())
  }

  askQuery(queryResponse:QueryResponse){
    var meeting = ""
    if (queryResponse.meetings != undefined){
      queryResponse.meetings.forEach( element => {
        meeting = meeting + "{\"meeting_date\": \""+element.meetingDate+"\", \"meeting_time\": \""+element.meetingTime+"\", \"duration_min\": \""+element.durationMin+"\" }"
        if (queryResponse.meetings.length-1 != queryResponse.meetings.indexOf(element)) {
          meeting = meeting + ","
        }
      })
      console.log(meeting);
    }
      var body = {
        "data": "{\"categoryId\": " + queryResponse.categoryId + ", \"expectedResolution\": \"" + queryResponse.expectedResolution + "\", \"queryDesc\": \"" + queryResponse.queryDesc + "\", \"queryType\": " + queryResponse.queryType + ", \"subCategoryId\": " + queryResponse.subCategoryId + ", \"title\": \"" + queryResponse.title +"\",  \"meetings\": ["+ meeting +"]}",
        "user": this.auth.$loginDetails
      }
      console.log(body);
    return this.httpClient.post( URL + '/queryHeader/askQuestion', JSON.stringify(body), this.options())
  }


  getDiscussion(queryId:number) {
      var body = { "data": { "queryId":queryId }, "user": this.auth.$loginDetails }
    return this.httpClient.post( URL + '/queryAnswer/apiDiscussions', body, this.options())
  }

  getQueryCategories() {
    return this.httpClient.post( URL + '/skillCategoryMaster/apiCategories', this.options())
  }

  updateBankDetails(bankName, bankBranch, ifscCode, bankAcNum ) {
      console.log(this.auth.$loginDetails);
      var body = { "data":{"bankName":bankName, "bankBranch":bankBranch, "ifscCode":ifscCode, "bankAcNo":bankAcNum}, "user": this.auth.$loginDetails }
    return this.httpClient.post( URL + '/consultant/apiUpdateBankDetails', body, this.options())
  }

  consultantBankDetails(){
      console.log(this.auth.$loginDetails);
      var body = { "user": this.auth.$loginDetails }
    return this.httpClient.post( URL + '/consultant/apiGetBankDetails', body, this.options())
  }

  consultantLogin(email: string, password: string) {
      var body = { "data": { "conEmailId": email, "password": password } }
    return this.httpClient.post( URL + '/consultant/apiConsultantLogin', body, this.options())
  }

  clientLogin(email: string, password: string) {
      var body = { "data": { "emailId": email, "password": password } }
    return this.httpClient.post( URL + '/customer/apiCustLogin', body, this.options())
  }

  viewProfile() {
      var body = { "data": "", "user": this.auth.$loginDetails}
      console.log(body);
    return this.httpClient.post( URL + '/user/viewProfile', body, this.options()).toPromise()
  }

  changePass(newPass:string) {
      var body = { "data": {"changedPassword":newPass}, "user": this.auth.$loginDetails }
      console.log(body);
    return this.httpClient.post( URL + '/user/changePassword', body, this.options())
  }

  forgotPass(email:string) {
      var body = { "data": {"loginType":this.auth.$isClient? '2':'1',"emailId":email} }
      console.log(body);
    return this.httpClient.post( URL + '/user/forgotPassword', body, this.options())
  }

  register(email:string, password:string, name:string, dob:string, gender:string, phone:number, country:string, city:string, zipcode:number, occupation: number, skypeId:string, residentStatus: number, operatedAs:number){

    var body = { "data": { "emailId": email, "password": password, "customerName": name, "dob": dob, "gender": gender, "phone": phone, "country": country, "city": city, "zipcode": zipcode, "occupation": occupation, "skypeid": skypeId, "residentStatus": residentStatus, "operatedAs" : operatedAs } }
    console.log("Register Body ==>",body);
    return this.httpClient.post(URL + '/customer/apiCustRegister', body, this.options())
  }

  listQueries() {
      var body = { "data": "", "user": this.auth.$loginDetails }
      console.log(body);
    return this.httpClient.post( URL + '/queryHeader/apiDashboard', body, this.options())
  }

  constructor(private httpClient: HttpClient, private auth: AuthService, private http:HTTP) { }
}