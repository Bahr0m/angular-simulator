import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { IPost } from '../post';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { PostService } from '../post.service';

@Component({
  selector: 'posts',
  imports: [TableModule, PaginatorModule, SkeletonModule, ContextMenuModule, DynamicDialogModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsPage implements OnInit {
  private postService: PostService = inject(PostService);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  rows: number = 10;
  first: number = 0;
  selectedPost: IPost | null = null;

  menuItems: MenuItem[] = [
    {
      label: 'View',
      command: () => {
        if (this.selectedPost) {
          this.router.navigate(['/posts', this.selectedPost.id]);
        }
      },
    },
    {
      label: 'Edit',
      command: () => {
        this.openEditDialog();
      },
    },
    {
      label: 'Delete',
      command: () => {
        if (this.selectedPost) {
          this.postService.removePost(this.selectedPost.id);
        }
      },
    },
  ];

  get posts(): IPost[] {
    console.log('Accessing posts:', this.postService.posts);
    return this.postService.posts;
  }

  get total(): number {
    return this.postService.total;
  }

  get loading(): boolean {
    return this.postService.loading;
  }

  ngOnInit() {
    this.postService.getPosts(this.rows, this.first);
  }

  onPageChange(event: TableLazyLoadEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.postService.getPosts(this.rows, this.first);
  }

  openEditDialog() {
    if (this.selectedPost) {
      this.dialogService.open(PostEditDialogComponent, {
        header: 'Edit Post',
        width: '50%',
        data: {
          post: this.selectedPost,
        },
      });
    }
  }
}
