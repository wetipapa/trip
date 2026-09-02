# 나고야 가족여행 숙소 비교 페이지

2026.12.28–31 나고야 3박, 두 가족(성인 4 + 7세 남아 2, 객실 2개) 숙소 결정용 공유 웹페이지.
목표: 다른 가족이 카톡 링크로 열어 10분 안에 숙소를 결정할 수 있게 하는 것.

## 구조
- `index.html` — 단일 파일 웹페이지 (HTML+CSS+JS 인라인, 외부 의존은 Google Fonts뿐). 그대로 호스팅하면 됨.
- `docs/research.md` — 조사 결과 요약·출처·미확인 항목 목록. **데이터 수정 전 반드시 읽을 것.**
- `scripts/build-pdf.js` — Playwright로 모바일 폭 PDF 생성 (`node scripts/build-pdf.js` → `dist/`).
- `dist/` — 빌드 산출물(커밋 안 함).

## 데이터는 index.html 안의 `<script>` 상단에만 있음
- `META` — 검색 기준일, 환율(`fx`: 1엔당 원, 현재 8.58), `flights: {out, ret}`.
  - 각 구간은 `{label, date, dep, from, arr, to, air, no, pnr, dur, eq, cls}`. `out`/`ret`가 둘 다 없으면 "항공편 시간 입력 전" 안내 배너, 있으면 초록 확정 카드(구간 2개 + 첫날·마지막날 동선 안내)를 그린다.
  - 빈 문자열 필드는 렌더링에서 자동 생략되므로, 모르는 값은 채우지 말고 `""`로 둘 것.
  - 현재 값: 가는 편 대한항공 KE745 ICN T2 10:35 → NGO T1 12:30, 오는 편 제주항공 7C1204 NGO T2 17:50 → ICN T1 19:55(예약번호 P7KKML). **한일 시차 없음** — 표기 시각 차이가 곧 소요시간.
- `ITINERARY` — 일정 4일. `ok:false`면 ⚠ 경고 표시.
- `AREAS` — 지역 비교 카드 4개.
- `HOTELS` — 호텔 7개. 필드: `tier`(value/mid/prem), `conn`(yes/request/check → 초록/노랑/빨강 칩), `price.total`(엔, 2객실·3박 총액) 또는 `price.range`, `price.needCheck:true`면 "실시간 가격 확인 필요" 표시, `t`(이동시간 `{목적지:[분,환승,경로]}`), `sc`(점수, 가중치 `W`와 합 100), `src`(출처 배열).
- `PICKS`, `BADGES`, `FINAL`, `DROPPED` — 추천/결론 텍스트.
- 가격 표시는 원화가 주, 엔화는 보조. 환산은 `META.fx` 하나로 전부 재계산됨.

## 절대 지킬 규칙
- 가격·커넥팅룸·아동규정·객실크기·역 도보시간은 **출처 없이 쓰지 않는다.** 모르면 `확인 필요`.
- 커넥팅 표기: 공식 사이트/예약 사이트에 실제 커넥팅 상품이 있을 때만 `conn:"yes"`. 요청만 가능하면 `request`.
- 가격은 성인 2명 기준 객실 요금 × 2실. 세금 포함 여부를 `price.note`에 적는다.
- 사진은 현재 없음(색상 배너 대체). 사진을 넣을 땐 data URI 또는 호스팅된 이미지 URL 사용.

## 배포
Netlify Drop / GitHub Pages / Vercel 어디든 `index.html` 하나로 끝. `<head>`에 OG 메타(카톡 미리보기용) 포함.
