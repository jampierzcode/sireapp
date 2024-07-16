$(document).ready(function () {
    $.getJSON("../../js/static/habitaciones.json", function (data) {
        template = "";
        data.map((hab) => {
            template += `
              <div class="swiper-slide habitaciones">
                    <div class="link-page row">
                        <div class="col-md-6">
                            <img src="../../img/${hab.img_url}" alt="" class="img-slider img-slider-hab" />
                        </div>
                        <div class="col-md-6">
                            <div class="descripcion-slider">
                                <span class="type-hab">${hab.categoria}</span>
                                <p>${hab.caracteristicas}</p>
                                <span class="precio-hab">S/${hab.precio}.00</span>
                                <a class="precio-hab view" href="../../view/room_detail?category=${hab.slug}" target="_blank"><ion-icon name="arrow-redo-outline"></ion-icon> Ver habitación</a>
                                </div>
                        </div>
                    </div>
                </div>
            `;
        });
        $(".swiper.habitacion .swiper-wrapper").html(template);
        new Swiper(".habitacion", {
            autoplay: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            slidesPerView: 6,
            spaceBetween: 20,
            direction: "vertical",
            //   pagination: {
            //     el: ".swiper-pagination",
            //     clickable: true,
            //   },
        });
    });
})