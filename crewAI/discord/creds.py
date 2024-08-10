from urllib import parse

TOKEN= "MTI1NzY2MTg0NzE1OTQ0MzU1MQ.G6_SxF.BVwAuIc9b8Zbm4q66kWcUhLfGuWxTD3kEIL2pQ"
CLIENT_SECRET = "PJA28sUHz-Ne8HwmeQQwow0iYZlG0ToM"
REDIRECT_URI = "http://127.0.0.1:5000/oauth/callback"
# OAUTH_URL = f"https://discord.com/oauth2/authorize?client_id=1257661847159443551&permissions=536870912&response_type=code&redirect_uri={parse.quote(REDIRECT_URI)}&scope=identify+email+bot+webhook.incoming"
# OAUTH_URL = f"https://discord.com/oauth2/authorize?client_id=1257661847159443551&response_type=code&redirect_uri={parse.quote(REDIRECT_URI)}&scope=identify"
OAUTH_URL = "https://discord.com/oauth2/authorize?client_id=1257661847159443551&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A5000%2Foauth%2Fcallback&integration_type=0&scope=identify+email+guilds+connections+guilds.members.read+webhook.incoming"

