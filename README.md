# Server Sent Event (SSE) Example
ChatGPTのようなリアルタイムで文字が入力されていくUIを実装するためのデモ。  
Server Sent Event (SSE)の実装方法をいくつか試しました。

<kbd>
<img width="575" alt="image" src="https://github.com/Rasukarusan/server-sent-events-example/assets/17779386/8759618b-65fe-469e-bdaf-72e218348522">
</kbd>


## Setup
```sh
npm install
npm run dev
```

## Usage

- ブラウザでのアクセス方法:

### EventSourceを使用
http://localhost:3000/

### fetchを使用
http://localhost:3000/fetch

### fetch-event-sourceを使用
http://localhost:3000/fetch-event-source

- コマンドラインでのアクセス方法 (curl):

```sh
$ curl "http://localhost:3000/api/events"

# data:
# 
# data: 夜
# 
# data: 空
# 
# data: に
#
# ...
```

## Reference

- [Azure/fetch-event-source](https://github.com/Azure/fetch-event-source)
- [リアル業務でChatGPT APIを使うコツ](https://zenn.dev/teramotodaiki/scraps/f016ed832d6f0d)

