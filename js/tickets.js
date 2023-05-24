/**
 * 작성자 : 이상윤
 * 연락처 : tkddbs2009@naver.com
 * 작성일 : 23-05-22
 * 기능 : 티켓 리스트 슬라이드 코드
 * 업데이트 : 각 티켓 리스트 목록 출력 함수화
 */

window.addEventListener("load", function () {
  let showIndex = 0;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      let data = JSON.parse(req.response);
      parseTicket(data);
    }
  };
  xhr.open("GET", "data/ticketdatas.json");
  xhr.send();

  // JSON데이터 보관

  let jsonData;

  // 버튼들 html 쏘기
  let btns = document.querySelector(".ticket .btns");
  function parseTicket(_data) {
    jsonData = _data;
    // a 태그만들기
    let btHtml = ``;
    let dataArr = _data.ticket;
    for (let i = 0; i < dataArr.length; i++) {
      let temp = `<a href="#">${dataArr[i].catename}</a>`;
      btHtml += temp;
    }
    btns.innerHTML = btHtml;

    let aTags = document.querySelectorAll(".ticket .btns a ");

    for (let i = 0; i < dataArr.length; i++) {
      aTags[i].onclick = function (event) {
        event.preventDefault();
        makeList(i);
      };
    }
    makeList(0);
    // 여기에 넣어라!
  }
  // 스와이퍼 초기화
  let ticketSwiper;
  function makeList(_idx) {
    let html = ``;
    let listData = jsonData.ticket[_idx].list;
    let listTotal = listData.length;
    for (let i = 0; i < listTotal; i++) {
      let obj = listData[i];
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
      html += temp;
    }
    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swTicketWrapper.innerHTML = html;

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
    let btna = document.querySelectorAll(".ticket .btns a");
    btna.forEach(function (bt) {
      bt.addEventListener("click", function () {
        btna.forEach(function (btn) {
          btn.classList.remove("btns-active");
        });
        bt.classList.add("btns-active");
      });
    });
  }
});
