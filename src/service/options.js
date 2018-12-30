export default {
  Ably: {
    name: 'Ably',
    options: {
      authUrl: '/auth/ably'
    }
  },
  Pusher: {
    name: 'Pusher',
    options: {
      cluster: 'ap1',
      authEndpoint: '/auth/pusher'
    }
  },
  PubNub: {
    name: 'PubNub',
    options: {
      publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
      ssl: true
    }
  }
}

