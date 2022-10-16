import { createStore, createLogger } from 'vuex';
import posts from './modules/posts';
import users from './modules/users';

export default createStore({
  state: {},
  modules: {
    posts,
    users,
  },
  plugins: [createLogger()],
});
