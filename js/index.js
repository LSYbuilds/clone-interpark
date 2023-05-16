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

  // 쇼핑관련
  let shoppingData;
  const shoopingxhttp = new XMLHttpRequest();
  shoopingxhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      shoppingData = JSON.parse(req.response);
      console.log(shoppingData);
      makeShoppingSlide();
    }
  };

  shoopingxhttp.open("GET", "shoppingdata.json");
  shoopingxhttp.send();

  function makeShoppingSlide() {
    let swShoppingHtml = ``;
    for (let i = 0; i < shoppingData.good_count; i++) {
      let obj = shoppingData[`good_${i + 1}`];

      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="good">
          <img src="images/${obj.pic}" alt="${obj.product}" />
          <div class="good-info">
            <ul class="good-info-list">
              <li>
                <b><span>${obj.retio}%</span> ${obj.price}원</b>
              </li>
              <li><p>${obj.product}</p></li>
            </ul>
          </div>
        </a>
      </div>
      `;
      swShoppingHtml += temp;
    }
    let swShoppingWrapper = document.querySelector(
      ".sw-shopping .swiper-wrapper"
    );
    swShoppingWrapper.innerHTML = swShoppingHtml;
  }

  let shoppingSwiper = new Swiper(".sw-shopping", {
    slidesPerView: 5,
    grid: {
      rows: 2,
      fill: "row",
    },
    spaceBetween: 10,
    navigation: {
      nextEl: ".shopping .sw-next",
      prevEl: ".shopping .sw-prev",
    },
    breakpoints: {
      1024: {
        spaceBetween: 32,
        slidesPerView: 3,
        // 화면당 3개씩 슬라이드 이동
        slidesPerGroup: 3,
        grid: {
          rows: 1,
        },
      },
      1280: {
        spaceBetween: 26,
        slidesPerView: 4,
        // 화면당 4개씩 슬라이드 이동
        slidesPerGroup: 4,
        grid: {
          rows: 1,
        },
      },
    },
  });

  // 투어 관련
  let tourData;
  const tourxhttp = new XMLHttpRequest();
  tourxhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      tourData = JSON.parse(req.response);
      console.log(tourData);
      makeTourSlide();
    }
  };

  tourxhttp.open("GET", "tourdata.json");
  tourxhttp.send();

  function makeTourSlide() {
    let swTourHtml = ``;
    for (let i = 0; i < tourData.tour_total; i++) {
      let obj = tourData[`tour_${i + 1}`];
      let cate = obj.cate;

      let temp = `
    <div class="swiper-slide">
      <a href="${obj.link}" class="tour-link">
        <div class="tour-img">
          <img src="images/${obj.pic}" alt="${obj.alt}" />
        </div>
      <div class="tour-info">
        <ul class="tour-info-list">
          <li ${
            obj.category ? (style = "display:none") : (style = "display:none")
          }><span class="tour-cate">${
        obj.category || "카테고리 없음"
      }</span></li>
          <li>
            <span class="tour-title">
              ${obj.title}
            </span>
          </li>
          <li>
            <span class="tour-place">${obj.place}</span>
          </li>
          <li>
            <span class="tour-price"><b>${obj.price}</b>원~</span>
          </li>
        </ul>
      </div>
      </a>
    </div>
  `;
      swTourHtml += temp;
    }
    let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
    swTourWrapper.innerHTML = swTourHtml;
  }

  let tourSwiper = new Swiper(".sw-tour", {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: "row",
    },
    spaceBetween: 10,
    navigation: {
      nextEl: ".tour .sw-next",
      prevEl: ".tour .sw-prev",
    },
    breakpoints: {
      1024: {
        spaceBetween: 24,
        slidesPerView: 2,
        // 화면당 2개씩 슬라이드 이동
        slidesPerGroup: 3,
        grid: {
          rows: 1,
        },
      },
      1280: {
        spaceBetween: 26,
        slidesPerView: 3,
        // 화면당 4개씩 슬라이드 이동
        slidesPerGroup: 3,
        grid: {
          rows: 1,
        },
      },
    },
  });


  
  // 티켓 관련

  let ticketData;
  const ticketxhttp = new XMLHttpRequest();
  ticketxhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      ticketData = JSON.parse(req.response);
      console.log(ticketData);
      makeTicketSlide();
    }
  };

  ticketxhttp.open("GET", "ticketdata.json");
  ticketxhttp.send();

  function makeTicketSlide() {
    let swTicketHtml = "";
    for (let i = 0; i < ticketData.ticket_total; i++) {
      let obj = ticketData[`ticket_${i + 1}`];
      let sale = obj.sale;
      let temp = `
    <div class="swiper-slide">
      <a href="${obj.link}" class="ticket-link">
        <div class="ticket-img">
          <img src="images/${obj.pic}" alt="${obj.alt}" />
          <span class="ticket-rank">${obj.rank}</span>
        </div>
        <div class="ticket-info">
          <ul class="ticket-info-list">
            <li>
              <span class="ticket-title">
                <b>${obj.title}</b>
              </span>
            </li>
            <li>
              <span class="ticket-hall">${obj.hall}</span>
            </li>
            <li>
              <span class="ticket-date">
                ${obj.date}
              </span>
            </li>
            <li>
              <span class="ticket-sale" ${
                obj.sale ? (style = "display:none") : (style = "display:none")
              }>
                ${obj.sale}
              </span>
            </li>
          </ul>
        </div>
      </a>
    </div>
    `;
      swTicketHtml += temp;
    }
    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swTicketWrapper.innerHTML = swTicketHtml;
  }

  let ticketSwiper = new Swiper(".sw-ticket", {
    slidesPerView: "3",
    spaceBetween: 10,
    navigation: {
      nextEl: ".ticket .sw-next",
      prevEl: ".ticket .sw-prev",
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
  }

  // 인터파크 라이브 관련

  let liveSwiepr = new Swiper(".sw-live", {
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

  // 책 관련

  let bookData;
  const bookxhtpp = new XMLHttpRequest();
  bookxhtpp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      bookData = JSON.parse(req.response);
      console.log(bookData);
      makeBookSlide();
    }
  };

  bookxhtpp.open("GET", "bookdata.json");
  bookxhtpp.send();

  function makeBookSlide() {
    let swBookHtml = ``;
    for (i = 0; i < bookData.books_total; i++) {
      let obj = bookData[`book_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
      <a href="${obj.link}" class="books-link">
        <div class="books-img">
          <img src="./images/${obj.pic}" alt="${obj.alt}" />
        </div>
        <div class="books-info">
          <p class="books-info-title">${obj.title}</p>
          <p class="books-info-price">
            <em>${obj.price}</em>
          </p>
        </div>
      </a>
      </div>
      `;
      swBookHtml += temp;
    }

    let swBookWrapper = document.querySelector(".sw-books .swiper-wrapper");
    swBookWrapper.innerHTML = swBookHtml;
  }

  let booksSwiper = new Swiper(".sw-books", {
    slidesPerView: 3,
    grid: {
      rows: 4,
      fill: "row",
    },
    spaceBetween: 19,
    navigation: {
      nextEl: ".books .sw-next",
      prevEl: ".books .sw-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        grid: {
          rows: 1,
        },
      },
      1280: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 27,
        grid: {
          rows: 1,
        },
      },
    },
  });

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
  }

  //  이벤트 관련

  let eventsSwiper = new Swiper(".sw-events", {
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
};
