self.addEventListener("install", e => {
    console.log("INSTALL!***")
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./",  "./css/style.css", "./css/layout.css", "./images/logo_192.png", "./images/logo_152.PNG", "./login.html", "./index.html", "./images/_.jpeg",  "./images/login.jpg", "./manifest.json", "./src/index.js", "./favicon.ico", "./sesion.html", "./images/yoga_1.mp4", "./images/yoga_1.png", "./schedule.html", "./script_schedule.js", "./style_schedule.css"])
            console.log("se cumplio until***")
        })
    );
});

self.addEventListener("fetch", e =>{
   // console.log(`Intercepta fetch request for: ${e.request.url}`);
    e.respondWith(
    caches.match(e.request).then(response => {

       return response || fetch(e.request);
    })
    );
});
    