
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

### ログ出力
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
