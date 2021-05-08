import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;
  description: string;
  notes = [];
  done_notes=[]

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.refreshNotesList();
  }

  refreshNotesList() {
    // Subscribe to a GET Request
    this.notes = [];
    this.authService.getAllNotesRequest().subscribe((data) => {
      if (data.success) {
        let notes = data.notes;
        notes.forEach((task) => {
          this.notes.push(task);
        });
        console.log(this.notes);
        // console.log(this.done_tasks);
      }
    });
  }

  addNewNote() {
    console.log(this.title);
    console.log(this.description);

    const obj = {
      title: this.title,
      description: this.description
    };
    // HTTP Request - POST
    this.authService.addNewNoteRequest(obj).subscribe((data) => {
      if (data.success) {
        console.log('Note Added');
        this.refreshNotesList();
      } else {
        console.log('Note Not Added.');
        console.log(data.message);
      }
    });
  }


  deleteNote(note) {
    console.log(note);
    // HTTP: Delete
    this.authService.deleteNoteRequest(note).subscribe((data) => {
      if (data.success) {
        this.done_notes.push(note);
        this.refreshNotesList();
      } else {
        console.log(data.message);
      }
    });
  }

}
