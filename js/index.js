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
  let data = {
    good_1: {
      name: "제품1",
      img: "promotion1.jpg",
      link: "",
    },
    good_2: {
      name: "제품2",
      img: "promotion2.png",
      link: "",
    },
    good_3: {
      name: "제품3",
      img: "promotion3.jpg",
      link: "",
    },
    good_4: {
      name: "제품4",
      img: "promotion4.jpg",
      link: "",
    },
    good_5: {
      name: "제품5",
      img: "promotion5.jpg",
      link: "",
    },
    good_6: {
      name: "제품6",
      img: "promotion6.jpg",
      link: "",
    },
  };

  let swPromotionHtml = ``;
  for (let i = 0; i < 6; i++) {
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

  let shoppingDate = {
    good_count: 5,
    good_1: {
      link: "#",
      pic: "good1.png",
      product: "맥 MAC 립스틱",
      retio: 5,
      price: "11,950",
    },
    good_2: {
      link: "#",
      pic: "good2.jpg",
      product: "[장터할매]2023년 햇양파 중품/짱아치용 특품 3kg~10kg",
      retio: 5,
      price: "11,950",
    },
    good_3: {
      link: "#",
      pic: "good3.jpg",
      product:
        "QCY GTS 스마트워치 2세대 블랙/ 블루투스 통화가능 / 실리콘 스트랩 메탈 스트랩 TPU 보호필름 추가구매",
      retio: 5,
      price: "11,950",
    },
    good_4: {
      link: "#",
      pic: "good4.jpg",
      product: "[베베당] 유기농 롱스틱 골고루 10봉 세트",
      retio: 5,
      price: "11,950",
    },
    good_5: {
      link: "#",
      pic: "good4.jpg",
      product: "[베베당] 유기농 롱스틱 골고루 10봉 세트",
      retio: 5,
      price: "11,950",
    },
  };

  let swShoppingHtml = ``;
  for (let i = 0; i < shoppingDate.good_count; i++) {
    let obj = shoppingDate[`good_${i + 1}`];

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

  let tourData = {
    tour_total: 4,
    tour_1: {
      link: "#",
      pic: "tour1.jpg",
      alt: "tour",
      category: "반짝특가",
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일[퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
    tour_2: {
      link: "#",
      pic: "tour2.jpg",
      alt: "tour",
      category: " ",
      // 이 친구는 falsey?? 한 값
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일[퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
    tour_3: {
      link: "#",
      pic: "tour3.jpg",
      alt: "tour",
      category: "반짝특가",
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일[퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
    tour_4: {
      link: "#",
      pic: "tour4.jpg",
      alt: "tour",
      category: "반짝특가",
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일[퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
  };

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
        }><span class="tour-cate">${obj.category || "카테고리 없음"}</span></li>
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

  let ticketData = {
    ticket_total: 5,
    ticket_1: {
      link: "#",
      pic: "musical1.gif",
      alt: "티켓",
      rank: "1",
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      hall: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_2: {
      link: "#",
      pic: "musical2.gif",
      alt: "티켓",
      rank: "2",
      title: "불멸의 음악 불멸의 사랑 - 베토벤",
      hall: "세종문과회관 대극장",
      date: "2023.04.14 ~ 2023.05.15",
      sale: "단독판매",
    },
    ticket_3: {
      link: "#",
      pic: "musical3.gif",
      alt: "티켓",
      rank: "3",
      title: "해적",
      hall: "서경대학교 공연예술센터",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_4: {
      link: "#",
      pic: "musical4.gif",
      alt: "티켓",
      rank: "4",
      title: "뮤지컬 맘마미아",
      hall: "충무아트센터 소극장",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_5: {
      link: "#",
      pic: "musical1.gif",
      alt: "티켓",
      rank: "5",
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      hall: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
  };

  let swTicketHtml = "";
  for (let i = 0; i < ticketData.ticket_total; i++) {
    let obj = ticketData[`ticket_${i + 1}`];
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
              <span class="ticket-sale">
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

  // 인터파크 라이브 관련
  let swLiveData = {
    live_total: 4,
    live_1: {
      link: "#",
      pic: "live1.jpg",
      alt: "라이브이미지",
      cate: "방송예정",
      title: "2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다준비했어요😆",
      date: "04월 27일 (목)",
      time: "16:00",
      thumbalt: "썸네일 이미지",
      desc: "[미미의밥상] 감자탕 4.7kg(국내산등뼈 100% 10인분)+라면사리",
      price: "99,999",
    },
    live_2: {
      link: "#",
      pic: "live2.jpg",
      alt: "라이브이미지",
      cate: "방송예정",
      title: "3박 4일로 떠나는 초호화 호캉스 여행! 올 여름 특가 세일!",
      date: "05월 21일 (일)",
      time: "13:00",
      thumbalt: "썸네일 이미지",
      desc: "3박 4일로 떠나는 초호화 호캉스 여행! 올 여름 특가 세일!",
      price: "99,999",
    },
    live_3: {
      link: "#",
      pic: "live3.jpg",
      alt: "라이브이미지",
      cate: "방송예정",
      title: "신동진10Kg,단일품종,직도정",
      date: "04월 27일 (목)",
      time: "11:00",
      thumbalt: "썸네일 이미지",
      desc: "신동진10Kg,단일품종,직도정",
      price: "99,999",
    },
    live_4: {
      link: "#",
      pic: "live4.jpg",
      alt: "라이브이미지",
      cate: "방송예정",
      title: "어딘지 모르겠지만 정말로 힐링되는 분위기의 당일 여행지!",
      date: "04월 27일 (목)",
      time: "16:00",
      thumbalt: "썸네일 이미지",
      desc: "어딘지 모르겠지만 정말로 힐링되는 분위기의 당일 여행지!",
      price: "99,999",
    },
  };

  let swLiveHtml = ``;
  for (let i = 0; i < swLiveData.live_total; i++) {
    let obj = swLiveData[`live_${i + 1}`];
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

  let swBookData = {
    books_total: 10,
    book_1: {
      link: "#",
      pic: "book1.jpg",
      alt: "책 이미지",
      title: "대한민국 청약지도",
      price: "18,000",
    },
    book_2: {
      link: "#",
      pic: "book2.jpg",
      alt: "책 이미지",
      title: "천명관 장면소설",
      price: "18,000",
    },
    book_3: {
      link: "#",
      pic: "book3.jpg",
      alt: "책 이미지",
      title: "GOOD BYS 코드네임",
      price: "18,000",
    },
    book_4: {
      link: "#",
      pic: "book4.jpg",
      alt: "책 이미지",
      title: "대한민국 청약지도",
      price: "18,000",
    },
    book_5: {
      link: "#",
      pic: "book1.jpg",
      alt: "책 이미지",
      title: "천명관 장면소설",
      price: "18,000",
    },
    book_6: {
      link: "#",
      pic: "book2.jpg",
      alt: "책 이미지",
      title: "GOOD BYS 코드네임",
      price: "18,000",
    },
    book_7: {
      link: "#",
      pic: "book3.jpg",
      alt: "책 이미지",
      title: "대한민국 청약지도",
      price: "18,000",
    },
    book_8: {
      link: "#",
      pic: "book4.jpg",
      alt: "책 이미지",
      title: "대한민국 청약지도",
      price: "18,000",
    },
    book_9: {
      link: "#",
      pic: "book1.jpg",
      alt: "책 이미지",
      title: "대한민국 청약지도",
      price: "18,000",
    },
    book_10: {
      link: "#",
      pic: "book2.jpg",
      alt: "책 이미지",
      title: "대한민국 청약지도",
      price: "18,000",
    },
  };
  let swBookHtml = ``;
  for (i = 0; i < swBookData.books_total; i++) {
    let obj = swBookData[`book_${i + 1}`];
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

  //  이벤트 관련

  let swEventData = {
    event_total: 4,
    event_1: {
      link: "#",
      pic: "banner1.jpg",
      alt: "이벤트 이미지",
    },
    event_2: {
      link: "#",
      pic: "banner2.jpg",
      alt: "이벤트 이미지",
    },
    event_3: {
      link: "#",
      pic: "banner3.jpg",
      alt: "이벤트 이미지",
    },
    event_4: {
      link: "#",
      pic: "banner4.jpg",
      alt: "이벤트 이미지",
    },
  };
  let swEventHtml = ``;
  for (let i = 0; i < swEventData.event_total; i++) {
    let obj = swEventData[`event_${i + 1}`];
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
