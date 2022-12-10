sudo docker run -d --name line_bot_votingpower --net=mynet0 --ip=172.100.0.104 -p 3001:3001 \
-e YOUR_CHANNEL_ACCESS_TOKEN=$YOUR_CHANNEL_ACCESS_TOKEN \
-e YOUR_CHANNEL_SECRET=$YOUR_CHANNEL_SECRET \
ojagggyo/line_bot_votingpower

