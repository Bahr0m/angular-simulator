import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../post';

@Component({
  selector: 'post-detail',
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  currentPost: IPost | undefined;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log('Post data from resolver:', data['post']);
      this.currentPost = data['post'];
    });
  }
}
