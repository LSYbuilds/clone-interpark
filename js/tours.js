window.addEventListener("load", function () {
  let showIndex = 0;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      let data = JSON.parse(req.response);
      parseTour(data);
    }
  };
  xhr.open("GET", "data/tourdatas.json");
  xhr.send();

  let jsonData;

  // 버튼 생성

  let btns = document.querySelector(".tour .btns");

  function parseTour(_data) {
    jsonData = _data;
    // a 태그만들기
    let btHtml = ``;
    let dataArr = _data.tour;
    for (let i = 0; i < dataArr.length; i++) {
      let temp = `<a href="#">${dataArr[i].catename}</a>`;
      btHtml += temp;
    }
    btns.innerHTML = btHtml;

    let aTags = document.querySelectorAll(".tour .btns a ");

    for (let i = 0; i < dataArr.length; i++) {
      aTags[i].onclick = function (event) {
        event.preventDefault();
        makelist(i);
      };
    }
    makelist(0);
  }

  // 스와이퍼 초기화
  let tourSwiper;

  function makelist(_idx) {
    let html = ``;
    let listData = jsonData.tour[_idx].list;
    let listTotal = listData.length;
    for (let i = 0; i < listTotal; i++) {
      let obj = listData[i];
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="tour-link">
          <div class="tour-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="tour-info">
            <ul class="tour-info-list">
              <li ${
                obj.category ? "style='display:block'" : "style='display:none'"
              }>
                <span class="tour-cate">${obj.category}</span>
              </li>
              <li>
                <span class="tour-title">${obj.title}</span>
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
      html += temp;
    }
    let swWrapper = document.querySelector(".sw-tour .swiper-wrapper");
    swWrapper.innerHTML = html;

    if (tourSwiper) {
      tourSwiper.destroy();
    }

    tourSwiper = new Swiper(".sw-tour", {
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
          spaceBetween: 32,
          slidesPerView: 2,
          // 화면당 2개씩 슬라이드 이동
          slidesPerGroup: 2,
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

    let btna = document.querySelectorAll(".tour .btns a ");
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
