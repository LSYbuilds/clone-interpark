/**
 * 작성자 : 이상윤
 * 연락처 : tkddbs2009@naver.com
 * 작성일 : 23-05-22
 * 기능 : 티켓 리스트 슬라이드 코드
 * 업데이트 : 각 티켓 리스트 목록 출력 함수화
 */

window.addEventListener("load", function () {
  function praseTicket(_menu) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeTicketSlide(data);
      }
    };

    if (_menu === "뮤지컬") {
      xhr.open("GET", "ticketdata.json");
    } else if (_menu === "콘서트") {
      xhr.open("GET", "ticketdata1.json");
    } else if (_menu === "연극") {
      xhr.open("GET", "ticketdata2.json");
    } else if (_menu === "클래식/무용") {
      xhr.open("GET", "ticketdata3.json");
    } else if (_menu === "스포츠") {
      xhr.open("GET", "ticketdata4.json");
    } else if (_menu === "레저/캠핑") {
      xhr.open("GET", "ticketdata5.json");
    } else if (_menu === "전시/행사") {
      xhr.open("GET", "ticketdata6.json");
    } else if (_menu === "아동/가족") {
      xhr.open("GET", "ticketdata7.json");
    }
    xhr.send();
  }

  praseTicket("뮤지컬");

  let ticketSwiper;

  // 스와이퍼 슬라이더는 만들기 전에 제거

  function makeTicketSlide(_data) {
    let swTicketHtml = ``;
    for (let i = 0; i < _data.ticket_total; i++) {
      let obj = _data[`ticket_${i + 1}`];
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

    if (ticketSwiper) {
      ticketSwiper.destroy();
    }

    ticketSwiper = new Swiper(".sw-ticket", {
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
  }

  let btns = document.querySelectorAll(".ticket .btns a");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btns.forEach(function (btn) {
        btn.classList.remove("btns-active");
      });
      btn.classList.add("btns-active");
    });
  });

  // btns.forEach(function (btns, index) {
  //   btns.addEventListener("click", function () {});
  // });

  btns[0].onclick = function (event) {
    event.preventDefault();
    praseTicket("뮤지컬");
  };
  btns[1].onclick = function (event) {
    event.preventDefault();
    praseTicket("콘서트");
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    praseTicket("연극");
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    praseTicket("클래식/무용");
  };
  btns[4].onclick = function (event) {
    event.preventDefault();
    praseTicket("스포츠");
  };
  btns[5].onclick = function (event) {
    event.preventDefault();
    praseTicket("레저/캠핑");
  };
  btns[6].onclick = function (event) {
    event.preventDefault();
    praseTicket("전시/행사");
  };
  btns[7].onclick = function (event) {
    event.preventDefault();
    praseTicket("아동가족");
  };
});
