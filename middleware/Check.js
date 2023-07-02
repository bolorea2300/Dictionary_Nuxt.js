export default function ({ store, redirect }) {
  const check = store.getters['info']
  if (check.auth === false) {
    redirect('/login')
  }
}
