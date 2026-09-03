import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../post';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnDestroy {
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);
  private postService = inject(PostService);
  post: IPost = this.config.data.post;

  editForm = new FormGroup({
    title: new FormControl(this.post.title),
    body: new FormControl(this.post.body),
    tags: new FormControl(this.post.tags.join(', ')),
  });

  constructor(public dialogService: DialogService) {}

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  savePost() {
    const formValues = this.editForm.value;

    const updatedPost: IPost = {
      ...this.post,
      title: formValues.title || this.post.title,
      body: formValues.body || this.post.body,
      tags: formValues.tags ? formValues.tags.split(',').map((tag) => tag.trim()) : this.post.tags,
    };

    this.postService.updatePost(updatedPost);
    this.ref.close(updatedPost);
  }
}
