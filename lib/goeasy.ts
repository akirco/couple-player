import GoEasy from 'goeasy';
import { nanoid } from 'nanoid';

export default class Socket {
  private goEasy: GoEasy;
  private channelId: string;
  constructor(channelId: string) {
    this.channelId = channelId;
    this.goEasy =
      global.goEasy ||
      GoEasy.getInstance({
        host: 'hangzhou.goeasy.io',
        appkey: 'BC-501436916b5e4006bc7fb7efb5f3dd78',
        modules: ['pubsub'],
      });
    global.goEasy = this.goEasy;
  }

  public connectGoEasy() {
    const id = nanoid(6);
    this.goEasy.connect({
      id: id,
      data: {
        avatar: `https://api.multiavatar.com/${id}.png`,
        nickname: id,
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
  public subscribePresence() {
    this.goEasy.pubsub.subscribePresence({
      channel: this.channelId,
      membersLimit: 20,
      onPresence: function (presenceEvent: any) {
        console.log('Presence events: ', JSON.stringify(presenceEvent));
      },
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
      channel: 'my_channel',
      limit: 1,
      onSuccess: function (response: {}) {
        alert('hereNow response: ' + JSON.stringify(response)); //json格式的response
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
