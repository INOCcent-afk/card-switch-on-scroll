const tl = new TimelineLite();

tl.to(".first", 0.5, {
  transform: "translate(-50%, -50%) rotate(-10deg)",
  top: "50%",
  left: "40%",
  ease: Power2.easeOut,
})
  .to(".container", 0, {
    backgroundColor: "#117c22",
    ease: Power4.easeOut,
  })
  .to(".first", 0.5, {
    opacity: "0",
    ease: Power4.easeOut,
  })

  .to(".second", 0.5, {
    transform: "translate(-50%, -50%) rotate(10deg)",
    top: "50%",
    left: "60%",
    ease: Power2.easeOut,
  })
  .to(".container", 0, {
    backgroundColor: "#117886",
    ease: Power4.easeOut,
  })
  .to(".second", 0.5, {
    opacity: "0",
    ease: Power4.easeOut,
  })
  .to(".third", 0.5, {
    transform: "translate(-50%, -50%) rotate(-10deg)",
    top: "50%",
    left: "60%",
    ease: Power2.easeOut,
  })
  .to(".container", 0, {
    backgroundColor: "#81790e",
    ease: Power4.easeOut,
  })
  .to(".third", 0.5, {
    opacity: "0",
    ease: Power4.easeOut,
  });

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  triggerElement: ".container",
  duration: 2000,
  triggerHook: 0,
})
  .setPin(".container")
  .setTween(tl)
  .addIndicators()
  .addTo(controller);

function init() {
  new SmoothScroll(document, 40, 12);
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body;

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target;

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault();

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight));

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      else return -e.detail / 3;
    } else return e.wheelDelta / 120;
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}
window.addEventListener("resize", resize);

function resize() {
  document.querySelector(".first").style.transform =
    "transform: translate(-50%, -50%) rotate(0)";
  document.querySelector(".first").style.top = "50%";
  document.querySelector(".first").style.left = "50%";
  // *************
  document.querySelector(".second").style.transform =
    "translate(-50%, -50%) rotate(10deg)";
  document.querySelector(".second").style.top = "50%";
  document.querySelector(".second").style.left = "50%";
  // *************
  document.querySelector(".third").style.transform =
    "translate(-50%, -50%) rotate(20deg)";
  document.querySelector(".third").style.top = "50%";
  document.querySelector(".third").style.left = "50%";
}
