import GoEasy from 'goeasy';

export default class Socket {
  private goEasy: GoEasy;
  private channelId: string;
  constructor(channelId: string) {
    this.channelId = channelId;
    this.goEasy = GoEasy.getInstance({
      host: 'hangzhou.goeasy.io',
      appkey: 'BC-2b065aa130814fd8b682c949dba1ed37',
      modules: ['pubsub'],
    });
  }

  public connectGoEasy(peerId: string) {
    this.goEasy.connect({
      id: peerId,
      data: {
        avatar: `https://api.multiavatar.com/${peerId}.png`,
        peerId: peerId,
      },
      onProgress: (attempts: any) => {
        console.log('连接或自动重连中!', attempts);
      },
      onSuccess: () => {
        console.log('连接成功!');
      },
      onFailed: (error: { code: string; content: string }) => {
        console.log('连接失败:' + error.code + ',error:' + error.content);
      },
    });
  }

  public subscribe() {
    this.goEasy.pubsub.subscribe({
      channel: this.channelId,
      presence: {
        enable: true,
      },
      onMessage: (message: { content: string; channel: string }) => {
        console.log(`收到消息: ${message.channel} - ${message.content}`);
      },
      onSuccess: () => {
        console.log('订阅成功!');
      },
      onFailed: (error: { code: string; content: string }) => {
        console.log(
          '订阅失败，错误编码：' + error.code + ' 错误信息：' + error.content
        );
      },
    });
  }

  public unSubcribe() {
    this.goEasy.pubsub.unsubscribe({
      channel: this.channelId,
      onSuccess: function () {
        alert('订阅取消成功。');
      },
      onFailed: function (error: any) {
        alert(
          '取消订阅失败，错误编码：' +
            error.code +
            ' 错误信息：' +
            error.content
        );
      },
    });
  }

  public disconnect(peerId: string) {
    //断开连接
    this.goEasy.disconnect({
      onSuccess: function () {
        console.log('GoEasy disconnect successfully.');
      },
      onFailed: function (error: any) {
        console.log(
          'Failed to disconnect GoEasy, code:' +
            error.code +
            ',error:' +
            error.content
        );
      },
    });
  }

  public subscribePresence(onPresence: (presenceEvent: any) => void) {
    this.goEasy.pubsub.subscribePresence({
      channel: this.channelId,
      membersLimit: 1,
      onPresence: onPresence,
      onSuccess: function () {
        console.log('监听成功!');
      },
      onFailed: function (error: { code: string; content: string }) {
        console.log('监听失败 code:' + error.code + ',error:' + error.content);
      },
    });
  }

  public sendMessage(message: any) {
    if (message) {
      this.goEasy.pubsub.publish({
        channel: this.channelId,
        message: message,
        onSuccess: () => {
          console.log('消息发布成功!');
        },
        onFailed: (error: { code: string; content: string }) => {
          console.log(
            '消息发送失败，错误编码：' +
              error.code +
              ' 错误信息：' +
              error.content
          );
        },
      });
    }
  }

  public getNewer() {
    this.goEasy.pubsub.hereNow({
      channel: this.channelId,
      limit: 2,
      onSuccess: function (response: {}) {
        console.log('hereNew response: ' + JSON.stringify(response)); //json格式的response
      },
      onFailed: function (error: { code: string; content: string }) {
        //获取失败
        console.log(
          'Failed to obtain online clients, code:' +
            error.code +
            ',error:' +
            error.content
        );
      },
    });
  }
}
