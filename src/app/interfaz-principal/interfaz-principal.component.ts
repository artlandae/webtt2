
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';
import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-interfaz-principal',
//   standalone: true,
//   imports: [RouterLink, RouterOutlet],
//   templateUrl: './interfaz-principal.component.html',
//   styleUrl: './interfaz-principal.component.css',
//   template: `
//   <ul>
//     <li *ngFor="let post of posts">{{ post.title }}</li>
//   </ul>
// `
// })
// export class InterfazPrincipalComponent {
//   constructor(private _matDialog: MatDialog) {}
//   abrirModal():void {
//     this._matDialog.open(VentanaModalComponent, {
//       width:'1200px'
//     })
//   }
// }

interface Post {
  id: number;
  title: string;
  releaseDate: string;
}

@Component({
  selector: 'app-interfaz-principal',
  template: `
    <ul>
      <li *ngFor="let post of posts">{{ post.title }}</li>
    </ul>
  `
})

export class InterfazPrincipalComponent implements OnInit {
  posts: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Post[]>('http://localhost:3000/posts')
    .subscribe((response: Post[]) => {
      this.posts = response;
    });
  }
}

