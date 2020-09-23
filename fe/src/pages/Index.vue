<template>
  <q-page class="flex flex-center">
    <!-- <div id="firebaseui-auth-container" class="text-center button-container" @click="startLogin"></div> -->
    <div id="firebaseui-auth-container" class="text-center button-container"></div>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted () {
    setTimeout(() => {
      this.$store.dispatch('auth/authenticate')
    }, 1000)
  }
}
</script>
