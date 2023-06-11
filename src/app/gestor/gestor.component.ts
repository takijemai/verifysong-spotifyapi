import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css'],
})
export class GestorComponent implements OnInit {
  song: any = {};
  songForm!: FormGroup;
  songId!: number;
  songFound: boolean = false;
  comments!: any[];
  constructor(private http: HttpClient, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.songForm = this.createFormGroup();
  }

  get getControl() {
    return this.songForm.controls;
  }

  addSong() {
    this.http
      .post('http://localhost:8084/songs', this.songForm.value)
      .subscribe(
        () => {
          console.log('Song added successfully');
          Swal.fire('Success', 'The song added successfully', 'success');
          this.songForm.reset();
        },
        (error) => {
          //console.log('Error while adding song:', error);
        }
      );
  }

  onDeleteComment(songId: number, commentId: number): void {
    this.http
      .post<any>(
        `http://localhost:8085/eliminar-comentario?commentId=${commentId}`,
        {}
      )
      .subscribe(
        (data) => {
          console.log('deleted success');
        },
        (err) => {
          console.log(err);
        }
      );
  }
  searchSong() {
    this.http
      .get<any>(`http://localhost:8085/comments?songId=${this.songId}`)
      .subscribe((response) => {
        this.songFound = true;
        this.song = response[0].song;
        console.log(this.song);
        this.comments = response;
        console.log(this.comments);
      });
  }
  deleteComment(commentId: number) {
    this.http
      .delete<any>(
        `http://localhost:8085/eliminar-comentario?commentId=${commentId}`
      )
      .subscribe((data) => {
        console.log(data);
        this.searchSong();
      });
  }

  createFormGroup() {
    return this.fb.group({
      name: new FormControl(''),
      year: new FormControl(''),
      averageRating: new FormControl(''),
      artistGroup: new FormControl(''),
      coverPhotoUrl: new FormControl(''),
    });
  }
}
