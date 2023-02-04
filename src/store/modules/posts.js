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
    commit('SET_IS_FETCHING', true);

    PostsService.deletePost(post.id)
      .then((response) => {
        commit('DELETE_POST', { post });
      })
      .finally(() => commit('SET_IS_FETCHING', false));
  },

  async updatePost({ commit }, { post }) {
    commit('SET_IS_FETCHING', true);

    PostsService.updatePost(post)
      .then(() => commit('UPDATE_POST', { post }))
      .finally(() => commit('SET_IS_FETCHING', false));
  },

  async createPost({ commit }, { post }) {
    commit('SET_IS_FETCHING', true);

    PostsService.createPost(post)
      .then((response) => {
        commit('ADD_POST', { post: response.data });
      })
      .finally(() => commit('SET_IS_FETCHING', false));
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

  ADD_POST(state, { post }) {
    state.all.push(post);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
