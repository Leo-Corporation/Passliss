if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>n(e,a),f={module:{uri:a},exports:t,require:r};s[a]=Promise.all(i.map((e=>f[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"213196982d1772f753d31f154cf08bdb"},{url:"/LightTheme.png",revision:"bf66cf5164609322f4ba2405ca61d7ff"},{url:"/SystemTheme.png",revision:"34c48fba02887841afe9699eb9fbe611"},{url:"/_next/static/chunks/114-578054a1aafd1ad2.js",revision:"578054a1aafd1ad2"},{url:"/_next/static/chunks/167.f4bf4c7368109186.js",revision:"f4bf4c7368109186"},{url:"/_next/static/chunks/208-701b611293fcb55c.js",revision:"701b611293fcb55c"},{url:"/_next/static/chunks/369-d00c8bc00c23adc4.js",revision:"d00c8bc00c23adc4"},{url:"/_next/static/chunks/464.6588977aab78774d.js",revision:"6588977aab78774d"},{url:"/_next/static/chunks/468-732b56f43d1e8c75.js",revision:"732b56f43d1e8c75"},{url:"/_next/static/chunks/497cd2bd-a96908ff05f9bce9.js",revision:"a96908ff05f9bce9"},{url:"/_next/static/chunks/52c63b42-2f4659b13df8bd08.js",revision:"2f4659b13df8bd08"},{url:"/_next/static/chunks/550-8f95a256d8606897.js",revision:"8f95a256d8606897"},{url:"/_next/static/chunks/555-c1c46b63a810325b.js",revision:"c1c46b63a810325b"},{url:"/_next/static/chunks/587-10bdf5662f500cd2.js",revision:"10bdf5662f500cd2"},{url:"/_next/static/chunks/608-b38082c019d09e6d.js",revision:"b38082c019d09e6d"},{url:"/_next/static/chunks/630-17ce313ad722b0e4.js",revision:"17ce313ad722b0e4"},{url:"/_next/static/chunks/638-70f35edfe94ae61b.js",revision:"70f35edfe94ae61b"},{url:"/_next/static/chunks/741-7e035e07981b427d.js",revision:"7e035e07981b427d"},{url:"/_next/static/chunks/7fab36dd-93534d14199e0b57.js",revision:"93534d14199e0b57"},{url:"/_next/static/chunks/892-095e032881506263.js",revision:"095e032881506263"},{url:"/_next/static/chunks/9ef4ab7f-08207c5e83d86632.js",revision:"08207c5e83d86632"},{url:"/_next/static/chunks/9ff28164-1bbadae38fee3dd4.js",revision:"1bbadae38fee3dd4"},{url:"/_next/static/chunks/b55107cc-a1d7aec90114f8af.js",revision:"a1d7aec90114f8af"},{url:"/_next/static/chunks/e6b377d6-3ece3ead61fa64c4.js",revision:"3ece3ead61fa64c4"},{url:"/_next/static/chunks/fd0b3a01-1b05ebb2c240e7e4.js",revision:"1b05ebb2c240e7e4"},{url:"/_next/static/chunks/framework-c26339ece011c249.js",revision:"c26339ece011c249"},{url:"/_next/static/chunks/main-7861171b3e232964.js",revision:"7861171b3e232964"},{url:"/_next/static/chunks/pages/_app-d53b5f9e49fe737b.js",revision:"d53b5f9e49fe737b"},{url:"/_next/static/chunks/pages/_error-644bfc717b669788.js",revision:"644bfc717b669788"},{url:"/_next/static/chunks/pages/activity-eb9f9454913c0cea.js",revision:"eb9f9454913c0cea"},{url:"/_next/static/chunks/pages/encryption-64cd1aaae273515d.js",revision:"64cd1aaae273515d"},{url:"/_next/static/chunks/pages/generate-1026b4a676e802e5.js",revision:"1026b4a676e802e5"},{url:"/_next/static/chunks/pages/home-11f682c3b6faa30b.js",revision:"11f682c3b6faa30b"},{url:"/_next/static/chunks/pages/index-6e1efebe1d7c8e2e.js",revision:"6e1efebe1d7c8e2e"},{url:"/_next/static/chunks/pages/settings-3df4509d2a4f11df.js",revision:"3df4509d2a4f11df"},{url:"/_next/static/chunks/pages/strength-cffb0114703b9fd2.js",revision:"cffb0114703b9fd2"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-081cde8fbf164f8d.js",revision:"081cde8fbf164f8d"},{url:"/_next/static/css/1988a3fee81db42e.css",revision:"1988a3fee81db42e"},{url:"/_next/static/curY9II37BkfdBpM3qmRt/_buildManifest.js",revision:"c475b8545b2b0a9dddfa68d42012ef7a"},{url:"/_next/static/curY9II37BkfdBpM3qmRt/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/dark.e6e8d54a.png",revision:"e6e8d54a"},{url:"/_next/static/media/white.b444812b.png",revision:"b444812b"},{url:"/dark.png",revision:"d3fd8ad1ad242a6a60a7ca82c1e38ee1"},{url:"/favicon.ico",revision:"b609d335f03080ddf80a2037731a0418"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/images/icons/icon-128x128.png",revision:"3eef0de623f08f34881c01b5544db154"},{url:"/images/icons/icon-144x144.png",revision:"56e8ab0c6781b7636ec7f2909911ace1"},{url:"/images/icons/icon-152x152.png",revision:"c2e96932df7296a46573fd59f0328c2b"},{url:"/images/icons/icon-192x192.png",revision:"87a945a115a20b7705222b0c2d81ec36"},{url:"/images/icons/icon-256x256.png",revision:"22907baf49a5ac6d10c4fb8e1c0f0197"},{url:"/images/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/images/icons/icon-512x512.png",revision:"5109f5872074f3576b39b53d8ff37675"},{url:"/images/icons/icon-72x72.png",revision:"5e0ff5f251b4d2e8a4d13250ec2beb4a"},{url:"/images/icons/icon-96x96.png",revision:"6c15c4cc19a220d5244de8ed408897d4"},{url:"/images/social.png",revision:"2874d3e43cfaae648dfc20d9e720cbd9"},{url:"/manifest.json",revision:"6cc310d6a37024ad77d4c38aa64cf754"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/white.png",revision:"ee020186ac273747154dcb9575cc0ba5"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
