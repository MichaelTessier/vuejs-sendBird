const SendBird = require('sendbird')
const sendBird = new SendBird({
  appId: 'F17D062D-F23B-4925-AC2B-616C194791CE'
})
const ChannelHandler = new sendBird.ChannelHandler()

export default {

  login (username) {

    return new Promise((resolve, reject) => {
      return sendBird.connect(username, (user, error) => {
        if (error) reject(error)
        resolve(user)
      })
    })

  },

  getChannel (channelUrl) {

    return new Promise((resolve, reject) => {
      return sendBird.OpenChannel.getChannel(channelUrl, (channel, error) => {
        if (error) reject(error)
        channel.enter()
        resolve(channel)
      })
    })

  },

  exitChannel (channelUrl) {

    return new Promise((resolve, reject) => {
      return sendBird.OpenChannel.getChannel(channelUrl, (channel, error) => {
        if (error) reject(error)
        channel.exit()
        resolve(channel)
      })
    })

  },

  getChannelMessages (channel, messageNumber) {

    const messageListQuery = channel.createPreviousMessageListQuery()
    messageNumber = messageNumber || 10

    return new Promise((resolve, reject) => {
      return messageListQuery.load(messageNumber, false, (messageList, error) => {
        if (error) reject(error)
        resolve(messageList)
      })
    })
  },

  getPreviousMessages(channel, earliestMessageTimestamp, limit) {

    const messageListQuery = channel.createMessageListQuery()

    return new Promise((resolve, reject) => {
      return messageListQuery.prev(earliestMessageTimestamp, limit, false, (messageList, error) => {
        if (error) reject(error)
        resolve(messageList)
      })
    })

  },

  getChannelList() {

    const openChannelListQuery = sendBird.OpenChannel.createOpenChannelListQuery()

    return new Promise((resolve, reject) => {
      return openChannelListQuery.next((channels, error) => {
        if (error) reject(error)
        resolve(channels)
      })
    })

  },

  getChannelUsers(channel) {

    const participantListQuery = channel.createParticipantListQuery()

    return new Promise((resolve, reject) => {
      return participantListQuery.next((participantList, error) => {
        if (error) reject(error)
        resolve(participantList)
      })
    })

  },

  sendMessage(channel, message) {

    return new Promise((resolve, reject) => {
      return channel.sendUserMessage(message, (message, error) => {
        if (error) reject(error)
        resolve(message)
      })
    })

  },

  onMessageReceived(channel, cb) {

    ChannelHandler.onMessageReceived = (channel, message) => {
      cb(channel, message)
    }

    sendBird.addChannelHandler(channel, ChannelHandler)

  },

  onUserEntered(channel, cb) {

    ChannelHandler.onUserEntered = (channel, user) => {
      console.log('onUserEntered', channel, user)
      cb(channel, user)
    }

    sendBird.addChannelHandler(channel, ChannelHandler)

  },

  onUserExited(channel, cb) {

    ChannelHandler.onUserExited = (channel, user) => {
      console.log('onUserExited', channel, user)
      cb(channel, user)
    }

    sendBird.addChannelHandler(channel, ChannelHandler)

  }

}
