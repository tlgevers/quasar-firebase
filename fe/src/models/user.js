class User {
  constructor (user) {
    this.email = user.email // string
    this.displayName = user.displayName // string
    this.photoURL = user.photoURL // string
    this.domain = user.email.split('@')[1] // string
  }
}

export default User
