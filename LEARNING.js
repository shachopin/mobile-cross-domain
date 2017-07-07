CORS work the same for if your html is run inside file:// or http:// 

codepen.io js consolidation part4 CORS part
========================================================================
the origin from request header has to match access-control-allow-header from response header
or 
if the the access-control-allow-header is *
  
use test-cors.org
https://www.html5rocks.com/en/tutorials/cors/


https://senecacd.wordpress.com/2013/02/15/enabling-cors-on-a-node-js-server-same-origin-policy-issue/
=======================================================================
  
Cross-Origin Resource Sharing – CORS

In a nutshell CORS is the mechanism that allows a domain to request resources from another domain, for example, if domain http://websiteAAA tries to request resources from http://websiteBBB the browser won’t allow it due to Same Origin Policy restrictions.

The reason for having Same Origin Policy rules applied on the browser is to prevent unauthorized websites accessing content they don’t have permissions for.

I found a great example that emphasizes the need to have Same Origin Policies enforced by the browser: Say you log in to a service, like Google for example, then while logged in you go and visit a shady website that’s running some malware on it. Without Same Origin Policy rules, the shady website would be able to query Google with the authentication cookies saved in the browser from your session, which of course is a huge vulnerability.

Since HTTP is a stateless protocol, the Same Origin Policy rules allow the browser to establish a connection using session cookies and still keep each cookie private to the domain that made the request, encapsulating the privileges of each “service” running in the browser.

With that being said, imagine a situation where you, as a developer, need to communicate with an API sitting on a different domain. In this scenario you don’t want to hit the Same Origin Policy restrictions.

Workaround 1 – Request resources from a server
Workaround 2 – JSONP
Workaround 3 – CORS

That means that if you want to make an ajax call to `carrers.stackoverflow.com/gethired/js` from your own page, 
the browser will not apply Same Origin Policy restrictions since the `careers.stackoverflow` server has indicated that the script is allowed to be loaded from different domains. by saying access-control-allow-origin: "*". 
Here the origin value has to be either same as request header origin value (client domain) or any domain like using star symbol *

An important note to make is that only the `http://careers.stackoverflow.com/gethired/js` has the Same Origin Rules turned off, 
however, the `careersstackoverflow.com` domain still has them enabled on other pages.
This means you can enable the header options on a response level, making sure a few API calls are open to the public without 
putting your whole server in danger of being exploited.


https://stackoverflow.com/questions/32372947/node-js-socket-io-same-origin-policy-error
=====================================================================
Even the port matters

0
down vote
accepted
i thinks its because your ports are different

res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
and

server = server.listen(8000)


https://enable-cors.org/server_expressjs.html very good, having code snippet for various server code
====================================================================
  
  
In the server.js of todo-api-no-authentication project, you did this middleware to allow CORS
app.use(function(req, res, next) { //allow cross domain middleware
  //res.setHeader('Access-Control-Allow-Origin', 'the value has to your client domain you access the api from - or just * to allow all');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", ["PATCH", "DELETE"]); 
  next();
});

this is for web app
notice for phonegap app,
the above server configuration for enabling CORS is NOT NEEDED or DOES NOT MATTER, since you set access origin="*" in your config.xml 

Testing in android emulator Or directly on your phone:
-
in config.xml, comment out access origin="*" line, run cordova emulate android, click on the GET JOKE bottuon, nothin happens.

in config.xml, uncomment out access origin="*" line, run command cordova emualte andorid, click on the GET JOKE button, the json string shows

THis setting has nothing to do with whether or not you can call from local server or file://


How to upload a static json file to S3 as a json service?
======================================
the file name can be anything
upload a sample.txt to S3
file content is:

{
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}
1) make it public
2) Using CORS (Cross-Origin Resource Sharing) you can selectively 
allow web applications running on other domains to access content 
in your Amazon S3 bucket. Each CORS rule must contain the set of 
origins/domains and HTTP methods you want to allow for those 
origins. Optionally, you can also specify the headers users can set 
in requests or access in responses and the duration the preflight 
responses should be cached.

Edit the existing CORS configuration for this bucket in the text 
area below

Add CORS configuration, the default will be:
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>
    </CORSRule>
</CORSConfiguration>

then in localserver and file://, both can call that URL now

In browser developer tool, you see these response headers being set:
Accept-Ranges:bytes
Access-Control-Allow-Methods:GET
Access-Control-Allow-Origin:*
Access-Control-Max-Age:3000



How to make sinatra json service on take CORS too?
===============================================
https://samurails.com/tutorial/cors-with-angular-js-and-sinatra/
https://devblast.com/b/cors-with-angular-js-and-sinatra
https://devblast.com/b/angular-js-cors-get-post-put-delete/
Howdy,

Today, I’m gonna talk about something that always caused me a lot 
of pain, everytime I had to deal with it : Same-origin policy. 
This thing is simply awful if you have to make HTTP requests from 
Javascript.

To counter that, you can use JSONP. But only to make GET requests. 
If you need more than that (POST, PUT, DELETE), you will have to 
use Cross-Origin Resource Sharing and that’s what I am going to 
explain in this post. To do this, I will use Angular.js and 
Sinatra. Let’s get started, shall we ?

notice even if ports are different, will violate same domain policy too

require 'sinatra'
require 'json'
 
before do
   content_type :json    
   headers 'Access-Control-Allow-Origin' => '*', 
            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
end  (here is the fix)
 
set :protection, false
 
options '/movie' do
    200
end
 
get '/movie' do
  { result: "Monster University" }.to_json
end
 
post '/movie' do
  { result: params[:movie] }.to_json
end
    

Enable CORS on Ruby Sinatra Server
======================================================================
from your calling-uno-service in glitch.me

the backend is a ruby sinatra server

if you don't pass content-type key in your ajax call, the above should work, a.k.a
in sinatra main.rb

before do
   content_type :json    
   headers 'Access-Control-Allow-Origin' => '*', 
            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
end  

3. If you pass content-type key in your $.ajax call, you need two more
a): 
options '/movie' do
    200
end

b):
before do
   content_type :json    
   headers 'Access-Control-Allow-Origin' => '*', 
           'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
           'Access-Control-Allow-Headers' => 'Content-Type'  
end
