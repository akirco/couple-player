


## Intro
> A sync-video player with you buddy , basd on `webrtc`([peer.js](https://peerjs.com))!考虑重写中，太糙了




## features

- 双人同步视频播放器,支持通过弹幕聊天
- 完全基于webrtc,无服务器 【已实现】
- 支持通过弹幕聊天 【已实现】
- 支持视频源切换
- 支持自定义播放器
- 通过webrtc实现流传输


[![Next.js](https://img.shields.io/badge/Next.js-14.2.24-000000?logo=next.js)](https://nextjs.org/)
[![WebRTC](https://img.shields.io/badge/WebRTC-Peer.js-blue)](https://peerjs.com)

> 基于WebRTC的实时同步视频播放器，支持与好友同步观看视频

<video src="./preview.mp4" controls></video>

## ✨ 功能特性

### 已实现功能
- 基于Peer.js的P2P连接
- 视频状态同步（播放/暂停/跳转）
- 基础弹幕功能

### 开发计划
| 类别       | 功能                | 进度   |
|------------|---------------------|--------|
| 视频源支持 | YouTube            | ⌛ 规划 |
|            | Bilibili           | ⌛ 规划 |
| 聊天功能   | 表情支持           | ⌛ 规划 |
|            | 弹幕优化           | ⌛ 规划 |
| 播放器     | 自定义播放器       | ⌛ 规划 |

## 🚀 快速开始

### 开发环境
```bash
git clone https://github.com/akirco/couple-player.git
pnpm install
pnpm dev

```

## Tips


**next.js prod（vercel） 不支持websocket**





## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- ![](https://images6.alphacoders.com/132/1327989.png) -->
