if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>c(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"213196982d1772f753d31f154cf08bdb"},{url:"/LightTheme.png",revision:"bf66cf5164609322f4ba2405ca61d7ff"},{url:"/SystemTheme.png",revision:"34c48fba02887841afe9699eb9fbe611"},{url:"/_next/static/96rdUmmFUsJp6Ug4xDFUA/_buildManifest.js",revision:"cf03ee62eba3b307cb44c237f38858f5"},{url:"/_next/static/96rdUmmFUsJp6Ug4xDFUA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0619bbfe-101b52c0139d1092.js",revision:"101b52c0139d1092"},{url:"/_next/static/chunks/157-a43f15870d607800.js",revision:"a43f15870d607800"},{url:"/_next/static/chunks/167.140c67aab82b5b00.js",revision:"140c67aab82b5b00"},{url:"/_next/static/chunks/168e4476-a35727e38316748f.js",revision:"a35727e38316748f"},{url:"/_next/static/chunks/174-6b459eaa8b2c02bd.js",revision:"6b459eaa8b2c02bd"},{url:"/_next/static/chunks/23705694-4bc30bd0538e0e87.js",revision:"4bc30bd0538e0e87"},{url:"/_next/static/chunks/250-1add4cef1b182596.js",revision:"1add4cef1b182596"},{url:"/_next/static/chunks/450-5effeeed5b53efe6.js",revision:"5effeeed5b53efe6"},{url:"/_next/static/chunks/464.8af6a12bfb0a1580.js",revision:"8af6a12bfb0a1580"},{url:"/_next/static/chunks/488-0e9bdc67ea2ea9b0.js",revision:"0e9bdc67ea2ea9b0"},{url:"/_next/static/chunks/495-8b78f1b430f6ba06.js",revision:"8b78f1b430f6ba06"},{url:"/_next/static/chunks/497cd2bd-c25e46d1094485a5.js",revision:"c25e46d1094485a5"},{url:"/_next/static/chunks/550-77f7ac0b105f9d97.js",revision:"77f7ac0b105f9d97"},{url:"/_next/static/chunks/5c94f8c1-8e907a113f758ec6.js",revision:"8e907a113f758ec6"},{url:"/_next/static/chunks/785-b4e4a6bbf54d8843.js",revision:"b4e4a6bbf54d8843"},{url:"/_next/static/chunks/7a09bc7f-f5ad46436bfb8bd4.js",revision:"f5ad46436bfb8bd4"},{url:"/_next/static/chunks/838-e320166c4925fc45.js",revision:"e320166c4925fc45"},{url:"/_next/static/chunks/841-99875f202f4830d0.js",revision:"99875f202f4830d0"},{url:"/_next/static/chunks/9ff28164-ee649d7b1b1f062c.js",revision:"ee649d7b1b1f062c"},{url:"/_next/static/chunks/e7a394b6-2758a757983dd9c8.js",revision:"2758a757983dd9c8"},{url:"/_next/static/chunks/framework-b20e9722cfc7fb3b.js",revision:"b20e9722cfc7fb3b"},{url:"/_next/static/chunks/main-bf6df846ff0d616c.js",revision:"bf6df846ff0d616c"},{url:"/_next/static/chunks/pages/_app-e0cccbf413a6abce.js",revision:"e0cccbf413a6abce"},{url:"/_next/static/chunks/pages/_error-6d8cab202b88ea16.js",revision:"6d8cab202b88ea16"},{url:"/_next/static/chunks/pages/activity-75bd9c13cc8dcece.js",revision:"75bd9c13cc8dcece"},{url:"/_next/static/chunks/pages/encryption-26a5e3fa929fac15.js",revision:"26a5e3fa929fac15"},{url:"/_next/static/chunks/pages/generate-d034c47f8e987e97.js",revision:"d034c47f8e987e97"},{url:"/_next/static/chunks/pages/home-97022a2b43cc9d07.js",revision:"97022a2b43cc9d07"},{url:"/_next/static/chunks/pages/index-adb95fb4d569da53.js",revision:"adb95fb4d569da53"},{url:"/_next/static/chunks/pages/settings-5e3b62d3fe333a8c.js",revision:"5e3b62d3fe333a8c"},{url:"/_next/static/chunks/pages/strength-0e87c9519ae63def.js",revision:"0e87c9519ae63def"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-72b857f5e4f70e64.js",revision:"72b857f5e4f70e64"},{url:"/_next/static/css/cbcff4c899eb28ed.css",revision:"cbcff4c899eb28ed"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/dark.e6e8d54a.png",revision:"e6e8d54a"},{url:"/_next/static/media/white.b444812b.png",revision:"b444812b"},{url:"/dark.png",revision:"d3fd8ad1ad242a6a60a7ca82c1e38ee1"},{url:"/favicon.ico",revision:"bb8a0317c56aa3007091b67c60441596"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/images/icons/icon-128x128.png",revision:"f9ed33ed1d6d504d4446df99d646a6f9"},{url:"/images/icons/icon-144x144.png",revision:"660b4bca923d657435671dedc13291fc"},{url:"/images/icons/icon-152x152.png",revision:"911cfd4c5387cdee274b39852de87c6d"},{url:"/images/icons/icon-192x192.png",revision:"90b1dcbdadd7ce85098d3be063c15090"},{url:"/images/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/images/icons/icon-512x512.png",revision:"f8b496b89d0ec8b8bc0910ae84ecafe3"},{url:"/images/icons/icon-72x72.png",revision:"3d1a8780ba942581f49a75322b9c3c15"},{url:"/images/icons/icon-96x96.png",revision:"0672054826a0c58a2df8b5cc705ed651"},{url:"/images/social.png",revision:"2874d3e43cfaae648dfc20d9e720cbd9"},{url:"/manifest.json",revision:"6cc310d6a37024ad77d4c38aa64cf754"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/white.png",revision:"ee020186ac273747154dcb9575cc0ba5"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
