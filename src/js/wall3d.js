(function () {
  const houseEl = document.querySelector(".house");
  // 스크롤 할 수 있는 영역 문서(body) 높이에서 스크롤바 - 보이는 화면
  let maxScrollValue = getMaxScrollValue();

  function getMaxScrollValue() {
    return document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", function () {
    const zMove = (window.pageYOffset / maxScrollValue) * 980 - 490; // house 초기 위치만큼 빼줌
    houseEl.style.transform = `translateZ(${zMove}vw)`;
  });

  window.addEventListener("resize", function () {
    maxScrollValue = getMaxScrollValue();
  });
})();
