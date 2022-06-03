import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators'

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public getNews(): Observable<Article[]>{
    return this.executeQuery<NewsResponse>(`/top-headlines?country=us&category=business`)
      .pipe(
        map(res => res.articles)
      );
  }

  public getEncabezadosByCategory(category: string): Observable<Article[]> {
    return this.executeQuery<NewsResponse>(`/top-headlines?country=us&category=${category}`)
      .pipe(
        map(res => res.articles)
      );
  }

  private executeQuery<T>(endpoint: string) {
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey: apiKey,
        country: 'us'
      }
    });
  }

}
