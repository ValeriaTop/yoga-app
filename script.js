const CLIP_DURATION = 10;

const posts = ["yoga", "record", "india"];
const music = ["Soft Relaxing Music", "Lofi Beats", "Ambient Wandering"];

let index = 0;
const video = document.getElementById("hero-video");

document.getElementById(posts[1]).style.transform = "translateY(430px)";
document.getElementById(posts[2]).style.transform = "translateY(-430px)";

video.addEventListener("timeupdate", (event) => {
  const timestamp = event.target.currentTime;

  if (
    timestamp < CLIP_DURATION - 0.3 ||
    timestamp > CLIP_DURATION * 3 - 0.3
  ) {
    if (index !== 0) {
      index = 0;

      document.getElementById(posts[2]).style.transform = "translateY(-430px)";
      document.getElementById(posts[0]).style.display = "block";
      document.getElementById(posts[0]).style.transform = "translateY(0)";
      document.getElementById(posts[1]).style.display = "none";
      document.getElementById(posts[1]).style.transform = "translateY(430px)";

      document.getElementById("hero-player-title").textContent = music[0];
    }
  } else if (timestamp < CLIP_DURATION * 2 - 0.3) {
    if (index !== 1) {
      index = 1;

      document.getElementById(posts[0]).style.transform = "translateY(-430px)";
      document.getElementById(posts[1]).style.display = "block";
      document.getElementById(posts[1]).style.transform = "translateY(0)";
      document.getElementById(posts[2]).style.display = "none";
      document.getElementById(posts[2]).style.transform = "translateY(430px)";

      document.getElementById("hero-player-title").textContent = music[1];
    }
  } else {
    if (index !== 2) {
      index = 2;

      document.getElementById(posts[1]).style.transform = "translateY(-430px)";
      document.getElementById(posts[2]).style.display = "block";
      document.getElementById(posts[2]).style.transform = "translateY(0)";
      document.getElementById(posts[0]).style.display = "none";
      document.getElementById(posts[0]).style.transform = "translateY(430px)";

      document.getElementById("hero-player-title").textContent = music[2];
    }
  }
});