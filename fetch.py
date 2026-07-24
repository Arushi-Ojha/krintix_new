import urllib.request, re
url = 'https://html.duckduckgo.com/html/?q=site:pinterest.com+dark+tech+aesthetic'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print(re.findall(r'v1/([a-zA-Z0-9]+)', html)[:5])
except Exception as e:
    print(e)
