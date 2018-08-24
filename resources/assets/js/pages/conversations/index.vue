<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-5">
        <add-conversation></add-conversation>
        <conversations></conversations>
      </div>
      <div class="col-sm-7">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ConversationDashboard',

  data() {
    return {}
  }
}
</script>

