import type { Post } from '@/types/Post';
import axios from 'axios';

export default {
  async getPosts() {
    const { data } = await axios.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return data;
  },
};
