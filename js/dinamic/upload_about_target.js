$(document).ready(function () {
  // variables de imagenes de file
  var profileFile;
  var portadaFile;

  var dataTargetUser;
  var stateNewDAtaTarget;
  var iconsSocials = [
    {
      title: "email",
      img: `<svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filterc9)">
          <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearc9)"></path>
          <path d="M66.0163 22H14.4268C13.9581 22 13.5169 22.1379 13.1309 22.3585L13.6823 22.9099L36.8163 46.0714C38.6913 47.9464 41.7519 47.9464 43.6269 46.0714L67.3399 22.386C66.9538 22.1379 66.4851 22 66.0163 22Z" fill="white"></path>
          <path d="M68.4695 24.454C68.4695 23.9853 68.3316 23.5441 68.111 23.1581L51.0156 40.4189L68.1662 57.5143C68.3592 57.1559 68.4695 56.7423 68.4695 56.3287V24.454Z" fill="white"></path>
          <path d="M12 24.454C12 23.9853 12.1379 23.5441 12.3585 23.1581L29.4539 40.4189L12.3033 57.5143C12.1103 57.1559 12 56.7423 12 56.3287V24.454Z" fill="white"></path>
          <path d="M50.1066 41.2185L44.1232 47.2019C41.9725 49.3526 38.4431 49.3526 36.2924 47.2019L30.309 41.2461L13.1309 58.3967C13.5169 58.6173 13.9305 58.7551 14.3992 58.7551H65.9888C66.4575 58.7551 66.8987 58.6173 67.2571 58.3967L66.2369 57.3765L50.1066 41.2185Z" fill="white"></path>
      </g>
      <defs>
          <filter id="filterc9" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
              <feOffset dy="-1"></feOffset>
              <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
          </filter>
          <linearGradient id="paint0_linearc9" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1E51EE"></stop>
              <stop offset="1" stop-color="#19E4FF"></stop>
          </linearGradient>
      </defs>
  </svg>`,
    },
    {
      title: "facebook",
      img: ` <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)" filter="url(#filter0_i)">
          <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearc6)"></path>
          <path d="M55.9244 51.5313L57.7211 39.7967H46.4821V32.1817C46.4821 28.9713 48.052 25.842 53.086 25.842H58.196V15.8517C58.196 15.8517 53.5585 15.0589 49.1249 15.0589C39.8684 15.0589 33.8185 20.6788 33.8185 30.853V39.7967H23.5293V51.5313H33.8185V80.3918C33.8185 80.3918 37.9962 80.3922 40.1503 80.3922C42.3044 80.3922 46.4821 80.3922 46.4821 80.3922V51.5313H55.9244Z" fill="white"></path>
      </g>
      <defs>
          <filter id="filter0_i" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
              <feOffset dy="-1"></feOffset>
              <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
          </filter>
          <linearGradient id="paint0_linearc6" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1BAFFF"></stop>
              <stop offset="1" stop-color="#0062E0"></stop>
          </linearGradient>
          <clipPath id="clip0">
              <rect width="80" height="80" fill="white"></rect>
          </clipPath>
      </defs>
  </svg>`,
    },
    {
      title: "instagram",
      img: `<svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filterc3)">
          <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_radial)"></path>
          <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint1_radial)"></path>
          <path d="M38.7619 10.4761C42.5714 10.4761 46.381 10.4761 50.1905 10.4761C52.5714 10.4761 55.0476 10.6666 57.4286 11.3332C61.619 12.4761 64.8571 14.8571 67.0476 18.5713C68.381 20.8571 68.9524 23.3332 69.2381 25.9047C69.4286 28.1904 69.5238 30.4761 69.5238 32.7618C69.5238 38.3809 69.5238 44.0951 69.5238 49.7142C69.5238 52.2856 69.3333 54.8571 68.6667 57.4285C67.2381 62.5713 64.0952 66.1904 59.1429 68.0951C56.7619 69.0475 54.1905 69.3332 51.619 69.4285C45.3333 69.5237 39.0476 69.619 32.7619 69.619C30.0952 69.619 27.3333 69.5237 24.7619 69.1428C21.0476 68.6666 17.8095 67.238 15.1429 64.4761C12.6667 61.9047 11.3333 58.7618 10.8571 55.238C10.2857 50.4761 10.381 45.7142 10.381 40.8571C10.381 36.8571 10.4762 32.9523 10.4762 28.9523C10.5714 26.1904 10.7619 23.4285 11.8095 20.7618C13.7143 15.8094 17.2381 12.7618 22.381 11.3332C24.7619 10.6666 27.2381 10.5713 29.7143 10.4761C32.5714 10.4761 35.7143 10.4761 38.7619 10.4761ZM64.2857 40.0951C64.2857 37.8094 64.381 35.619 64.2857 33.3332C64.1905 30.5713 64.0952 27.7142 63.8095 24.9523C63.619 23.0475 62.8571 21.238 61.5238 19.7142C59.3333 17.1428 56.4762 15.9999 53.2381 15.8094C50.0952 15.619 46.8571 15.5237 43.7143 15.5237C38 15.5237 32.2857 15.619 26.5714 15.8094C24.4762 15.9047 22.4762 16.3809 20.6667 17.5237C17.7143 19.3332 16.1905 22.0952 15.9048 25.4285C15.619 28.2856 15.5238 31.1428 15.4286 33.9999C15.4286 39.5237 15.4286 44.9523 15.5238 50.4761C15.5238 52.3809 15.8095 54.3809 16.1905 56.1904C16.7619 58.6666 18.1905 60.6666 20.2857 62.0951C22.381 63.5237 24.8571 63.9999 27.3333 64.0952C30.2857 64.1904 33.1429 64.2856 36.0952 64.2856C41.7143 64.2856 47.3333 64.1904 52.9524 64.0952C55.3333 63.9999 57.619 63.4285 59.5238 61.9999C61.9048 60.2856 63.3333 57.9047 63.7143 55.0475C64 52.9523 64.0952 50.8571 64.1905 48.7618C64.2857 45.9047 64.2857 43.0475 64.2857 40.0951Z" fill="white"></path>
          <path d="M54.9537 40C54.9537 48.4762 48.1918 55.1429 39.7156 55.1429C31.4299 55.1429 24.668 48.2858 24.668 39.9048C24.668 31.6191 31.5251 24.7619 39.9061 24.7619C48.1918 24.8572 54.9537 31.6191 54.9537 40ZM29.9061 40C29.9061 45.5238 34.3823 50 39.9061 50C45.4299 50 49.9061 45.5238 49.9061 40C49.9061 34.5715 45.4299 30.0953 39.9061 30.0953C34.287 30.0953 29.9061 34.4762 29.9061 40Z" fill="white"></path>
          <path d="M55.618 20.762C57.618 20.762 59.1418 22.2858 59.1418 24.1905C59.1418 26.0953 57.618 27.7143 55.7133 27.7143C53.8085 27.7143 52.1895 26.1905 52.1895 24.2858C52.1895 22.2858 53.7133 20.762 55.618 20.762Z" fill="white"></path>
      </g>
      <defs>
          <filter id="filterc3" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
              <feOffset dy="-1"></feOffset>
              <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
          </filter>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.17752 78.2474) scale(101.57)">
              <stop offset="0.09" stop-color="#FA8F21"></stop>
              <stop offset="0.78" stop-color="#D82D7E"></stop>
          </radialGradient>
          <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(55.4132 75.6787) scale(89.3828)">
              <stop offset="0.64" stop-color="#8C3AAA" stop-opacity="0"></stop>
              <stop offset="1" stop-color="#8C3AAA"></stop>
          </radialGradient>
      </defs>
  </svg>`,
    },
    {
      title: "whatsapp",
      img: `<svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filterc18)">
          <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearc18)"></path>
          <path d="M11.7656 68.2354C11.9539 67.4825 12.1421 66.9178 12.2362 66.3531C13.3656 62.4001 14.4009 58.4472 15.4362 54.4942C15.5303 54.1178 15.5303 53.6472 15.3421 53.3648C13.3656 49.8825 12.3303 46.1178 11.9539 42.0707C11.5774 37.7413 12.2362 33.506 13.8362 29.4589C16.3774 23.2472 20.6127 18.5413 26.448 15.2472C30.2127 13.1766 34.2597 12.0472 38.5892 11.8589C46.0244 11.5766 52.5186 13.7413 58.1656 18.6354C63.3421 23.1531 66.6362 28.8001 67.5774 35.5766C68.8009 43.9531 66.7303 51.3884 61.2715 57.8825C56.6597 63.3413 50.7303 66.6354 43.5774 67.5766C38.0244 68.3295 32.6597 67.5766 27.5774 64.9413C26.7303 64.5648 26.0715 64.4707 25.1303 64.6589C20.9892 65.7883 16.848 66.8236 12.7068 67.9531C12.6127 68.0472 12.2362 68.1413 11.7656 68.2354ZM39.3421 16.3766C38.5892 16.4707 37.0833 16.5648 35.6715 16.7531C30.4009 17.7884 25.8833 20.3295 22.3068 24.3766C18.1656 29.1766 16.1892 34.8236 16.5656 41.1295C16.7539 45.2707 18.0715 49.0354 20.3303 52.5178C20.5186 52.8001 20.5186 53.1766 20.4244 53.5531C19.8597 55.7178 19.295 57.8825 18.6362 60.0472C18.5421 60.4236 18.448 60.706 18.3539 61.0825C18.3539 61.1766 18.6362 61.4589 18.7303 61.4589C18.9186 61.4589 19.2009 61.3648 19.4833 61.2707C21.7421 60.706 24.095 60.0472 26.3539 59.4825C26.8244 59.3884 27.3892 59.4825 27.7656 59.6707C32.2833 62.306 37.1774 63.4354 42.3539 62.8707C48.7539 62.2119 54.0244 59.2942 57.9774 54.4001C61.8362 49.6001 63.6244 44.1413 63.1539 37.9295C62.7774 32.5648 60.8009 27.8589 57.1303 23.906C52.7068 19.0119 46.8715 16.4707 39.3421 16.3766Z" fill="white"></path>
          <path d="M47.3429 53.1765C45.1782 53.2706 43.2958 52.4235 41.4135 51.6706C38.1194 50.447 35.2959 48.3765 32.8488 45.8353C30.6841 43.6706 28.7076 41.3176 27.2958 38.5882C25.8841 36.1412 25.3194 33.5059 26.2606 30.7765C26.7311 29.4588 27.5782 28.3294 28.6135 27.3882C29.6488 26.5412 30.8723 26.7294 32.0958 27.0117C32.3782 27.1059 32.5664 27.3882 32.7547 27.6706C33.6017 29.5529 34.4488 31.4353 35.2017 33.4117C35.39 33.7882 35.2958 34.3529 35.0135 34.7294C34.637 35.3882 34.0723 36.047 33.5076 36.6117C32.8488 37.3647 32.7547 37.647 33.3194 38.4941C35.5782 42.3529 38.7782 45.0823 42.9194 46.6823C43.4841 46.8706 43.8606 46.7765 44.237 46.4C44.8958 45.5529 45.6488 44.7059 46.3076 43.9529C46.8723 43.2 47.1547 43.1059 48.0958 43.4823C48.8488 43.7647 49.5076 44.1412 50.2606 44.4235C51.2959 44.8941 52.3311 45.4588 53.3664 45.9294C54.0253 46.2117 54.2135 46.7765 54.2135 47.4353C53.9311 50.6353 51.39 52.9882 48.0958 53.0823C47.8135 53.1765 47.5311 53.1765 47.3429 53.1765Z" fill="white"></path>
      </g>
      <defs>
          <filter id="filterc18" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
              <feOffset dy="-1"></feOffset>
              <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
          </filter>
          <linearGradient id="paint0_linearc18" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00FF6A"></stop>
              <stop offset="1" stop-color="#00D31D"></stop>
          </linearGradient>
      </defs>
  </svg>`,
    },
    {
      title: "tiktok",
      img: `<svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filterc11)">
          <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="#020002"></path>
          <path d="M52.3062 32.3583C56.0659 35.0502 60.6718 36.6341 65.6464 36.6341V27.0461C64.7049 27.0463 63.7659 26.9479 62.8448 26.7525V34.2996C57.8707 34.2996 53.2654 32.7157 49.5046 30.024V49.5904C49.5046 59.3785 41.5827 67.3128 31.811 67.3128C28.1649 67.3128 24.7761 66.2087 21.9609 64.3152C25.1739 67.6058 29.6547 69.6471 34.6119 69.6471C44.3842 69.6471 52.3066 61.7128 52.3066 51.9243V32.3583H52.3062ZM55.7622 22.6851C53.8407 20.5825 52.5792 17.8654 52.3062 14.8614V13.6282H49.6513C50.3196 17.4462 52.5989 20.7081 55.7622 22.6851ZM28.1415 56.8041C27.068 55.3943 26.4879 53.6696 26.4905 51.8962C26.4905 47.4195 30.1139 43.7897 34.5843 43.7897C35.4174 43.7895 36.2456 43.9173 37.0395 44.1696V34.3673C36.1117 34.24 35.1752 34.1859 34.2392 34.2057V41.8354C33.4446 41.583 32.6161 41.4549 31.7828 41.4557C27.3124 41.4557 23.6891 45.0851 23.6891 49.5624C23.6891 52.7281 25.5003 55.469 28.1415 56.8041Z" fill="#FF004F"></path>
          <path d="M49.5046 30.0238C53.2653 32.7155 57.8706 34.2994 62.8448 34.2994V26.7523C60.0682 26.1599 57.6102 24.7066 55.7621 22.6851C52.5987 20.7079 50.3195 17.446 49.6513 13.6282H42.6777V51.9239C42.6619 56.3884 39.0447 60.0033 34.5839 60.0033C31.9552 60.0033 29.6199 58.7483 28.1409 56.8041C25.4998 55.4689 23.6887 52.7279 23.6887 49.5626C23.6887 45.0857 27.312 41.4559 31.7823 41.4559C32.6388 41.4559 33.4644 41.5894 34.2387 41.8356V34.2059C24.6387 34.4046 16.918 42.2613 16.918 51.9241C16.918 56.7476 18.8406 61.1204 21.9611 64.3154C24.7762 66.2087 28.1651 67.313 31.8111 67.313C41.583 67.313 49.5048 59.3783 49.5048 49.5904V30.0238H49.5046Z" fill="#FFFEFF"></path>
          <path d="M62.8454 26.7523V24.7116C60.3416 24.7154 57.887 24.0131 55.7627 22.6849C57.6432 24.7471 60.1194 26.1689 62.8454 26.7523ZM49.6518 13.6282C49.5881 13.2633 49.5391 12.896 49.5051 12.5273V11.2941H39.8765V49.5902C39.8612 54.0541 36.2441 57.6691 31.7829 57.6691C30.4732 57.6691 29.2366 57.3577 28.1414 56.8043C29.6204 58.7483 31.9558 60.0032 34.5844 60.0032C39.0448 60.0032 42.6627 56.3886 42.6783 51.9241V13.6282H49.6518ZM34.2397 34.2059V32.0335C33.4352 31.9233 32.624 31.8681 31.8119 31.8685C22.0392 31.8683 14.1172 39.8029 14.1172 49.5902C14.1172 55.7263 17.2307 61.1341 21.9618 64.3151C18.8414 61.1202 16.9187 56.7473 16.9187 51.9239C16.9187 42.2614 24.6393 34.4046 34.2397 34.2059Z" fill="#00F2EA"></path>
      </g>
      <defs>
          <filter id="filterc11" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
              <feOffset dy="-1"></feOffset>
              <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
          </filter>
      </defs>
  </svg>`,
    },
  ];

  // change image portada
  var template_portada = `<ion-icon class="text-[25px]" name="image"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu portada</p>`;

  var imgPerfil = $("#perfil_upload");
  var imgPortada = $("#portada_upload");
  console.log(imgPortada.val());
  $("#portada_overlay").click(function () {
    $(imgPortada).click();
  });
  $(imgPortada).change(function (e) {
    console.log("cargo la imagen");
    const file = e.target.files[0];
    portadaFile = file;
    mostrarVistaPrevia(file);
  });
  function mostrarVistaPrevia(input) {
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#portada_overlay").html(
          `<img class="rounded-lg object-cover w-full h-full dark:ring-gray-500" src="${e.target.result}" alt="rofile picture">`
        );
        $("#preview_cover_photo").attr("src", e.target.result);
        $("#content-portada").append(
          `<span id="delete_cover_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
        );
      };
      reader.readAsDataURL(input);
    }
  }
  $(document).on("click", "#delete_cover_photo", function () {
    $(this).remove();
    $("#portada_overlay").html(`
    <ion-icon class="text-[25px]" name="image"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu portada</p>
    `);

    $("#preview_cover_photo").attr(
      "src",
      "https://static.thenounproject.com/png/5647816-200.png"
    );

    $(imgPortada).val("");

    stateNewDAtaTarget.cover_photo = "";
    viewActivationChane();
  });
  // --------fin de change portada---------
  buscar_target_socials();
  function buscar_target_socials() {
    let funcion = "buscar_user_target_socials";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        if (response.trim() !== "no-register-socials") {
          createActive = true;
          const socials = JSON.parse(response);
          dataTargetSocial = socials;
          statenewDataSocial = dataTargetSocial.map((obj) =>
            JSON.parse(JSON.stringify(obj))
          );

          dataTargetSocial = socials.map((obj) => {
            let actived =
              obj.status === "0" || obj.status === "1"
                ? Boolean(Number(obj.status))
                : obj.status;
            obj.status = actived;
            return JSON.parse(JSON.stringify(obj));
          });
          statenewDataSocial = socials.map((obj) => {
            let actived =
              obj.status === "0" || obj.status === "1"
                ? Boolean(Number(obj.status))
                : obj.status;
            obj.status = actived;
            return JSON.parse(JSON.stringify(obj));
          });
        } else {
          createActive = false;
          const redesSociales = [
            {
              url: "",
              username: "Email",
              placeholder: "Ingresa tu correo electronico",
              user_id: 1,
              status: false,
              social: "email",
            },
            {
              url: "",
              username: "Facebook",
              placeholder: "Ingresa link de tu facebook",
              user_id: 1,
              status: false,
              social: "facebook",
            },
            {
              url: "",
              username: "Whatsapp",
              placeholder: "Ingresa link de tu api whatsapp",
              user_id: 1,
              status: false,
              social: "whatsapp",
            },
            {
              url: "",
              username: "Tiktok",
              placeholder: "Ingresa link de tu tiktok",
              user_id: 1,
              status: false,
              social: "tiktok",
            },
            {
              url: "",
              username: "Instagram",
              placeholder: "Ingresa  link de tu instagram",
              user_id: 2,
              status: false,
              social: "instagram",
            },
            // Agrega más redes sociales aquí
          ];
          dataTargetSocial = redesSociales.map((obj) =>
            JSON.parse(JSON.stringify(obj))
          );
          statenewDataSocial = redesSociales.map((obj) =>
            JSON.parse(JSON.stringify(obj))
          );
        }
        pintarPreviewRedes(statenewDataSocial);
      }
    );
  }
  // redes sociales
  function pintarPreviewRedes(redesSociales) {
    let template = "";
    redesSociales.forEach((red) => {
      if (red.status === true || Number(red?.status) === 1) {
        const svg = iconsSocials.find((e) =>
          e.title === red.social ? e.img : ""
        );
        let url = red?.url ? red?.url : "#";
        template += `
        <div class="flex items-center justify-center">
          <a class="jss807" href="${url}" target="_blank" style="margin-bottom: 0px; width: 54.58px; height: 74px; box-shadow: none; border-radius: 0px;">
          `;
        template += `${svg.img}`;
        template += `
          <span class="text-icon-target text-center block" data-testid="link-title" style="color: rgb(0, 0, 0); overflow: hidden; padding-top: 4px;">${red.username}</span>
          </a>
        </div>
        `;
      }
    });
    $("#links-container").html(template);
  }
  // fin de redes sociales

  // change img profile
  console.log(imgPerfil);
  $("#perfil_overlay").click(function () {
    console.log("click");
    $(imgPerfil).click();
  });
  $(imgPerfil).change(function (e) {
    console.log("cargo la imagen");
    const file = e.target.files[0];
    profileFile = file;
    console.log(file);
    console.log($(imgPerfil).val());

    mostrarVistaPreviaPerfil(file);
  });
  function mostrarVistaPreviaPerfil(input) {
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#perfil_overlay").html(
          `<img class="w-[80px] h-[80px] p-1 rounded-full" src="${e.target.result}" alt="rofile picture">`
        );
        $("#preview_perfil_photo").attr("src", e.target.result);
        $("#content-perfil").append(
          `<span id="delete_perfil_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
        );
      };
      reader.readAsDataURL(input);
    }
  }
  $(document).on("click", "#delete_perfil_photo", function () {
    $(this).remove();
    $("#perfil_overlay").html(`
    <ion-icon class="text-[25px]" name="person"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu perfil</p>
    `);

    $("#preview_perfil_photo").attr(
      "src",
      "https://static.thenounproject.com/png/5647816-200.png"
    );
    $(imgPerfil).val("");
    stateNewDAtaTarget.picture_perfil = "";
    viewActivationChane();
  });
  // --------fin de change img profile---------

  // profile y portada activar btn
  $(document).on("change", "#portada_upload, #perfil_upload", function (e) {
    // stateNewDAtaTarget;
    console.log(e);
    const etiqueta = $(this).attr("id");
    switch (etiqueta) {
      case "perfil_upload":
        stateNewDAtaTarget.picture_perfil = e.target.files[0].name;
        break;
      case "portada_upload":
        stateNewDAtaTarget.cover_photo = e.target.files[0].name;
        break;

      default:
        break;
    }

    viewActivationChane();
  });
  function viewActivationChane() {
    console.log(stateNewDAtaTarget);
    console.log(dataTargetUser);
    if (JSON.stringify(stateNewDAtaTarget) !== JSON.stringify(dataTargetUser)) {
      console.log("entro activar");
      enabled_update_acces_btn();
    } else {
      console.log("entro desactivar");
      disabled_update_acces_btn();
    }
  }
  buscar_target();
  function buscar_target() {
    let funcion = "buscar_user_target";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        setInterval(() => {
          $("#content-about").removeClass("hidden");
          $("#spinner-load").addClass("hidden");
        }, 3000);
        if (response.trim() === "no-register-target") {
          dataTargetUser = {
            picture_perfil: "",
            cover_photo: "",
            user_id: "",
            name_user: "",
            job: "",
            custom_description: "",
          };
          stateNewDAtaTarget = {
            picture_perfil: "",
            cover_photo: "",
            user_id: "",
            name_user: "",
            job: "",
            custom_description: "",
          };
        } else {
          const target = JSON.parse(response);
          console.log(target);
          delete target[0].id;
          let targetNet = {
            picture_perfil: target[0].picture_perfil
              ? target[0].picture_perfil
              : "",
            cover_photo: target[0].cover_photo ? target[0].cover_photo : "",
            // cover_photo: "meprofile.png",
            user_id: target[0].user_id ? target[0].user_id : "",
            name_user: target[0].name_user ? target[0].name_user : "",
            job: target[0].job ? target[0].job : "",
            custom_description: target[0].custom_description
              ? target[0].custom_description
              : "",
          };

          dataTargetUser = { ...targetNet };
          stateNewDAtaTarget = { ...targetNet };
          updateCamposform();
          update_preview(dataTargetUser);
        }
      }
    );
  }
  function update_preview(data) {
    $("#preview_nameuser").text(data.name_user);
    $("#preview_job").text(data.job);
    $("#preview_custom").text(data.custom_description);
  }
  $("#name_profile, #name_job, #name_custom").on("keyup", function () {
    const etiqueta = $(this).attr("id");
    switch (etiqueta) {
      case "name_profile":
        stateNewDAtaTarget.name_user = $(this).val();
        break;
      case "name_job":
        stateNewDAtaTarget.job = $(this).val();
        break;
      case "name_custom":
        stateNewDAtaTarget.custom_description = $(this).val();
        break;

      default:
        break;
    }
    update_preview(stateNewDAtaTarget);
    // console.log(newData);
    // console.log(dataTargetUser);
    if (JSON.stringify(stateNewDAtaTarget) !== JSON.stringify(dataTargetUser)) {
      console.log("entro activar");
      enabled_update_acces_btn();
    } else {
      console.log("entro desactivar");
      disabled_update_acces_btn();
    }
  });
  function updateCamposform() {
    $("#name_profile").val(dataTargetUser.name_user);
    $("#name_job").val(dataTargetUser.job);
    $("#name_custom").val(dataTargetUser.custom_description);
    // portada foto
    if (dataTargetUser.cover_photo === "") {
      $("#delete_cover_photo").remove();
      $("#portada_overlay").html(`
    <ion-icon class="text-[25px]" name="image"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu portada</p>
    `);

      $("#preview_cover_photo").attr(
        "src",
        "https://static.thenounproject.com/png/5647816-200.png"
      );
      $(imgPerfil).val("");
    } else {
      $("#portada_overlay").html(
        `<img class="rounded-lg object-cover w-full h-full dark:ring-gray-500" src="../../${dataTargetUser.cover_photo}" alt="rofile picture">`
      );
      $("#preview_cover_photo").attr(
        "src",
        `../../${dataTargetUser.cover_photo}`
      );
      $("#content-portada").append(
        `<span id="delete_cover_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
      );
    }
    // perfil foto
    if (dataTargetUser.picture_perfil === "") {
      $("#perfil_overlay").html(`
    <ion-icon class="text-[25px]" name="person"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu perfil</p>
    `);

      $("#preview_perfil_photo").attr(
        "src",
        "https://static.thenounproject.com/png/5647816-200.png"
      );
      $(imgPortada).val("");
    } else {
      $("#perfil_overlay").html(
        `<img class="w-[80px] h-[80px] p-1 rounded-full" src="../../${dataTargetUser.picture_perfil}" alt="rofile picture">`
      );
      $("#preview_perfil_photo").attr(
        "src",
        `../../${dataTargetUser.picture_perfil}`
      );
      $("#content-perfil").append(
        `<span id="delete_perfil_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
      );
    }
  }
  $("#cancelar_submit").click(function () {
    const disabled = $(this).attr("disable");
    if (disabled === "false") {
      // cancelar boton
      updateCamposform();
      $("#cancelar_submit").addClass("text-gray-300");
      $("#cancelar_submit").removeClass("text-gray-600");
      $("#cancelar_submit").removeClass("cursor-pointer");
      $("#cancelar_submit").addClass("cursor-default");
      $("#cancelar_submit").removeClass("hover:shadow-lg");
      $("#cancelar_submit").attr("disable", "true");
      // boton send info
      $("#send_submit").addClass("bg-gray-300");
      $("#send_submit").addClass("text-gray-500");
      $("#send_submit").removeClass("text-white");
      $("#send_submit").removeClass("bg-[#310ecd]");
      $("#send_submit").removeClass("cursor-pointer");
      $("#send_submit").addClass("cursor-default");
      $("#send_submit").removeClass("hover:shadow-lg");
      $("#send_submit").attr("disable", "true");
    }
  });
  $("#send_submit").click(function () {
    const disabled = $(this).attr("disable");

    if (disabled === "false") {
      let newData = stateNewDAtaTarget;
      console.log(newData);
      // Inicializa las promesas a null
      let profilePromise = null;
      let coverPhotoPromise = null;
      // casos para perfil de imagen
      if (dataTargetUser.picture_perfil !== stateNewDAtaTarget.picture_perfil) {
        if (dataTargetUser.picture_perfil === "") {
          console.log("crear imagen perfil");
          profilePromise = enviarImagenes(profileFile);
        } else {
          if (stateNewDAtaTarget.picture_perfil === "") {
            // eliminar mi image
            console.log("eliminar imagen perfil");
            profilePromise = eliminarImagenes(dataTargetUser.picture_perfil);
          } else {
            // actualizo la imagen
            console.log("actualizar imagen perfil");

            profilePromise = updateImagenes(
              dataTargetUser.picture_perfil,
              profileFile
            );
          }
        }
      }
      // casos para portada imagen
      if (dataTargetUser.cover_photo !== stateNewDAtaTarget.cover_photo) {
        if (dataTargetUser.cover_photo === "") {
          console.log("crear imagen portada");
          coverPhotoPromise = enviarImagenes(portadaFile);
        } else {
          if (stateNewDAtaTarget.cover_photo === "") {
            // eliminar mi image
            coverPhotoPromise = eliminarImagenes(dataTargetUser.cover_photo);
            console.log("eliminar imagen portada");
          } else {
            // actualizo la imagen
            coverPhotoPromise = updateImagenes(
              dataTargetUser.cover_photo,
              portadaFile
            );
            console.log("actualizar imagen portada");
          }
        }
      }
      // console.log(newData);
      // let funcion = "update_user_target";
      // $.post(
      //   "../../controlador/UsuarioController.php",
      //   { funcion, data: JSON.stringify(newData) },
      //   (response) => {
      //     console.log(response);
      //     disabled_update_acces_btn();
      //     buscar_target();
      //   }
      // );
      // Crea un arreglo de promesas para esperar a ambas
      const promisesToWaitFor = [];

      if (profilePromise !== null) {
        promisesToWaitFor.push(
          profilePromise.then((response) => {
            console.log(response);
            if (response === "delete-sucess") {
              newData.picture_perfil = "";
            } else {
              if (response === "no-existe") {
                console.log("la imagen no existe");
              }
              if (response !== "no-existe") {
                newData.picture_perfil = response;
              }
            }
          })
        );
      }

      if (coverPhotoPromise !== null) {
        promisesToWaitFor.push(
          coverPhotoPromise.then((response) => {
            console.log(response);
            if (response === "delete-sucess") {
              newData.cover_photo = "";
            } else {
              if (response === "no-existe") {
                console.log("la imagen no existe");
              }
              if (response !== "no-existe") {
                newData.cover_photo = response;
              }
            }
          })
        );
      }

      // Espera a que ambas promesas se resuelvan
      Promise.all(promisesToWaitFor)
        .then(() => {
          console.log("Ambas imágenes se han procesado.");
          console.log(newData);

          let funcion = "update_user_target";
          $.post(
            "../../controlador/UsuarioController.php",
            { funcion, data: JSON.stringify(newData) },
            (response) => {
              console.log(response);
              disabled_update_acces_btn();
              buscar_target();
            }
          );
        })
        .catch((error) => console.log(error));
    }
  });
  function enabled_update_acces_btn() {
    // cambios para boton cancelar
    $("#cancelar_submit").removeClass("text-gray-300");
    $("#cancelar_submit").addClass("text-gray-600");
    $("#cancelar_submit").addClass("cursor-pointer");
    $("#cancelar_submit").addClass("hover:shadow-lg");
    $("#cancelar_submit").attr("disable", "false");
    // cambios para boton send info
    $("#send_submit").removeClass("bg-gray-300");
    $("#send_submit").removeClass("text-gray-500");
    $("#send_submit").addClass("text-white");
    $("#send_submit").addClass("bg-[#310ecd]");
    $("#send_submit").addClass("cursor-pointer");
    $("#send_submit").addClass("hover:shadow-lg");
    $("#send_submit").attr("disable", "false");
  }
  function disabled_update_acces_btn() {
    // cancelar boton
    // $("#name_profile, #name_job, #name_custom").val("");
    $("#cancelar_submit").addClass("text-gray-300");
    $("#cancelar_submit").removeClass("text-gray-600");
    $("#cancelar_submit").removeClass("cursor-pointer");
    $("#cancelar_submit").addClass("cursor-default");
    $("#cancelar_submit").removeClass("hover:shadow-lg");
    $("#cancelar_submit").attr("disable", "true");
    // boton send info
    $("#send_submit").addClass("bg-gray-300");
    $("#send_submit").addClass("text-gray-500");
    $("#send_submit").removeClass("text-white");
    $("#send_submit").removeClass("bg-[#310ecd]");
    $("#send_submit").removeClass("cursor-pointer");
    $("#send_submit").addClass("cursor-default");
    $("#send_submit").removeClass("hover:shadow-lg");
    $("#send_submit").attr("disable", "true");
  }
  // funcion de subir imagnes
  function enviarImagenes(file) {
    return new Promise((resolve, reject) => {
      const carpeta = "targets";
      const formData = new FormData();
      formData.append("carpeta", carpeta);
      formData.append("targetimagen", file);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject("Error al guardar las imágenes");
        },
      });
    });
  }
  // funcion de update imagnes
  function updateImagenes(route, file) {
    return new Promise((resolve, reject) => {
      const funcion = "update_image";
      const formData = new FormData();
      formData.append("funcion", funcion);
      formData.append("route", route);
      formData.append("targetimagenupdate", file);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject("Error al guardar las imágenes");
        },
      });
    });
  }

  // funcion eliminar imagenes
  function eliminarImagenes(route) {
    return new Promise((resolve, reject) => {
      let funcion = "delete_image";
      $.post(
        "../../controlador/subirimagenes.php",
        { funcion, route },
        (response) => {
          resolve(response);
        }
      );
    });
  }
  //   const result = eliminarImagenes(
  //     // "imagenes/targets/6503bc2d95ef9-meprofile.jpg"
  //     "imagenes/targets/6503bc2d95ef9-meprofile.jpg"
  //   );
  //   result
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch();
});
