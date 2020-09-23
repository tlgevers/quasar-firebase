// import axios from 'axios'
var firebase = require('firebase/app')
var firebaseui = require('firebaseui')
import 'firebase/auth'
import firebaseConfig from 'boot/firebase-auth'
import Models from 'src/models/index.js'

firebase.initializeApp(firebaseConfig)

const state = {
  authorized: null, // Boolean
  user: null, // Models.User
  authError: null,
  authenticating: false,
  credential: null
}

const mutations = {
  authorize (state) {
    state.authorized = true
  },
  unauthorize (state) {
    state.authenticating = false
    state.authorized = false
    state.credential = null
  },
  resetAuthorize (state) {
    state.authorized = null
  },
  setUser (state, user) {
    state.user = user
  },
  setAuthError (state, error) {
    state.authError = error
  },
  setAuthenticating (state, authenticating) {
    state.authenticating = authenticating
  },
  setCredential (state, credential) {
    state.credential = credential
  }
}

const getters = {
  authError: state => state.authError
}

const actions = {
  authenticate (context) {
    console.log('authenticated', state.authorized)
    if (state.authorized) this.$router.push('/authenticated')
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          context.commit('setAuthenticating', true)
          context.commit('setCredential', authResult.credential.idToken)
          return true
        }
      },
      signInSuccessUrl: '#/authenticated',
      signInOptions: [{
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        buttonColor: '#EBF4FF'
      }],
      signInFlow: 'popup'
    }

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  removeAuthorization (context) {
    context.commit('unauthorize')
  },
  startAuthenticating (context) {
    console.log('startAuthenticating')
    context.commit('setAuthenticating', true)
  },
  authSuccess (context) {
    console.log('calling authSuccess')
    const timesUp = 2700
    let countTime = 0
    setInterval(() => {
      countTime = countTime + 1
      if (countTime === timesUp) {
        console.log('timesUp')
        context.commit('resetAuthorize')
        this.$router.push('/auth')
      }
    }, 1000)
    var firebaseUser = firebase.auth().currentUser
    var user = new Models.User(firebaseUser)
    context.commit('setUser', user)
    // const axiosConfig = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization: 'Bearer ' + context.state.credential,
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // }
    // return new Promise((resolve, reject) => {
    //   axios.get('/reseller/', axiosConfig).then(res => {
    //     context.commit('authorize')
    //     console.log('res', res)
    //     resolve(res.data)
    //   }).catch(err => {
    //     console.log(err)
    //     if (err.response.status === 401 || err.response.status === 403) {
    //       context.commit('unauthorize')
    //       this.$router.push('/auth')
    //     }
    //     reject(err)
    //   })
    // })
    console.log('user', state.user)
  },
  getIdToken () {
    var tk = firebase.auth().currentUser.getIdToken()
    tk.then(t => {
      console.log('t', t)
      return t
    })
  },
  logOut (context) {
    context.commit('resetAuthorize')
    context.commit('setUser', null)
    context.commit('setCredential', null)
    context.commit('setAuthenticating', false)
    this.$router.push('/auth')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
