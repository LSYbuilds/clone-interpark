window.addEventListener("load", function () {
    // tour 데이터 파싱 및 슬라이드 제작
    function parseTour(_cate) {
        if (_cate === "망설이면 품절") {
            fatch("data/tourdataJS.json")
                .then((res) => res.json())
                .then((result) => makeTourSlide(result))
                .catch((err) => console.log(err));
            // tourXhttp.open("GET", "data/tourdataJS.json");
        } else if (_cate === "패키지") {
            fatch("data/tourdataJS.json")
                .then((res) => res.json())
                .then((result) => makeTourSlide(result))
                .catch((err) => console.log(err));
            // tourXhttp.open("GET", "data/tourdata1.json");
        } else if (_cate === "숙소") {
            fatch("data/tourdata2.json")
                .then((res) => res.json())
                .then((result) => makeTourSlide(result))
                .catch((err) => console.log(err));
            // tourXhttp.open("GET", "data/tourdata2.json");
        } else if (_cate === "해외숙소") {
            fatch("data/tourdata3.json")
                .then((res) => res.json())
                .then((result) => makeTourSlide(result))
                .catch((err) => console.log(err));
            // tourXhttp.open("GET", "data/tourdata3.json");
        }
    }
    parseTour("망설이면 품절");

    let tourSwiper;

    function makeTourSlide(_data) {
        let swTourHtml = ``;
        for (let i = 0; i < _data.tour_total; i++) {
            let obj = _data[`tour_${i + 1}`];
            let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="tour-link">
          <div class="tour-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="tour-info">
            <ul class="tour-info-list">
              <li ${obj.category ? "style='display:block'" : "style='display:none'"}>
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
            swTourHtml += temp;
        }

        let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
        swTourWrapper.innerHTML = swTourHtml;

        // 새로 생성전에 swiper API 를 이용해서 삭제한다.
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
    }
});
