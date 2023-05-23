window.onload = function () {
  // 위로 이동하기
  const goTop = document.querySelector(".totop");
  goTop.addEventListener("click", function () {
    // 스크롤이 위로 올라가는 코드
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      // 이것은 스크롤이동할때 부드럽게 이동하는 코드이다.
    });
  });

  // new를 통하여 만들어진 객체를 할당(=)하면 인스턴스가 생성.

  // 백틱을 이용한 html 생성
  // json데이터로 뽑아보자
  //  .sw-promotion 에 출력할 html 저장
  // for 문을 이용한 데이터 html 생성
  // json 형태 : JavaScript Object Notaioion 형식의 데이터
  // prodata.json을 불러와서 배치한다.

  // 외부데이터를 불러드릴때 쓴다
  let data;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      // console.log(req.response);
      // 현재 전달된 문자들은 json이 아니다.
      // req.response 는 데이터 타입이 문자열이다
      // 문자열을 json 객체로 변경하는 작업을 해야함.
      data = JSON.parse(req.response);
      makePromotionSlide();
    }
  };

  xhttp.open("GET", "prodata.json");
  xhttp.send();

  function makePromotionSlide() {
    let swPromotionHtml = ``;
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];
      let html = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}">
        </a>
      </div>
      `;
      swPromotionHtml += html;
    }

    // 위의 백틱 내용을 넣어줄 장소를 저장
    let swPromotionWrapper = document.querySelector(
      ".sw-promotion .swiper-wrapper"
    );

    swPromotionWrapper.innerHTML = swPromotionHtml;
  }

  let promotionSwiper = new Swiper(".sw-promotion", {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".promotion .sw-next",
      prevEl: ".promotion .sw-prev",
    },
    pagination: {
      el: ".sw-promotion-pg",
      clickable: true,
    },
    breakpoints: {
      760: {
        slidesPerView: 2,
      },
    },
  });

};
