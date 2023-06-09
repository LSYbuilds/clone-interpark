window.addEventListener("load", function () {
    // 선택된 출력 리스트 인덱스
    let showIndex = 0;

    // json Data 보관

    fetch("data/books.json")
        .then((res) => res.json())
        .then((result) => parseBooks(result))
        .catch((err) => console.log(err));

    let jsonData;

    // 버튼들
    let btns = this.document.querySelector(".books .btns");
    function parseBooks(_data) {
        jsonData = _data;
        // a 태그 만들기
        let btHtml = ``;
        let dataArr = _data.books;
        for (let i = 0; i < dataArr.length; i++) {
            let temp = `<a href="#" >${dataArr[i].catename}</a>`;
            btHtml += temp;
        }
        btns.innerHTML = btHtml;

        let aTags = document.querySelectorAll(".books .btns a");

        for (let i = 0; i < dataArr.length; i++) {
            aTags[i].onclick = function (event) {
                event.preventDefault();
                makeList(i);
            };
        }

        makeList(0);
    }

    // 슬라이더 만들기 전에 초기화
    let booksSwiper;

    // 목록 html 만들기
    function makeList(_idx) {
        let html = ``;
        let listData = jsonData.books[_idx].list;
        let listTotal = listData.length;
        for (let i = 0; i < listTotal; i++) {
            let obj = listData[i];
            let temp = ` 
      <div class="swiper-slide">
          <a href="${obj.link}" class="books-link">
          <div class="books-img">
              <img src="images/${obj.img}" alt="${obj.alr}" />
          </div>
          <div class="books-info">
              <p class="books-info-title">${obj.title}</p>
              <p class="books-info-price"><em>${obj.price}</em>원</p>
          </div>
          </a>
      </div>
    `;
            html += temp;
        }
        let swWrapper = document.querySelector(".sw-books .swiper-wrapper");
        swWrapper.innerHTML = html;

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
        let btna = document.querySelectorAll(".books .btns a");
        btna.forEach(function (bt) {
            bt.addEventListener("click", function () {
                btna.forEach(function (btn) {
                    btn.classList.remove("btns-active");
                });
                bt.classList.add("btns-active");
            });
        });
        // btna.forEach(function (bt) {
        //     bt.addEventListener("click", function () {
        //         btna.forEach(function (btn) {
        //             btn.classList.remove("btns-active");
        //         });
        //         bt.classList.add("btns-active");
        //     });
        // });
    }
});
