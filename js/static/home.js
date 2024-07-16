$(document).ready(function () {
  $.getJSON("js/static/habitaciones.json", function (data) {
    template = "";
    data.map((hab) => {
      template += `
        <div class="swiper-slide habitaciones">
            <a href="view/room_detail?category=${hab.slug}" class="link-page">
              <img
                src="img/${hab.img_url}"
                alt=""
                class="img-slider img-slider-hab"
              />
              <div class="descripcion-slider">
                <span class="type-hab">${hab.categoria}</span>
                <span class="precio-hab">S/${hab.precio}.00</span>
              </div>
            </a>
          </div>
        `;
    });
    $(".swiper.habitaciones .swiper-wrapper").html(template);
    new Swiper(".habitaciones", {
      autoplay: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 3,
          spaceBetween: 40,
          direction: "vertical",
        },
        450: {
          slidesPerView: 2,
          spaceBetween: 20,
          direction: "horizontal",
        },
        850: {
          slidesPerView: 3,
          spaceBetween: 30,
          direction: "horizontal",
          //   navigation: {
          //     nextEl: ".swiper-button-next",
          //     prevEl: ".swiper-button-prev",
          //   },
        },
      },
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true,
      //   },
    });
  });

  // modal details qnt
  $(".list-detail-inputs").click(() => {
    $(".detail-add-inputs").toggleClass("hidden");
  });

  // cuantificador
  $(".block-list-add .list-box.more").click((e) => {
    let target = e.target.parentNode;
    console.log(target);
    let number = $(target).find(".qnt-box").text();
    number = Number(number) + 1;
    $(target).find(".qnt-box").text(number);
    $(target).find(".less").removeClass("disabled");
    let category = $(target).attr("key_qnt-type");
    switch (category) {
      case "adults":
        $("#sr-qnt-0").html(number + " adulto(s)");
        break;
      case "ninos":
        $("#sr-qnt-1").html(" . " + number + " niño(s)");
        break;
      case "habs":
        $("#sr-qnt-2").html(" . " + number + " habitacion(es)");
        break;

      default:
        break;
    }
  });
  // disminuir
  $(".block-list-add .list-box.less").click((e) => {
    let target = e.target.parentNode;
    let category = $(target).attr("key_qnt-type");
    console.log(category);
    let number = Number($(target).find(".qnt-box").text());
    number = number - 1;
    switch (category) {
      case "adults":
        if (number == 1 || number == 0) {
          $(target).find(".list-box.less").addClass("disabled");
        }
        if (number > 0) {
          $(target).find(".qnt-box").text(number);
          $("#sr-qnt-0").html(number + " adulto(s)");
        }
        break;
      case "ninos":
        if (number == 0) {
          $(target).find(".list-box.less").addClass("disabled");
        }
        if (number >= 0) {
          $("#sr-qnt-1").html(" . " + number + " niño(s)");
          $(target).find(".qnt-box").text(number);
        }
        break;
      case "habs":
        if (number == 1 || number == 0) {
          $(target).find(".list-box.less").addClass("disabled");
        }
        if (number > 0) {
          $("#sr-qnt-2").html(" . " + number + " habitacion(es)");
          $(target).find(".qnt-box").text(number);
        }
        break;

      default:
        break;
    }
  });
});
