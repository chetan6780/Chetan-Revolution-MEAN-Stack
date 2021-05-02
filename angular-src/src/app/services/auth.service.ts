import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'; // make asyncronous calls,wait till get request

interface data {
  success: boolean;
  message: string;
  // title: string;
  // description: string;
  note: object;
  notes: [any];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }


  
  addNewNoteRequest(obj) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post<data>('http://localhost:3000/note', obj, { headers: headers })
      .pipe(map((res) => res));
  }

  getAllNotesRequest() {
    return this.http
      .get<data>('http://localhost:3000/note')
      .pipe(map((res) => res));
  }

  deleteNoteRequest(obj) {
    return this.http
      .delete<data>('http://localhost:3000/note', { params: obj })
      .pipe(map((res) => res));
  }
}
