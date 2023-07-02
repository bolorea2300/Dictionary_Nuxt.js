export const state = () => ({
  auth: false,
  token: null,
  user: null,
})

export const mutations = {
  setAuth(state, { token, user }) {
    state.auth = true
    state.token = token
    state.user = user
  },

  logout(state) {
    state.auth = false
    state.token = null
    state.user = null
  },
}

export const getters = {
  info(state) {
    return state
  },
}

export const actions = {
  async Auth_Check({ commit }) {
    const url = '/api/auth/check'

    await this.$axios
      .$get(url)
      .then((res) => {
        commit('setAuth', { token: res.access_token, user: res.user })
      })
      .catch((error) => {
        console.log('ログインできませんでした。')
      })
  },
}
