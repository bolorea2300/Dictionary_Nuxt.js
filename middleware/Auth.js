export default async function ({ store }) {
  await store.dispatch('Auth_Check')
}
