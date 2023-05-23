window.addEventListener("load", function () {
  //  이벤트 관련

  let eventData;
  const eventxhttp = new XMLHttpRequest();
  eventxhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      eventData = JSON.parse(req.response);
      console.log(eventData);
      makeEventSlide();
    }
  };

  eventxhttp.open("GET", "eventdata.json");
  eventxhttp.send();

  // 스와이퍼 초기화
  let eventsSwiper;

  function makeEventSlide() {
    let swEventHtml = ``;
    for (let i = 0; i < eventData.event_total; i++) {
      let obj = eventData[`event_${i + 1}`];
      let temp = `
       <div class="swiper-slide">
       <a href="${obj.link}" class="events-link">
         <img src="./images/${obj.pic}" alt="${obj.alt}" />
       </a>
     </div>
       `;
      swEventHtml += temp;
    }
    let swEventWrapper = document.querySelector(".sw-events .swiper-wrapper");
    swEventWrapper.innerHTML = swEventHtml;

    if (eventsSwiper) {
      eventsSwiper.destroy();
    }

    eventsSwiper = new Swiper(".sw-events", {
      slidesPerView: 3,
      spaceBetween: 27,
      navigation: {
        nextEl: ".event .sw-next",
        prevEl: ".event .sw-prev",
      },
      breakpoints: {
        1280: {
          slidesPerView: 4,
        },
      },
    });
  }
});
