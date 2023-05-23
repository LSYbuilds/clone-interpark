/**
 * 작성자 : 이상윤
 * 연락처 : tkddbs2009@naver.com
 * 작성일 : 23-05-22
 * 기능 : 라이프 리스트 슬라이드 코드
 * 업데이트 : 각 라이프 리스트 목록 출력 함수화
 */
window.addEventListener("load", function () {
  // 인터파크 라이브 관련

  let liveData;
  const livexhttp = new XMLHttpRequest();
  livexhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      liveData = JSON.parse(req.response);
      console.log(liveData);
      makeLiveSlide();
    }
  };

  livexhttp.open("GET", "livedata.json");
  livexhttp.send();

  let liveSwiepr;

  function makeLiveSlide() {
    let swLiveHtml = ``;
    for (let i = 0; i < liveData.live_total; i++) {
      let obj = liveData[`live_${i + 1}`];
      let temp = `
    <div class="swiper-slide">
      <a href="${obj.link}" class="live-link">
        <div class="live-img">
          <img src="./images/${obj.pic}" alt="${obj.alt}" />
        <div class="live-info">
        <div class="live-info-top">
          <span class="live-info-cate">${obj.cate}</span>
            <p class="live-info-title">${obj.title}</p>
        </div>
        <div class="live-info-main">
          <p class="live-info-date">${obj.date}</p>
          <p class="live-info-time">${obj.time}</p>
        </div>
        <div class="live-info-bottom clearfix">
          <div class="live-info-thumb">
            <img src="./images/${obj.pic}" alt="${obj.thumbalt}" />
          </div>
          <div class="live-info-desc">
            <p class="live-info-desc-title">${obj.desc}</p>
            <p class="live-info-desc-price"><em>22%</em> <b>${obj.price}</b>원</p>
          </div>
        </div>
    </div>
  </div>
</a>
    </div>
    `;
      swLiveHtml += temp;
    }

    let swLiveWrapper = document.querySelector(".sw-live .swiper-wrapper");
    swLiveWrapper.innerHTML = swLiveHtml;

    if (liveSwiepr) {
      liveSwiepr.destory();
    }
    liveSwiepr = new Swiper(".sw-live", {
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: ".live .sw-next",
        prevEl: ".live .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }
});
