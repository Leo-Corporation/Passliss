if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"213196982d1772f753d31f154cf08bdb"},{url:"/LightTheme.png",revision:"bf66cf5164609322f4ba2405ca61d7ff"},{url:"/SystemTheme.png",revision:"34c48fba02887841afe9699eb9fbe611"},{url:"/_next/static/chunks/0619bbfe-9c29b4abec03fdcb.js",revision:"9c29b4abec03fdcb"},{url:"/_next/static/chunks/0f1159e5-4d8c1adb28c152be.js",revision:"4d8c1adb28c152be"},{url:"/_next/static/chunks/108-ceb728731a1a4fd9.js",revision:"ceb728731a1a4fd9"},{url:"/_next/static/chunks/134-054004b648f24b5f.js",revision:"054004b648f24b5f"},{url:"/_next/static/chunks/167.d079a79769193a50.js",revision:"d079a79769193a50"},{url:"/_next/static/chunks/240-b527389062facb96.js",revision:"b527389062facb96"},{url:"/_next/static/chunks/275-a5ebb03f363d4a22.js",revision:"a5ebb03f363d4a22"},{url:"/_next/static/chunks/33-0554c8d430337921.js",revision:"0554c8d430337921"},{url:"/_next/static/chunks/332-84c76fdb62294417.js",revision:"84c76fdb62294417"},{url:"/_next/static/chunks/390-bad323f25ae94ed3.js",revision:"bad323f25ae94ed3"},{url:"/_next/static/chunks/464.b0e9899b97521eac.js",revision:"b0e9899b97521eac"},{url:"/_next/static/chunks/497cd2bd-687acb924b12fd49.js",revision:"687acb924b12fd49"},{url:"/_next/static/chunks/52c63b42-e373fb47515e506a.js",revision:"e373fb47515e506a"},{url:"/_next/static/chunks/533-8b7e895d6001acbd.js",revision:"8b7e895d6001acbd"},{url:"/_next/static/chunks/5c94f8c1-0bea0e6dc36053ee.js",revision:"0bea0e6dc36053ee"},{url:"/_next/static/chunks/6-d14f3e95a57d8831.js",revision:"d14f3e95a57d8831"},{url:"/_next/static/chunks/60-6a685137a5030310.js",revision:"6a685137a5030310"},{url:"/_next/static/chunks/674-07153202a04ef2df.js",revision:"07153202a04ef2df"},{url:"/_next/static/chunks/772-00b65af849a5837b.js",revision:"00b65af849a5837b"},{url:"/_next/static/chunks/7fab36dd-db978bec1e920cf3.js",revision:"db978bec1e920cf3"},{url:"/_next/static/chunks/915-a734915dbfcd28c5.js",revision:"a734915dbfcd28c5"},{url:"/_next/static/chunks/934-157588b11cab4c4a.js",revision:"157588b11cab4c4a"},{url:"/_next/static/chunks/9ef4ab7f-52f581b4e7a688d0.js",revision:"52f581b4e7a688d0"},{url:"/_next/static/chunks/b55107cc-2d54d18f177e9ac7.js",revision:"2d54d18f177e9ac7"},{url:"/_next/static/chunks/cc594a49-4df14df2af7dd0ea.js",revision:"4df14df2af7dd0ea"},{url:"/_next/static/chunks/e6b377d6-ca543d5a4bf6c7bb.js",revision:"ca543d5a4bf6c7bb"},{url:"/_next/static/chunks/f4debfa0-03965a20f5209d6f.js",revision:"03965a20f5209d6f"},{url:"/_next/static/chunks/fd0b3a01-821bf034398ebb2e.js",revision:"821bf034398ebb2e"},{url:"/_next/static/chunks/framework-8b7ae4d017121d95.js",revision:"8b7ae4d017121d95"},{url:"/_next/static/chunks/main-5521c33e3b322d8c.js",revision:"5521c33e3b322d8c"},{url:"/_next/static/chunks/pages/_app-70fe167d8064952a.js",revision:"70fe167d8064952a"},{url:"/_next/static/chunks/pages/_error-e2483fa7899c6c22.js",revision:"e2483fa7899c6c22"},{url:"/_next/static/chunks/pages/activity-0ed24b18a67a3d5e.js",revision:"0ed24b18a67a3d5e"},{url:"/_next/static/chunks/pages/encryption-7fba7144eb14a22d.js",revision:"7fba7144eb14a22d"},{url:"/_next/static/chunks/pages/generate-f8c7a39bb2cc2fdd.js",revision:"f8c7a39bb2cc2fdd"},{url:"/_next/static/chunks/pages/home-af2775ee08e2e1d4.js",revision:"af2775ee08e2e1d4"},{url:"/_next/static/chunks/pages/index-3322de41a5c36dad.js",revision:"3322de41a5c36dad"},{url:"/_next/static/chunks/pages/presets-54ee5e5884c9ef4e.js",revision:"54ee5e5884c9ef4e"},{url:"/_next/static/chunks/pages/settings-b2cab594d597d423.js",revision:"b2cab594d597d423"},{url:"/_next/static/chunks/pages/strength-b70c318526a5abb6.js",revision:"b70c318526a5abb6"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-d341fd77a9a4c23f.js",revision:"d341fd77a9a4c23f"},{url:"/_next/static/css/07b58d97e0175d1a.css",revision:"07b58d97e0175d1a"},{url:"/_next/static/j1yIlYL7dxuPQOklsZDra/_buildManifest.js",revision:"ed1a7e49371efd86597eea904aba514c"},{url:"/_next/static/j1yIlYL7dxuPQOklsZDra/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/favicon.ico",revision:"b609d335f03080ddf80a2037731a0418"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/images/icons/icon-128x128.png",revision:"3eef0de623f08f34881c01b5544db154"},{url:"/images/icons/icon-144x144.png",revision:"56e8ab0c6781b7636ec7f2909911ace1"},{url:"/images/icons/icon-152x152.png",revision:"c2e96932df7296a46573fd59f0328c2b"},{url:"/images/icons/icon-192x192.png",revision:"87a945a115a20b7705222b0c2d81ec36"},{url:"/images/icons/icon-256x256.png",revision:"22907baf49a5ac6d10c4fb8e1c0f0197"},{url:"/images/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/images/icons/icon-512x512.png",revision:"5109f5872074f3576b39b53d8ff37675"},{url:"/images/icons/icon-72x72.png",revision:"5e0ff5f251b4d2e8a4d13250ec2beb4a"},{url:"/images/icons/icon-96x96.png",revision:"6c15c4cc19a220d5244de8ed408897d4"},{url:"/images/social.png",revision:"2874d3e43cfaae648dfc20d9e720cbd9"},{url:"/manifest.json",revision:"6cc310d6a37024ad77d4c38aa64cf754"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
