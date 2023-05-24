window.addEventListener("load", function () {
  function parseBook(_menu) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeBookSlide(data);
      }
    };
    if (_menu === "MD'sPick") {
      xhr.open("GET", "data/bookdata.json");
    } else if (_menu === "베스트셀러") {
      xhr.open("GET", "data/bookdata1.json");
    } else if (_menu === "신간추천") {
      xhr.open("GET", "data/bookdata2.json");
    } else if (_menu === "특가할인") {
      xhr.open("GET", "data/bookdata3.json");
    }

    xhr.send();
  }
  parseBook("MD'sPick");
  // 슬라이더 만들기 전에 초기화
  let booksSwiper;

  function makeBookSlide(_data) {
    let swBookHtml = ``;
    for (i = 0; i < _data.books_total; i++) {
      let obj = _data[`book_${i + 1}`];
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

    if (booksSwiper) {
      booksSwiper.destroy();
    }
    booksSwiper = new Swiper(".sw-books", {
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

    const btns = document.querySelectorAll(".books .btns a");
    btns[0].onclick = function (event) {
      event.preventDefault();
      parseBook("MD'sPick");
    };
    btns[1].onclick = function (event) {
      event.preventDefault();
      parseBook("베스트셀러");
    };
    btns[2].onclick = function (event) {
      event.preventDefault();
      parseBook("신간추천");
    };
    btns[3].onclick = function (event) {
      event.preventDefault();
      parseBook("특가할인");
    };
  }
});
