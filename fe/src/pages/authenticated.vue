<template>
  <q-page padding>
    <!-- content -->
    SUCCESS, authenticated
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted () {
    console.log('authenticated success page')
    this.$store.dispatch('auth/authSuccess')
  }
}
</script>
