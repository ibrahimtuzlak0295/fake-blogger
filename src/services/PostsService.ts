import type { Post } from '@/types/Post';
import axios from 'axios';

export default {
  async getPosts() {
    const { data } = await axios.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return data;
  },
  async deletePost(postId: number) {
    const { data, status } = await axios.delete<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return { data, status };
  },
  async updatePost(post: Post) {
    const { data, status } = await axios.patch<Post>(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post
    );
    return { data, status };
  },
  async createPost(post: Post) {
    const { data, status } = await axios.post<Post>(
      `https://jsonplaceholder.typicode.com/posts`,
      post
    );
    return { data, status };
  },
};
