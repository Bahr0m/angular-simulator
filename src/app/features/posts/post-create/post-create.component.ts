import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IPost } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  private postService = inject(PostService);
  private router = inject(Router);

  formPost = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    tags: new FormControl(''),
    views: new FormControl(0),
    userId: new FormControl(1),
    likes: new FormControl(0),
    dislikes: new FormControl(0),
  });

  async createPost() {
    const formValues = this.formPost.getRawValue();
    const newPost: IPost = {
      id: 0,
      title: formValues.title ?? '',
      body: formValues.body ?? '',
      tags: (formValues.tags ?? '').split(',').map((tag) => tag.trim()),
      reactions: {
        likes: formValues.likes ?? 0,
        dislikes: formValues.dislikes ?? 0,
      },
      views: formValues.views ?? 0,
      userId: formValues.userId ?? 1,
    };
    await this.postService.createPost(newPost);
    this.router.navigate(['/posts']);
  }
}
