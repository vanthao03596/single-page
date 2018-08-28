import Echo from 'laravel-echo'

try {
  window.$ = window.jQuery = require('jquery')

  require('bootstrap')
} catch (e) {}

window.Velocity = require('velocity-animate')
// require('vue2-animate/dist/vue2-animate.min.css')

// window.Pusher = require('pusher-js')

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: '4feb05b793d9599a1894',
//   cluster: 'ap1',
//   encrypted: true
// })

window.io = require('socket.io-client')
// Have this in case you stop running your laravel echo server
if (typeof io !== 'undefined') {
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
  })
}
