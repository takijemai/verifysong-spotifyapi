import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults!: any[];
  query!: string;

  searchForm!: FormGroup;
  commentForm: any = {};
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.fb.group({
      name: new FormControl(''),
    });
  }

  searchSongs() {
    this.http
      .get<any[]>(
        `http://localhost:8083/buscar-canciones?nombre=${this.searchForm.value.name}`
      )
      .subscribe(
        (results) => {
          console.log('results', results);
          this.searchResults = results;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  // addComment(song: any) {
  //   const comment = prompt('Enter your comment');
  //   if (comment) {
  //     const data = { songId: song.id, comment: comment };
  //     this.http
  //       .post<any>(`http://localhost:8086/comments/${song.id}`, data)
  //       .subscribe((result) => {
  //         console.log('Comment added successfully');
  //       });
  //   }
  // }
  addComment(song: any, form: any) {
    const commentData = {
      songId: song.id,
      author: form.author,
      text: form.text,
      rating: form.rating,
    };
    console.log(commentData);

    this.http.post('http://localhost:8086/api/comments', commentData).subscribe(
      (response: any) => {
        console.log('Comment added successfully', response);
        Swal.fire('Success', 'Comment added successfully', 'success');
        form.author = '';
        form.text = '';
        form.rating = null;
      },
      (error: any) => {
        console.error('Error adding comment', error);
      }
    );
  }

  getStars(averageRating: number): number[] {
    const roundedRating = Math.round(averageRating);
    return Array(roundedRating).fill(0);
  }
}
