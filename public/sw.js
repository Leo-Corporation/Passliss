if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>c(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"213196982d1772f753d31f154cf08bdb"},{url:"/LightTheme.png",revision:"bf66cf5164609322f4ba2405ca61d7ff"},{url:"/SystemTheme.png",revision:"34c48fba02887841afe9699eb9fbe611"},{url:"/_next/static/MOrvZ3h-o8aFrJ1CkYLBM/_buildManifest.js",revision:"33d0c52cbee7831c0df63aa901ff2252"},{url:"/_next/static/MOrvZ3h-o8aFrJ1CkYLBM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/160-ef7931098e583e4c.js",revision:"ef7931098e583e4c"},{url:"/_next/static/chunks/167.ded0ac82973055c6.js",revision:"ded0ac82973055c6"},{url:"/_next/static/chunks/174-1a088e64953fbb30.js",revision:"1a088e64953fbb30"},{url:"/_next/static/chunks/193-9830f0f825e45285.js",revision:"9830f0f825e45285"},{url:"/_next/static/chunks/216-354fff468feacfcd.js",revision:"354fff468feacfcd"},{url:"/_next/static/chunks/464.d3836f7bc31ce317.js",revision:"d3836f7bc31ce317"},{url:"/_next/static/chunks/514-c99e7fa95322f68d.js",revision:"c99e7fa95322f68d"},{url:"/_next/static/chunks/52c63b42-f60e7392a5fa7bc0.js",revision:"f60e7392a5fa7bc0"},{url:"/_next/static/chunks/5c94f8c1-c51919671443a623.js",revision:"c51919671443a623"},{url:"/_next/static/chunks/681-b7416961a0a5bbb1.js",revision:"b7416961a0a5bbb1"},{url:"/_next/static/chunks/699-b542a318ecb3c589.js",revision:"b542a318ecb3c589"},{url:"/_next/static/chunks/7fab36dd-ba3f0aa52b835a25.js",revision:"ba3f0aa52b835a25"},{url:"/_next/static/chunks/804-872cf06e0ca88eed.js",revision:"872cf06e0ca88eed"},{url:"/_next/static/chunks/838-1b721e3fe019b216.js",revision:"1b721e3fe019b216"},{url:"/_next/static/chunks/874-407f5c17f7a241d1.js",revision:"407f5c17f7a241d1"},{url:"/_next/static/chunks/9-80dcc352a61c0ee5.js",revision:"80dcc352a61c0ee5"},{url:"/_next/static/chunks/914-adf458c68f61d4f9.js",revision:"adf458c68f61d4f9"},{url:"/_next/static/chunks/9ef4ab7f-e684fd60ee42e07f.js",revision:"e684fd60ee42e07f"},{url:"/_next/static/chunks/9ff28164-56b86eed321368c2.js",revision:"56b86eed321368c2"},{url:"/_next/static/chunks/b55107cc-76a775ad28dfab43.js",revision:"76a775ad28dfab43"},{url:"/_next/static/chunks/e6b377d6-b210c312aafd8a11.js",revision:"b210c312aafd8a11"},{url:"/_next/static/chunks/fd0b3a01-fb1f8fd2088a4e5f.js",revision:"fb1f8fd2088a4e5f"},{url:"/_next/static/chunks/framework-b20e9722cfc7fb3b.js",revision:"b20e9722cfc7fb3b"},{url:"/_next/static/chunks/main-fb313b4e71275d6b.js",revision:"fb313b4e71275d6b"},{url:"/_next/static/chunks/pages/_app-a875826072e875e7.js",revision:"a875826072e875e7"},{url:"/_next/static/chunks/pages/_error-6d8cab202b88ea16.js",revision:"6d8cab202b88ea16"},{url:"/_next/static/chunks/pages/activity-7eeb417222b88930.js",revision:"7eeb417222b88930"},{url:"/_next/static/chunks/pages/encryption-a1e1cb5918c500ce.js",revision:"a1e1cb5918c500ce"},{url:"/_next/static/chunks/pages/generate-c6cb9686156d94b6.js",revision:"c6cb9686156d94b6"},{url:"/_next/static/chunks/pages/home-3050de2c5ec568db.js",revision:"3050de2c5ec568db"},{url:"/_next/static/chunks/pages/index-d24d8912d11429c9.js",revision:"d24d8912d11429c9"},{url:"/_next/static/chunks/pages/settings-024c6036f7730fe0.js",revision:"024c6036f7730fe0"},{url:"/_next/static/chunks/pages/strength-a1d3864f2d0ec460.js",revision:"a1d3864f2d0ec460"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-8c293a40026bc23b.js",revision:"8c293a40026bc23b"},{url:"/_next/static/css/19ee47cd74f9db48.css",revision:"19ee47cd74f9db48"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/dark.e6e8d54a.png",revision:"e6e8d54a"},{url:"/_next/static/media/white.b444812b.png",revision:"b444812b"},{url:"/dark.png",revision:"d3fd8ad1ad242a6a60a7ca82c1e38ee1"},{url:"/favicon.ico",revision:"bb8a0317c56aa3007091b67c60441596"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/images/icons/icon-128x128.png",revision:"f9ed33ed1d6d504d4446df99d646a6f9"},{url:"/images/icons/icon-144x144.png",revision:"660b4bca923d657435671dedc13291fc"},{url:"/images/icons/icon-152x152.png",revision:"911cfd4c5387cdee274b39852de87c6d"},{url:"/images/icons/icon-192x192.png",revision:"90b1dcbdadd7ce85098d3be063c15090"},{url:"/images/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/images/icons/icon-512x512.png",revision:"f8b496b89d0ec8b8bc0910ae84ecafe3"},{url:"/images/icons/icon-72x72.png",revision:"3d1a8780ba942581f49a75322b9c3c15"},{url:"/images/icons/icon-96x96.png",revision:"0672054826a0c58a2df8b5cc705ed651"},{url:"/images/social.png",revision:"2874d3e43cfaae648dfc20d9e720cbd9"},{url:"/manifest.json",revision:"6cc310d6a37024ad77d4c38aa64cf754"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/white.png",revision:"ee020186ac273747154dcb9575cc0ba5"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
