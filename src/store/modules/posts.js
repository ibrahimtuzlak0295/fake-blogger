import PostsService from '@/services/PostsService';

// initial state
const state = {
  all: [],
  isFetching: true,
};

// getters
const getters = {
  getPosts: (state) => state.all,
  getIsFetching: (state) => state.isFetching,
  getPost: (state) => (postId) => {
    const itemIndex = state.all.findIndex((item) => item.id === postId);

    return state.all[itemIndex];
  },
};

// actions
const actions = {
  async fetchPosts({ commit }) {
    commit('SET_IS_FETCHING', true);
    PostsService.getPosts()
      .then((posts) => {
        commit('SET_POSTS', posts);
      })
      .catch((e) => {
        // TODO: Handle/commit error
      })
      .finally(() => {
        commit('SET_IS_FETCHING', false);
      });
  },

  async deletePost({ commit }, { post }) {
    // PostsService.deletePost(post.id).then(() => ... commit())
    commit('DELETE_POST', { post });
  },

  async updatePost({ commit }, { post }) {
    // PostsService.updatePost(post.id).then(() => ... commit() )
    commit('UPDATE_POST', { post });
  },

  async createPost({ commit }, { postData }) {
    // PostsService.createPost(post).then(() => ... commit() )

    commit('ADD_POST', { postData });
  },
};

// mutations
const mutations = {
  SET_POSTS(state, posts) {
    state.all = posts;
  },

  SET_IS_FETCHING(state, value) {
    state.isFetching = value;
  },

  UPDATE_POST(state, { post }) {
    const itemIndex = state.all.findIndex((item) => item.id === post.id);
    state.all[itemIndex] = post;
  },

  DELETE_POST(state, { post }) {
    const itemIndex = state.all.findIndex((item) => item.id === post.id);
    state.all.splice(itemIndex, 1);
  },

  ADD_POST(state, { postData }) {
    const lastPostId = state.all.slice(-1)[0].id;

    state.all.push({
      id: lastPostId + 1,
      userId: 1,
      title: postData.title,
      body: postData.body,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
