if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>n(e,a),f={module:{uri:a},exports:t,require:r};s[a]=Promise.all(i.map((e=>f[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"213196982d1772f753d31f154cf08bdb"},{url:"/LightTheme.png",revision:"bf66cf5164609322f4ba2405ca61d7ff"},{url:"/SystemTheme.png",revision:"34c48fba02887841afe9699eb9fbe611"},{url:"/_next/static/BdQ5IeBupJS9kqXGOHmnh/_buildManifest.js",revision:"70849c27a3e1d9eae0e85b3c6f620c54"},{url:"/_next/static/BdQ5IeBupJS9kqXGOHmnh/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/167.80ff4537db0010bb.js",revision:"80ff4537db0010bb"},{url:"/_next/static/chunks/230-8eac29c74e6abf02.js",revision:"8eac29c74e6abf02"},{url:"/_next/static/chunks/335-618b5e82badb16bf.js",revision:"618b5e82badb16bf"},{url:"/_next/static/chunks/391-85ec20f3e8a74d06.js",revision:"85ec20f3e8a74d06"},{url:"/_next/static/chunks/464.c7b5c330e2cff8a9.js",revision:"c7b5c330e2cff8a9"},{url:"/_next/static/chunks/497cd2bd-b0f302c3069eeed1.js",revision:"b0f302c3069eeed1"},{url:"/_next/static/chunks/519-c625148cdf389d5a.js",revision:"c625148cdf389d5a"},{url:"/_next/static/chunks/56-ca061cb518a89306.js",revision:"ca061cb518a89306"},{url:"/_next/static/chunks/585-4e9c07501339a429.js",revision:"4e9c07501339a429"},{url:"/_next/static/chunks/663-05bef96d39f32033.js",revision:"05bef96d39f32033"},{url:"/_next/static/chunks/771-db0ac815b224a10c.js",revision:"db0ac815b224a10c"},{url:"/_next/static/chunks/7fab36dd-5528f9ba3e90865b.js",revision:"5528f9ba3e90865b"},{url:"/_next/static/chunks/915-d35e917d2a26fe1a.js",revision:"d35e917d2a26fe1a"},{url:"/_next/static/chunks/948-dd858c0dfb2ddf29.js",revision:"dd858c0dfb2ddf29"},{url:"/_next/static/chunks/9ef4ab7f-c01693a04bbb058d.js",revision:"c01693a04bbb058d"},{url:"/_next/static/chunks/9ff28164-969311c7518003d6.js",revision:"969311c7518003d6"},{url:"/_next/static/chunks/b55107cc-233227e56451dd23.js",revision:"233227e56451dd23"},{url:"/_next/static/chunks/e6b377d6-2f652709b71382f3.js",revision:"2f652709b71382f3"},{url:"/_next/static/chunks/f4debfa0-69535f061b3528fd.js",revision:"69535f061b3528fd"},{url:"/_next/static/chunks/fd0b3a01-f5dbbd752738b00b.js",revision:"f5dbbd752738b00b"},{url:"/_next/static/chunks/framework-9635e1ef2f7ef225.js",revision:"9635e1ef2f7ef225"},{url:"/_next/static/chunks/main-2d2074ef3eff80fb.js",revision:"2d2074ef3eff80fb"},{url:"/_next/static/chunks/pages/_app-cf20efc22026aac1.js",revision:"cf20efc22026aac1"},{url:"/_next/static/chunks/pages/_error-34c82d3623be3eaa.js",revision:"34c82d3623be3eaa"},{url:"/_next/static/chunks/pages/activity-5e9e6dcd172a468c.js",revision:"5e9e6dcd172a468c"},{url:"/_next/static/chunks/pages/encryption-786d53c6411edfb3.js",revision:"786d53c6411edfb3"},{url:"/_next/static/chunks/pages/generate-477307e88a46fc00.js",revision:"477307e88a46fc00"},{url:"/_next/static/chunks/pages/home-e5118f38352f2f96.js",revision:"e5118f38352f2f96"},{url:"/_next/static/chunks/pages/index-fd75b7d03f8fcb45.js",revision:"fd75b7d03f8fcb45"},{url:"/_next/static/chunks/pages/settings-9c264164b557dd69.js",revision:"9c264164b557dd69"},{url:"/_next/static/chunks/pages/strength-3b4525c5e5df42be.js",revision:"3b4525c5e5df42be"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b4148b4e0b52d36f.js",revision:"b4148b4e0b52d36f"},{url:"/_next/static/css/20288a040d208095.css",revision:"20288a040d208095"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/dark.e6e8d54a.png",revision:"e6e8d54a"},{url:"/_next/static/media/white.b444812b.png",revision:"b444812b"},{url:"/dark.png",revision:"d3fd8ad1ad242a6a60a7ca82c1e38ee1"},{url:"/favicon.ico",revision:"b609d335f03080ddf80a2037731a0418"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/images/icons/icon-128x128.png",revision:"3eef0de623f08f34881c01b5544db154"},{url:"/images/icons/icon-144x144.png",revision:"56e8ab0c6781b7636ec7f2909911ace1"},{url:"/images/icons/icon-152x152.png",revision:"c2e96932df7296a46573fd59f0328c2b"},{url:"/images/icons/icon-192x192.png",revision:"87a945a115a20b7705222b0c2d81ec36"},{url:"/images/icons/icon-256x256.png",revision:"22907baf49a5ac6d10c4fb8e1c0f0197"},{url:"/images/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/images/icons/icon-512x512.png",revision:"5109f5872074f3576b39b53d8ff37675"},{url:"/images/icons/icon-72x72.png",revision:"5e0ff5f251b4d2e8a4d13250ec2beb4a"},{url:"/images/icons/icon-96x96.png",revision:"6c15c4cc19a220d5244de8ed408897d4"},{url:"/images/social.png",revision:"2874d3e43cfaae648dfc20d9e720cbd9"},{url:"/manifest.json",revision:"6cc310d6a37024ad77d4c38aa64cf754"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/white.png",revision:"ee020186ac273747154dcb9575cc0ba5"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
