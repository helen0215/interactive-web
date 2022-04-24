import '@/css/reset.css';
import '@/css/style.css';

const houseEl = document.querySelector('.house');
const barEl = document.querySelector('.progress-bar');

// 스크롤 할 수 있는 영역 문서(body) 높이에서 스크롤바 - 보이는 화면
let maxScrollValue = getMaxScrollValue();

function getMaxScrollValue() {
  return document.body.offsetHeight - window.innerHeight;
}

window.addEventListener("scroll", function () {
  const scrollRate = window.pageYOffset / maxScrollValue;
  const zMove = scrollRate * 980 - 490; // house 초기 위치만큼 빼줌
  houseEl.style.transform = `translateZ(${zMove}vw)`;

  // progress bar
  barEl.style.width = `${scrollRate * 100}%`;
});

window.addEventListener("resize", function () {
  maxScrollValue = getMaxScrollValue();
});

const useragent = window.navigator.userAgent.toLowerCase();
if (useragent.indexOf('chrome') < 0 && useragent.indexOf('safari') < 0) {
    document.body.style.cssText = 'height: auto';
    document.body.innerHTML = '<p style="padding: 20px; line-height: 1.6">본 예제는 Full CSS 3D가 사용된 페이지로, webkit 기반 브라우저(크롬, 사파리 등)에서 확인하며 학습하시는게 좋습니다.<br>CSS 3D 부분 외에는 브라우저 상관없이 인터랙티브 웹 페이지 개발을 위해 필수적이고 유용한 내용들을 다루고 있으니 꼭 처음부터 끝까지 공부해 보세요! :)</p>';
}
