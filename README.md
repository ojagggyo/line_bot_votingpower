
## 環境設定（初めて）
npm i
npm install webpack


### 
git pull
### dockerイメージ作成
sudo docker build . -t ojagggyo/line_bot_votingpower



### コンテナ作成
sudo docker run -d --name line_bot_votingpower --net=mynet0 --ip=172.100.0.104 -p 3001:3001 \
-e YOUR_CHANNEL_ACCESS_TOKEN=$YOUR_CHANNEL_ACCESS_TOKEN \
-e YOUR_CHANNEL_SECRET=$YOUR_CHANNEL_SECRET \
ojagggyo/line_bot_votingpower


docker logs line_bot_votingpower -f --tail 10

# Ubuntu 
export YOUR_CHANNEL_ACCESS_TOKEN=zVjDnmO9RjgNzGgihQVuan+oH5ZHMDymoCgIXlJOnwIpfmNMdvc/DHwy3WEVd1f204UeQGBEkufU5+ZDes3pwo5oLQ1rZeNetKNfBkQtWWFs3pBG7QtRly6SuDdjx6RCTSBjgOHQfkWLa5OgS74YxwdB04t89/1O/w1cDnyilFU=

export YOUR_CHANNEL_SECRET=00f4ac9a3403e2c9237f341a35ae22b2
# -----------------------------------------------------------
# line_bot_1



## 環境設定
npm init -y
npm i dsteem
npm i express
npm i dotenv
npm i  @line/bot-sdk express dotenv




# -----------------------------------------------------------



pythonプログラム
main.py

from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)
import os

app = Flask(__name__)

#環境変数取得
YOUR_CHANNEL_ACCESS_TOKEN = os.environ["YOUR_CHANNEL_ACCESS_TOKEN"]
YOUR_CHANNEL_SECRET = os.environ["YOUR_CHANNEL_SECRET"]

line_bot_api = LineBotApi(YOUR_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(YOUR_CHANNEL_SECRET)

@app.route("/webhook", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=event.message.text))


if __name__ == "__main__":
#    app.run()
    port = int(os.getenv("PORT", 3002))
    app.run(host="0.0.0.0", port=port)

