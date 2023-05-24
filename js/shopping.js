/**
 * 작성자 : 이상윤
 * 연락처 : tkddbs2009@naver.com
 * 작성일 : 23-05-22
 * 기능 : 쇼핑몰 리스트 슬라이드 코드
 * 업데이트 : 각 쇼핑몰 리스트 목록 출력 함수화
 */
window.addEventListener("load", function () {
  let showIndex = 0;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      let data = JSON.parse(req.response);
      parseShopping(data);
    }
  };
  xhr.open("GET", "data/shoppings.json");
  xhr.send();

  // JSONDATA보관
  let jsonData;

  // 버튼포커스

  // 버튼들
  let btns = this.document.querySelector(".shopping .btns");

  function parseShopping(_data) {
    jsonData = _data;
    // a태그만들기
    let btHtml = ``;
    let dataArr = _data.shopping;
    for (let i = 0; i < dataArr.length; i++) {
      let temp = `<a href="#">${dataArr[i].catename}</a>`;
      btHtml += temp;
    }
    btns.innerHTML = btHtml;

    let aTags = document.querySelectorAll(".shopping .btns a ");

    for (let i = 0; i < dataArr.length; i++) {
      aTags[i].onclick = function (event) {
        event.preventDefault();
        makeList(i);
      };
    }
    makeList(0);
  }

  // 스와이퍼 초기화
  let shoppingSwiper;

  function makeList(_idx) {
    let html = ``;
    let listData = jsonData.shopping[_idx].list;
    let listTotal = listData.length;
    for (let i = 0; i < listTotal; i++) {
      let obj = listData[i];
      let temp = `
          <div class="swiper-slide">
            <a href="${obj.link}" class="good">
              <img src="images/${obj.pic}" alt="${obj.product}" />
              <div class="good-info">
                <ul class="good-info-list">
                  <li>
                    <b><span>${obj.ratio}%</span> ${obj.price}원</b>
                  </li>
                  <li><p>${obj.product}</p></li>
                </ul>
              </div>
            </a>
          </div>
          `;
      html += temp;
    }
    let swWrapper = document.querySelector(".sw-shopping .swiper-wrapper");
    swWrapper.innerHTML = html;

    if (shoppingSwiper) {
      shoppingSwiper.destroy();
    }
    shoppingSwiper = new Swiper(".sw-shopping", {
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

    let btna = document.querySelectorAll(".shopping .btns a");
    btna.forEach(function (bt) {
      bt.addEventListener("click", function () {
        btna.forEach(function (btn) {
          btn.classList.remove("btns-active");
        });
        bt.classList.add("btns-active");
      });
    });
  }
  // 전달된 매개변수 _menu 에 따라서
  // 관련된 json 데이터를 불러들이고,

  // if (_menu === "쎈딜") {
  //   xhr.open("GET", "data/shoppingdata.json");
  // } else if (_menu === "베스트") {
  //   xhr.open("GET", "data/shoppingdata1.json");
  // } else if (_menu === "오늘만특가") {
  //   xhr.open("GET", "data/shoppingdata2.json");
  // } else if (_menu === "어린이날") {
  //   xhr.open("GET", "data/어린이날.json");
  // }
  // xhr.send();

  // html 을 만들어서
  // slide 를 만들어준다.
  // };
  // parseShopping("쎈딜");

  // swiper 슬라이더는 만들기 전에 삭제하자
  // let shoppingSwiper;

  // function makeShoppingSlide(_data) {
  //   let swShoppingHtml = ``;
  //   for (let i = 0; i < _data.good_count; i++) {
  //     let obj = _data[`good_${i + 1}`];

  //     let temp = `
  //     <div class="swiper-slide">
  //       <a href="${obj.link}" class="good">
  //         <img src="images/${obj.pic}" alt="${obj.product}" />
  //         <div class="good-info">
  //           <ul class="good-info-list">
  //             <li>
  //               <b><span>${obj.retio}%</span> ${obj.price}원</b>
  //             </li>
  //             <li><p>${obj.product}</p></li>
  //           </ul>
  //         </div>
  //       </a>
  //     </div>
  //     `;
  //     swShoppingHtml += temp;
  //   }
  //   let swShoppingWrapper = document.querySelector(
  //     ".sw-shopping .swiper-wrapper"
  //   );
  //   swShoppingWrapper.innerHTML = swShoppingHtml;
  // }
  // 버튼 클릭시 카테코리 변경
  // 대상이 1개인 경우는 querySelecter
  // 대상이 다수인 경우는 querySelecterAll
  // 현재 a 태그가 4개 이므로 All!

  // const btns = this.document.querySelectorAll(".shopping .btns a");
  // let catename = ["쎈딜", "베스트", "오늘만특가", "어린이날"];
  // for (let i = 0; i < catename.length; i++) {
  //   btns[i].onclick = function (event) {
  //     event.preventDefault();
  //     parseShopping(catename[i]);
  //     for (let j = 0; j < btns.length; j++) {
  //       btns[j].classList.remove("btns-active");
  //     }
  //     // 포커스 적용
  //     this.classList.add("btns-active");
  //   };
  // }

  // btns[0].onclick = function (event) {
  //   event.preventDefault();
  //   parseShopping("쎈딜");
  // };
  // btns[1].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseShopping("베스트");
  // };
  // btns[2].onclick = function (event) {
  //   event.preventDefault();
  //   parseShopping("오늘만특가");
  // };
  // btns[3].onclick = function (event) {
  //   event.preventDefault();
  //   parseShopping("어린이날");
  // };
  // btns[4].onclick = function (event) {};

  // 새로 생성전에 swiper API를 이용해서 삭제한다.
  // if (shoppingSwiper) {
  //   shoppingSwiper.destory();
  // }
  // shoppingSwiper = new Swiper(".sw-shopping", {
  //   slidesPerView: 5,
  //   grid: {
  //     rows: 2,
  //     fill: "row",
  //   },
  //   spaceBetween: 10,
  //   navigation: {
  //     nextEl: ".shopping .sw-next",
  //     prevEl: ".shopping .sw-prev",
  //   },
  //   breakpoints: {
  //     1024: {
  //       spaceBetween: 32,
  //       slidesPerView: 3,
  //       // 화면당 3개씩 슬라이드 이동
  //       slidesPerGroup: 3,
  //       grid: {
  //         rows: 1,
  //       },
  //     },
  //     1280: {
  //       spaceBetween: 26,
  //       slidesPerView: 4,
  //       // 화면당 4개씩 슬라이드 이동
  //       slidesPerGroup: 4,
  //       grid: {
  //         rows: 1,
  //       },
  //     },
  //   },
  // });
  //버튼 클릭시 카테코리 변경
});
