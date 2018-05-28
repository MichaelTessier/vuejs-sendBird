const SendBird = require('sendbird');
const sendBird = new SendBird({
  appId: 'F17D062D-F23B-4925-AC2B-616C194791CE'
})
var ChannelHandler = new sendBird.ChannelHandler();

export default {

  login(username, cb) {

    sendBird.connect(username, (user, error) => {
      cb(user, error)
    })

  },

  getChannel(channelUrl, cb) {

    sendBird.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        cb(channel, error)
        return
      }

      channel.enter((response, error) =>{
        cb(channel, error)
      })

    })
  },

  getChannelMessages(channel, messageNumber, cb) {

    const messageListQuery = channel.createPreviousMessageListQuery();
    messageNumber = messageNumber ? messageNumber : 10

    messageListQuery.load(messageNumber, false, (messageList, error) => {
      cb(messageList, error)
    })

  },

  getPreviousMessages(channel, earliestMessageTimestamp, limit, cb) {

    var messageListQuery = channel.createMessageListQuery();

    messageListQuery.prev(earliestMessageTimestamp, limit, false, function(messageList, error){
        cb(messageList, error);
    });
  },

  getChannelList(cb) {

    const openChannelListQuery = sendBird.OpenChannel.createOpenChannelListQuery();

    openChannelListQuery.next((channels, error) => {
        cb(channels, error)
    });

  },

  getChannelUsers(channel, cb) {

    var participantListQuery = channel.createParticipantListQuery();

    participantListQuery.next((participantList, error) => {
      cb(participantList, error)
    });
  },

  sendMessage(channel, message, cb) {
    
    channel.sendUserMessage(message,(message, error) => {
      cb(message, error)
    })

  },

  onMessageReceived(channel, cb) {
    
    ChannelHandler.onMessageReceived = (channel, message) => {
      cb(channel, message)
    }

    sendBird.addChannelHandler(channel, ChannelHandler)

  },

  onUserEntered(channel, cb) {
    
    ChannelHandler.onUserEntered = (channel, message) => {
      cb(channel, message)
    }

    sendBird.addChannelHandler(channel, ChannelHandler)

  }

}


