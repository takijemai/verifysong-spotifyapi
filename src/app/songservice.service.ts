import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SongserviceService {
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  deleteComment(songId: number, commentId: number) {
    return this.http.delete(
      `${this.apiUrl}/songs/${songId}/comments/${commentId}`
    );
  }
}
