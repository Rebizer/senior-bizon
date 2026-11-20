# Razor 퍼블리싱 시작 패키지

> **작업 시작 전 필독:** 프로젝트 최상위 `AGENTS.md`와 이 `README.md` 전체를 먼저 읽는다. README는 납품 요약문으로 교체하지 않는다. 아래 필수 규칙은 뒤의 기존 설명·예시보다 우선하며, 사용자의 최신 별도 지시가 있으면 그 지시를 우선한다.

## 0. 반드시 지킬 작업 규칙

### 0-1. 읽기 순서와 문서 보존

1. 압축파일의 내용물을 작업 폴더에 풀고, 최상위 `AGENTS.md` → `README.md` → `PROJECT-SETTINGS.md`와 별도 지시 → 제공 reset·시작 뷰·레이아웃 → Figma·자산 순서로 확인한 뒤 구현한다. README가 없거나 열리지 않으면 읽었다고 가정하지 말고 확인한다.
2. README의 기존 요구사항·예시·라이브러리 및 실행 안내를 임의로 삭제하거나 프로젝트 결과 요약으로 덮어쓰지 않는다. 프로젝트별 값과 확인 결과는 `PROJECT-SETTINGS.md` 및 별도 작업 기록에 작성한다. 사용자가 문서 수정을 요청한 경우에만 해당 범위를 수정한다.
3. 작업 시작 시 읽은 규칙과 적용 범위를 간단히 알리고, 완료 전 각 필수 규칙을 결과물과 대조한다. 규칙 파일은 자동 실행 프로그램이 아니므로 전달할 요청문에도 두 파일을 먼저 읽으라고 명시한다.
4. 이 README 수정본은 작업 기준이다. 기존 시니어비즈온의 화면·파일 이동·메타 복구까지 완료했다는 뜻이 아니다. 패키지 원본의 과거 검증 기록도 새 결과물의 검증을 대신하지 않는다.

### 0-2. 메타태그·OG·스키마와 기존 section 보존

- 시작 패키지의 `_Layout.cshtml` 및 `Home/Index.cshtml` 등에 선언된 메타태그, 아이콘·manifest 연결, JSON-LD와 section 출력 연결을 절대 임의로 삭제·축약하지 않는다. 공통 description 하나만 두고 모든 페이지의 SEO 작성을 대신하지 않는다. 제공된 선언은 유지하면서 실제 프로젝트·페이지에 맞는 내용을 채운다.
- **레이아웃을 사용하는 모든 완성 페이지**(메인·서브·목록·상세·문의·정책 포함)에 `@section meta`, `@section ogtags`, `@section schema`를 작성한다. partial에는 페이지 section을 선언하지 않는다.
- `meta`에는 페이지별 `title`, `Title`, `description`, canonical, application-name, robots, mobile-web-app-capable, apple-mobile-web-app-title 등 제공 항목을 유지·작성한다. 레이아웃의 charset·viewport·언어·keywords 등 기존 항목도 보존하고 프로젝트에 맞게 채운다.
- `ogtags`에는 og:image·locale·type·site_name·title·description·url과 twitter:image·card·title·description·url 등 시작 파일의 제공 항목을 유지·작성한다. 제목과 설명은 실제 페이지의 주제·본문을 구체적으로 설명한다. 모든 페이지에 동일한 문구를 복사하지 않는다.
- `schema`에는 해당 페이지 내용을 설명하는 유효한 JSON-LD를 작성한다. 빈 section으로 끝내지 않는다. 공통 레이아웃의 `meta`, `ogtags`, `schema`, `css`, `scripts`, `headtag`, `headtagnext`, `scripttag` 등 제공된 출력 연결을 보존한다. 제공 뷰의 section이 레이아웃에 연결되지 않았다면 원래 의도한 위치를 확인하여 연결한다.
- 서버에서 주입하는 HeadTag 등의 기존 연결을 임의로 제거하지 않는다. 최소 실행 골격에 해당 모델이 없으면 참조를 무작정 복사하여 오류를 내지 말고 기존 호스트의 공급 방식·null 처리를 확인한다. 일반 텍스트에 `Html.Raw`를 확대하지 않는다.
- 각 태그의 출력 책임을 정해 최종 HTML에서 title·description·canonical·OG가 중복되지 않게 한다. section 이름을 바꿔 기능을 없애거나 `IgnoreSection`으로 숨기지 않는다.
- 운영 도메인·공유 이미지·회사 정보가 미제공이면 필요한 값을 한 번에 확인하고 미확정 항목을 기록한다. 허위 URL·연락처·가격·리뷰를 만들어 완성했다고 보고하지 않는다. canonical은 추적·검색 쿼리까지 무조건 복사하지 않고 실제 대표 주소를 기준으로 한다.

### 0-3. 코드 정렬과 CSS 구분 주석

- 직접 작성하는 cshtml·HTML·CSS·JS는 **들여쓰기 4칸**으로 통일하고 중첩 단계마다 들여쓴다. 탭과 공백을 섞지 않는다. 여러 요소·문장·CSS 선언을 한 줄에 압축하지 않는다. 라이브러리 원본·자동 생성 번들은 정렬 대상으로 삼지 않는다.
- HTML의 부모·자식 요소, Razor의 코드 블록·조건·반복문, JS의 함수·이벤트 블록을 개행하여 구조가 보이게 작성한다. 단순 텍스트 요소는 한 줄로 작성할 수 있다. `pre-line` 텍스트의 실제 개행과 시작·종료 태그 위치는 기존 줄바꿈 규칙을 지킨다.
- CSS는 선택자와 중괄호를 구분하고 **속성 하나당 한 줄**, 규칙 사이 빈 줄을 둔다. 미디어쿼리 안에서도 같은 형식을 사용한다. 한 줄짜리 CSS 규칙으로 압축하지 않는다.
- 같은 컴포넌트의 기본·하위·상태·가상요소를 인접하게 묶고 `/*---------------- site_footer ----------------*/`, `/*-- footer_nav --*/`처럼 실제 클래스 기준 주석으로 구분한다. 미디어쿼리는 파일 하단에 모으고 내부도 같은 섹션 순서와 주석으로 정리한다.
- `class=""`, 공백만 있는 class, 불필요한 빈 id·src·href를 만들지 않는다. 클래스가 필요 없으면 속성을 생략한다. Razor 조건부 class도 최종 렌더링에 빈 속성이 남지 않게 한다. 시작 파일의 빈 script/link는 실제 파일로 연결하거나 미사용 태그만 제거한다. SEO·확장 section을 함께 제거하지 않는다.

```css
/*---------------- site_footer ----------------*/
.site_footer {
    padding-block: 40px;
    display: block;
}

/*-- footer_nav --*/
.footer_nav {
    display: flex;
    gap: 24px;
}
```

### 0-4. 공통과 페이지 파일 분리

- `default.css`와 `default.js`에는 헤더·푸터·공통 버튼 등 **여러 사용자 화면에서 실제로 공유하는 UI만** 넣는다. 메인 전용 섹션·제품 상세·문의 폼·게시판 전용 코드를 편의상 default에 몰아넣지 않는다.
- 페이지 또는 실제로 같은 UI를 공유하는 페이지군은 `wwwroot/css/page/`, `wwwroot/js/page/`에 별도 파일을 만들고 해당 뷰의 `@section css`, `@section scripts`에만 연결한다. 홈은 `home.css`·`home.js`, 정책은 필요한 경우 `policy.css` 등 역할에 맞춰 작성한다. 페이지 동작이 없으면 빈 JS는 만들지 않는다.
- 이 패키지에서는 페이지 동작을 페이지 JS에 작성한다. section은 페이지 JS 파일 연결에 사용한다.
- 로드 순서는 bundle.css → reset.css → default.css → 페이지 CSS, bundle.js → lenis.js(module) → default.js → 페이지 JS를 유지한다.

### 0-5. 상단 고정 헤더와 nav 구조

- 사용자 화면의 상단 헤더는 PC·모바일 모두 **`position: fixed`로 viewport 최상단에 고정**한다. `top: 0`, 좌우 경계와 적절한 z-index를 지정한다. sticky로 대신하지 않는다.
- 본문 시작 여백과 앵커의 `scroll-margin-top`을 실제 헤더 높이에 맞추고, 반응형·모바일 메뉴·키보드 초점·페이지 이동에서도 헤더가 내용을 가리지 않는지 확인한다.
- 메뉴는 반드시 `nav > ul > li > a` 구조로 작성한다. nav 바로 아래에 메뉴 a를 나열하지 않는다. 하위 메뉴도 ul·li로 구성한다. 모바일 메뉴 토글은 button으로 작성한다.
- 현재 메뉴는 기존 규칙의 controller·action으로 판별하고 `active` 및 필요한 `aria-current="page"`를 적용한다. 상세에서도 소속 메뉴를 유지한다.

```html
<nav class="gnb" aria-label="주 메뉴">
    <ul class="gnb_list">
        <li class="gnb_item">
            <a class="nav_link" href="/">홈</a>
        </li>
        <li class="gnb_item">
            <a class="nav_link" href="/news">공지사항</a>
        </li>
    </ul>
</nav>
```

### 0-6. figure·이미지 설명·Figma 아이콘

- 본 프로젝트의 img는 `figure`로 감싼다. picture가 필요하면 `figure > picture > source/img`로 구성한다. figure의 reset 기본값을 먼저 확인한다.
- 화면에 보이는 이미지 영역의 width·height·aspect-ratio와 overflow는 figure에 작성하고, img는 해당 영역을 채우는 width·height·object-fit으로 처리한다. 개별 이미지 크기를 img에만 몰아넣지 않는다. 원본 비율을 보존해야 하는 이미지는 그에 맞춰 국소 처리한다. 레이아웃 이동을 줄이는 img의 원본 width·height HTML 속성은 유지할 수 있다.
- **모든 img의 alt를 비우지 않는다.** 이미지의 실제 내용·제품명·역할을 구체적이고 자연스럽게 작성한다. 반복 콘텐츠는 배열의 `ImageAlt` 등으로 관리한다. 검색어를 반복하거나 이미지와 무관한 홍보 문구를 넣지 않는다. 장식 이미지는 가능하면 CSS 배경으로 처리한다. 이 프로젝트에서는 장식 img에 빈 alt를 허용하는 기존 기본 권장보다 이 규칙을 우선한다.
- 화살표·닫기·더보기 등을 `>`, `<`, `→`, `×` 같은 텍스트나 임의 문자로 대체하지 않는다. **Figma에 있는 아이콘을 SVG 이미지 파일로 추출·저장하여** 사용한다. 임의 아이콘 라이브러리로 바꾸지 않는다. 원본 접근이 안 되면 누락 자산을 확인하고 임의 아이콘으로 확정하지 않는다.
- 아래 지정 pagination의 Material Symbols는 사용자가 지정한 별도 규칙을 따른다. SVG 아이콘 규칙과 혼동하여 바꾸지 않는다.

```html
<figure class="product_image">
    <img src="/images/product.png" alt="제품명과 실제 제품 모습을 설명하는 문구">
</figure>
```

### 0-7. 뷰 폴더와 정책 페이지

- 새 프로젝트의 사용자 화면 루트는 첨부 이미지와 같이 **`Views/Front/`**로 구성한다. 시작 패키지의 `Fronts`를 쓰는 경우 초기 구성 때 실제 경로·참조를 함께 맞춘다. 기존 프로젝트는 현재 호스트·라우팅을 확인하고 작업 범위 안에서 일관되게 반영한다.
- 모든 cshtml을 Home 안에 넣지 않는다. Home은 메인, Inquiry는 문의, Policy는 정책, Product는 제품처럼 화면의 역할·메뉴별로 구분한다. 다른 메뉴도 실제 시안에 필요한 폴더만 추가한다.
- 개인정보처리방침과 이용약관은 **팝업으로 만들지 않는다.** `Policy/Privacy.cshtml`, `Policy/Terms.cshtml`의 독립 페이지를 만들고 푸터·동의 안내 등의 링크에서 해당 페이지로 연결한다. 정책 페이지에도 페이지별 meta·ogtags·schema를 작성한다.
- 법적 원문이 없으면 임의 약관을 작성하거나 완성했다고 보고하지 않는다. 페이지·링크·제목 구조를 준비하고 원문 미제공 상태를 표시한다.
- 뷰를 옮기면 View 경로·partial·_ViewStart·_ViewImports 적용 범위·페이지 자원·링크를 함께 확인한다. 필요한 뷰 경로/화면 연결만 수정하고 DB·인증·결제 등 서버 기능을 섞지 않는다.

```text
Views/
├─ Front/
│  ├─ Home/
│  │  └─ Index.cshtml
│  ├─ Inquiry/
│  │  └─ Inquiry.cshtml
│  ├─ Policy/
│  │  ├─ Privacy.cshtml
│  │  └─ Terms.cshtml
│  └─ Product/
│     └─ re-mat.cshtml       # 이미지의 파일명 예시. 실제 제품에 맞게 작성
├─ Shared/
│  ├─ _Layout.cshtml
│  └─ Common/
│     ├─ _HeaderNavBar.cshtml
│     └─ _Footer.cshtml
├─ _ViewImports.cshtml
└─ _ViewStart.cshtml
```

### 0-8. 반복 콘텐츠는 var 배열과 @for로 작성

- 메인 `Index.cshtml`도 예외가 아니다. **제품·인사이트·공지사항 및 향후 관리자에서 관리할 게시물 성격의 반복 콘텐츠**는 각 뷰 상단 `@{ ... }`의 C# `var 이름 = new[] { new { ... }, ... };`로 선언하고 `@for (var i = 0; i < 배열.Length; i++)`로 출력한다.
- 같은 카드 HTML을 항목 수만큼 복사하지 않는다. 제목·분류·날짜·이미지·alt·요약·링크 등 달라지는 값을 배열에서 가져온다. 반복 항목 마크업은 한 번만 작성한다.
- 관리자 연동을 고려하는 것은 수정 가능한 정적 데이터 구조를 만드는 뜻이다. 이번 퍼블리싱에서 DB·API·관리자를 새로 구현하지 않는다. 상세 링크 규칙과 구체적인 배열 예시는 아래 원본 규칙을 함께 따른다.

### 0-9. pagination 지정 구조

- 목록 pagination은 아래 **클래스·요소 구조**를 사용한다. `first_btn`, `left_btn`, `pagination_number`, `page_click`, `right_btn`, `last_btn`, `pagination_btn`을 다른 이름으로 대체하지 않는다.
- 스타일은 **제공된 `reset.css`의 pagination을 재사용하고 필요한 디자인 수정도 해당 구간에서** 한다. default·페이지 CSS에 같은 pagination 스타일을 중복 작성하지 않는다. 새 프로젝트의 reset에 구간이 없다면 누락 사실을 확인하고 제공된 기준을 반영한다.
- 아래 `#!`는 전달받은 구조 예시의 자리 표시자다. 실제 화면에서는 유효한 페이지 URL 또는 해당 목록의 페이지 전환 동작에 연결한다. 미제공 페이지 데이터를 만들어 연결된 것처럼 보고하지 않는다. 현재 페이지·이동 불가 상태도 함께 처리한다.
- Material Symbols 폰트의 실제 로드 여부를 확인하고 기존 공통 연결을 재사용한다. 폰트가 없어서 `first_page` 같은 이름이 텍스트로 표시된 채 완료하지 않는다. 아래 예시처럼 아이콘 링크에는 이동 목적을 알리는 이름을 제공한다.

```cshtml
<div class="pagination">
    <div class="first_btn pagination_btn">
        <a href="#!" aria-label="첫 페이지">
            <span class="material-symbols-outlined lightgray md-20" aria-hidden="true">first_page</span>
        </a>
    </div>
    <div class="left_btn pagination_btn">
        <a href="#!" aria-label="이전 페이지">
            <span class="material-symbols-outlined lightgray md-20" aria-hidden="true">navigate_before</span>
        </a>
    </div>
    <ul class="pagination_number">
        <li class="page_click">
            <a href="#!" aria-current="page">1</a>
        </li>
        @for (var i = 2; i <= 5; i++)
        {
            <li>
                <a href="#!">@(i)</a>
            </li>
        }
    </ul>
    <div class="right_btn pagination_btn">
        <a href="#!" aria-label="다음 페이지">
            <span class="material-symbols-outlined lightgray md-20" aria-hidden="true">navigate_next</span>
        </a>
    </div>
    <div class="last_btn pagination_btn">
        <a href="#!" aria-label="마지막 페이지">
            <span class="material-symbols-outlined lightgray md-20" aria-hidden="true">last_page</span>
        </a>
    </div>
</div>
```

### 0-10. 완료 전 필수 대조

- 모든 완성 페이지의 meta·OG·schema, 기존 레이아웃 section 보존과 최종 출력, 제목·설명·URL의 일치·중복 여부를 확인한다.
- 코드 개행·4칸 들여쓰기·CSS 속성별 개행·구분 주석·빈 class 유무와 공통/페이지 CSS·JS 분리를 확인한다.
- PC·모바일의 fixed 헤더와 가림 현상, nav·ul·li 구조, figure 크기·이미지 alt·SVG 자산 요청을 확인한다.
- 역할별 뷰 폴더, 정책 페이지 직접 접속과 링크, 메인 포함 반복 목록의 var·@for, 지정 pagination과 아이콘 로드를 확인한다.
- 실제 실행·Razor 빌드·브라우저 콘솔·자원 응답·반응형·키보드 동작·Lenis는 AGENTS.md의 완료 규칙대로 확인한다. 실행하지 못한 검증은 미확인으로 전달한다.

---

새 프로젝트 폴더에 이 패키지의 **내용물**을 풀고 해당 폴더를 작업 프로젝트로 연다. AGENTS.md가 프로젝트 최상위에 놓여야 한다. 색상과 Figma 시안을 전달하면 제작자는 파일 생성·연결부터 실제 페이지 구현까지 수행한다. AGENTS.md 자체가 실행되는 생성기는 아니며, 프로젝트 제작 요청 시 따를 지침이다.

## 전달할 것

1. 이 패키지 전체(AGENTS.md, Views, wwwroot 및 실행 골격).
2. 사용자 지정 색상과 Figma 링크/대상 프레임.
3. 있는 경우 프로젝트 전용 reset.css, 이미지·폰트·아이콘, 별도 지시사항.

`PROJECT-SETTINGS.md`는 정리 양식이다. 같은 정보를 메시지로 전달해도 된다. 별도 reset.css가 없으면 패키지의 공통 reset을 쓰며, 색상은 사용자 제공값으로 채우고 컨테이너는 Figma에서 판단한다.

## 바로 사용할 요청문

> 첨부한 시작 패키지의 최상위 AGENTS.md와 README.md 전체를 반드시 먼저 읽고 두 문서의 필수 규칙을 기준으로, 제공한 Figma 시안의 홈페이지를 Razor(cshtml)로 퍼블리싱하고 반응형까지 구현해 주세요. 색상은 아래 제공값을 사용하고 컨테이너는 Figma의 콘텐츠 폭·정렬선·모바일 여백을 보고 판단해 주세요. reset의 공통 부분을 유지하고 default.css/default.js에는 공통 UI만, 페이지 전용 CSS/JS는 page 폴더의 별도 파일로 작성해 주세요. 기존 메타·OG·스키마와 section 연결을 보존하고 모든 완성 페이지에 내용을 작성해 주세요. fixed 헤더, nav > ul > li > a, figure·이미지 alt, 역할별 Views/Front 폴더, 독립 Policy 페이지와 지정 pagination도 적용해 주세요. README를 납품 요약으로 덮어쓰지 마세요. Lenis 모듈과 CSS/JS 번들을 실제 연결하고, 화면과 콘솔까지 확인해 주세요.
>
> 콘텐츠는 모두 정적 데이터로 작성해 주세요. 특히 인사이트·공지사항·제품 목록과 메인의 해당 미리보기 목록은 각 페이지의 `.cshtml` 안에서 `var 이름 = new[] { new { ... }, ... };` 형태의 C# 익명 객체 배열을 선언하고, `@for (var i = 0; i < 배열.Length; i++)`로 마크업을 반복 출력해 주세요. 데이터 값만 바꾸거나 항목을 추가하면 같은 구조로 출력되게 해 주세요. 각 목록의 항목을 클릭하면 종류별로 Figma에 있는 대표 상세페이지 하나로 이동하게 하고, 상세 내용도 해당 시안을 기준으로 정적으로 작성해 주세요. 아래의 구현 규칙과 예시를 함께 따라 주세요.
>
> 헤더에서는 `ViewContext.RouteData`의 `controller`와 `action`으로 현재 메뉴를 판별하고, 해당 nav 메뉴에 `active` 클래스를 추가해 Figma의 현재 메뉴 색상을 적용해 주세요. 상세페이지에서도 소속 메뉴의 활성 상태를 유지해 주세요. 각 페이지에는 `@section schema { ... }`를 작성하고, SEO를 고려해 실제 페이지 내용에 맞는 JSON-LD 구조화 데이터를 넣어 주세요. 공통 레이아웃의 schema 출력 연결과 최종 렌더링 결과까지 확인해 주세요.
>
> Figma: [링크와 대상 프레임]. 색상: [변수명과 값]. 별도 지시: [내용].

## Figma 시안과 반응형 구현

- 전달된 대상 프레임에 포함된 메인·서브·목록·상세 화면을 확인하고, 페이지 구조·텍스트·이미지·폰트·색상·간격·정렬·카드 비율을 시안에 맞게 구현한다.
- PC·모바일 시안이 모두 있으면 각 시안을 기준으로 작성하고, 그 사이 화면 폭에서도 레이아웃이 자연스럽게 이어지게 한다. 모바일 시안이 없으면 PC의 정보 순서를 유지하며 메뉴·열 수·여백·글자 크기·이미지 배치를 조정한다.
- 고정 폭 화면을 그대로 축소하지 않는다. 실제 콘텐츠와 레이아웃을 기준으로 분기점을 정하고, 긴 제목·줄바꿈·이미지 비율·모바일 메뉴·가로 넘침을 확인한다.
- PC·태블릿·모바일 크기에서 화면과 페이지 이동을 확인하고, 실제 확인한 범위와 시안·자료가 없어 확인하지 못한 부분을 구분해 전달한다.

## 정적 데이터와 목록·상세페이지 구현 규칙

### 페이지 안에서 배열 선언 후 for문으로 출력

여기서 각 HTML 페이지는 Razor 뷰 파일인 **`.cshtml`**을 뜻한다. 아래의 `var`는 JavaScript가 아니라 Razor 코드 블록 `@{ ... }` 안에서 선언하는 **C# 변수**다.

1. 화면의 콘텐츠는 정적으로 작성한다. 반복되는 목록 데이터는 해당 페이지 `.cshtml`의 상단 `@{ ... }` 안에 `var newsItems = new[] { new { ... }, ... };` 같은 익명 객체 배열로 선언한다.
2. 인사이트·공지사항·제품 목록뿐 아니라 메인에 있는 동일 유형의 미리보기 목록에도 적용한다. 배열 이름은 `insightItems`, `newsItems`, `productItems`처럼 용도를 알 수 있게 정한다.
3. 목록 마크업은 `@for (var i = 0; i < newsItems.Length; i++)` 안에서 한 번 작성하고, `var item = newsItems[i];`로 현재 항목을 가져와 `@item.Title`처럼 출력한다. 반복 조건에 `<= 배열.Length`를 사용하지 않는다.
4. 제목·분류·날짜·이미지 경로·이미지 설명·요약 등 항목마다 달라지는 값은 배열의 속성으로 관리한다. 같은 배열 안의 객체는 속성 이름과 자료형을 맞춘다. 항목을 추가할 때 목록 마크업을 복사할 필요가 없어야 한다.
5. 데이터는 각 페이지에서 직접 수정할 수 있게 둔다. 이 퍼블리싱 단계에서는 목록 데이터를 DB·API·Controller·ViewModel·별도 JSON 파일·JavaScript 렌더링으로 옮기지 않는다. 여러 페이지에 같은 샘플 데이터가 필요해도 각 뷰에서 선언한다.
6. 실제 제목·본문·이미지·목록 개수·정렬 순서는 Figma와 제공 자료를 우선한다. 시안에 없는 추가 샘플이 필요하면 프로젝트 주제에 맞는 임시 데이터를 사용하고, 실제 자료와 구분되도록 코드 주석에 표시한다. 아래 예시는 작성 방식만 참고한다.

| 목록 | 배열 이름 예시 | 시안에 따라 사용할 속성 예시 |
|---|---|---|
| 인사이트 | `insightItems` | `Title`, `Category`, `Date`, `Image`, `ImageAlt`, `Summary` |
| 공지사항 | `newsItems` | `Title`, `Category`, `Date` |
| 제품 | `productItems` | `Name`, `Category`, `Image`, `ImageAlt`, `Summary` |

속성은 실제 화면에 필요한 것만 사용한다. 제품 목록에도 같은 `new[]`와 `@for` 구조를 적용하고, 이미지·제품명 등 해당 속성을 마크업에 연결한다.

### 공지사항 목록 예시

```cshtml
@{
    // 구조 설명용 임시 데이터. 실제 작업에서는 Figma와 제공 자료로 교체한다.
    var newsItems = new[]
    {
        new
        {
            Title = "홈페이지 오픈 안내",
            Category = "공지사항",
            Date = "26-00-00"
        },
        new
        {
            Title = "교육 신청 방법 안내",
            Category = "공지사항",
            Date = "26-00-00"
        },
        new
        {
            Title = "서비스 이용 안내",
            Category = "공지사항",
            Date = "26-00-00"
        }
    };
}

<ul class="news_list">
    @for (var i = 0; i < newsItems.Length; i++)
    {
        var item = newsItems[i];

        <li class="news_row">
            <a href="/news/detail">
                <p class="post_title">
                    @* 상단 공지 표시는 시안에 있는 경우에만 적용하고 개수를 맞춘다. *@
                    @if (i < 3)
                    {
                        <strong>공지</strong>
                    }
                    @item.Title
                </p>
                <div class="post_meta">
                    <span class="post_category">@item.Category</span>
                    <time class="post_date">@item.Date</time>
                </div>
            </a>
        </li>
    }
</ul>
```

### 상세페이지는 종류별 대표 화면 하나로 연결

- 인사이트·공지사항·제품은 **종류별로** Figma에 상세 시안이 있는 대표 상세페이지를 하나씩 구현한다. 같은 종류의 목록 항목은 어느 것을 눌러도 그 대표 상세페이지로 이동하게 한다. 메인의 미리보기 항목도 같은 규칙을 적용한다.
- 상세페이지의 제목·날짜·본문·이미지·제품 설명 등은 해당 상세 시안의 내용으로 고정한다. 클릭한 목록 항목에 맞춘 개별 상세 데이터와 ID별 분기는 만들지 않는다.
- 링크는 `#`이나 존재하지 않는 경로로 두지 않는다. 아래 주소는 예시이며, 실제 프로젝트의 URL 규칙에 맞추고 실행 호스트에서 해당 뷰가 열리도록 라우트·액션도 연결한다.
- 상세페이지의 목록으로 돌아가기 링크는 해당 종류의 목록으로 연결한다. 상세 시안이 없는 종류는 임의로 완성된 상세 화면을 만들어 확정하지 말고, 필요한 시안을 확인한다.

| 클릭 대상 | 연결 방식 | URL 예시 |
|---|---|---|
| 인사이트 목록의 모든 카드 | 동일한 인사이트 대표 상세페이지 | `/insight/detail` |
| 공지사항 목록의 모든 게시글 | 동일한 공지사항 대표 상세페이지 | `/news/detail` |
| 제품 목록의 모든 제품 | 동일한 제품 대표 상세페이지 | `/product/detail` |

### 완료 확인

- 배열의 데이터가 `@for` 반복문을 통해 출력되고, 항목마다 달라지는 값이 마크업에 직접 중복 작성되지 않았는지 확인한다.
- 목록·상세·목록으로 돌아가기 링크가 실제로 열리는지 확인한다. 서로 다른 목록 항목을 클릭해도 같은 종류의 대표 상세페이지가 열리면 의도한 동작이다.
- 반응형 화면, 이미지 경로, Razor 컴파일 오류, 브라우저 콘솔 오류를 확인하고 실제 검증 결과를 전달한다.

## 헤더 nav의 현재 메뉴 활성화

- 헤더 partial의 상단에서 아래와 같이 `controllerName`, `actionName`을 가져온다. 기존 선언이 있으면 재사용하고, 라우트 값이 없는 경우도 처리한다.
- 실제 Controller·Action과 메뉴의 관계에 맞춰 조건을 정하고, 현재 페이지가 속한 nav 링크에 `active` 클래스를 조건부로 추가한다. URL 문자열을 JavaScript로 비교해 사후에 붙이는 방식 대신 Razor에서 렌더링한다.
- 인사이트·공지사항·제품 상세페이지에서도 각각 소속된 상위 메뉴를 활성화한다. 2차 메뉴가 있으면 해당 항목과 소속 1차 메뉴를 함께 표시하고, PC·모바일 메뉴에 같은 판별 기준을 적용한다.
- 하나의 `HomeController`에서 여러 페이지를 제공하는 프로젝트는 `controllerName`만 비교하지 않고 `actionName`까지 조합한다. 최초 방문·새로고침·URL 직접 접속 시에도 올바른 메뉴가 활성화되어야 한다.

다음은 `HomeController.Index`와 `NewsController`를 사용하는 경우의 예시다. 실제 프로젝트의 컨트롤러·액션·주소·클래스명에 맞춰 조정한다.

```cshtml
@{
    string controllerName = this.ViewContext.RouteData.Values["controller"]?.ToString()?.ToLowerInvariant() ?? string.Empty;
    string actionName = this.ViewContext.RouteData.Values["action"]?.ToString()?.ToLowerInvariant() ?? string.Empty;

    bool isHomeActive = controllerName == "home" && actionName == "index";
    bool isNewsActive = controllerName == "news";

    // HomeController.News / NewsDetail 구조라면 대신 아래처럼 판별한다.
    // bool isNewsActive = controllerName == "home"
    //     && (actionName == "news" || actionName == "newsdetail");
}

<nav class="gnb" aria-label="주 메뉴">
    <ul class="gnb_list">
        <li class="gnb_item">
            <a href="/" class="nav_link @(isHomeActive ? "active" : null)">홈</a>
        </li>
        <li class="gnb_item">
            <a href="/news" class="nav_link @(isNewsActive ? "active" : null)">공지사항</a>
        </li>
    </ul>
</nav>
```

현재 메뉴의 색상은 공통 `default.css`에 작성하고, Figma의 활성 상태 색상과 제공된 색상 변수를 사용한다. 아래의 `--color-primary`는 예시이며 실제 프로젝트에서 정의한 변수명으로 맞춘다.

```css
.gnb .nav_link.active {
    color: var(--color-primary);
}
```

## 페이지별 schema와 SEO 구조화 데이터

### 각 페이지에서 schema section 작성

- 각 완성 페이지의 `.cshtml`에 `@section schema { ... }`를 선언하고, 안에 `<script type="application/ld+json">`으로 JSON-LD를 작성한다. 빈 section만 추가하고 끝내지 않는다.
- section은 레이아웃을 사용하는 페이지 뷰에서 선언한다. 헤더·푸터 등의 partial 안에 선언하지 않는다. 공통 레이아웃의 `<head>`에서 `@RenderSection("schema", required: false)`를 한 번 호출해 실제 HTML에 출력한다. 기존 출력 구문이 있으면 재사용한다.
- 페이지의 목적과 화면에 보이는 내용에 맞는 Schema.org 타입을 선택한다. 제목·설명·본문·이미지·작성자·날짜·URL은 실제 콘텐츠와 일치시키고, 페이지의 SEO 메타정보와도 맞춘다.
- URL과 이미지 주소는 확인된 운영 도메인의 절대 주소를 사용하고, 페이지 URL은 canonical과 일치시킨다. 운영 도메인 등 미확정 값은 필요한 위치를 코드 주석으로 표시하고, 예시 도메인을 실제 값으로 확정하지 않는다.
- 제공되지 않은 작성자·날짜·가격·재고·평점·리뷰를 임의로 만들지 않는다. 화면의 임시 날짜 `26-00-00` 같은 값은 구조화 데이터에 넣지 않으며, 확인된 날짜가 있을 때 유효한 ISO 8601 형식으로 작성한다.
- 모든 목록 항목이 대표 상세페이지 하나로 연결되는 현재 구현에서는, 존재하지 않는 개별 상세 URL이나 클릭 항목별 상세 스키마를 생성하지 않는다. 상세페이지 스키마는 실제로 표시되는 대표 상세 콘텐츠를 설명한다.

| 페이지 성격 | 적용을 검토할 타입 |
|---|---|
| 메인·회사 소개 등 일반 페이지 | `WebPage`, 필요 시 실제 회사 정보를 담은 `Organization`·`WebSite` |
| 인사이트·공지사항·제품 목록 | `CollectionPage`, 실제 목록을 표현할 수 있으면 `ItemList` |
| 인사이트·게시글 상세 | 내용에 맞는 `Article` 또는 `BlogPosting` |
| 제품 상세 | 실제 제품 정보에 맞는 `Product` |
| 계층 탐색 경로가 있는 페이지 | 해당 경로를 나타내는 `BreadcrumbList` |

타입은 위 표를 일괄 복사하지 않고 실제 페이지에 맞게 선택한다. 공통 회사 정보는 일관되게 관리하고 같은 엔티티의 중복·상충 선언을 피한다. 제품의 `offers` 등 판매 정보는 실제로 확인되고 화면에도 제공되는 경우에 작성한다.

### Razor 작성 예시

아래 제목·설명·도메인은 구조 설명용 예시다. 실제 작업에서는 페이지 콘텐츠와 확인된 도메인으로 작성한다. Razor 마크업에 JSON-LD를 직접 적을 때는 `@context`, `@type`, `@id`의 `@`를 `@@`로 이스케이프한다. 최종 HTML에는 단일 `@`로 출력되어야 한다.

```cshtml
@section schema {
    <script type="application/ld+json">
        {
            "@@context": "https://schema.org",
            "@@type": "CollectionPage",
            "name": "공지사항 | 사이트명",
            "description": "사이트의 새로운 소식과 공지사항을 확인하세요.",
            "url": "https://www.example.com/news"
        }
    </script>
}
```

공통 레이아웃의 `<head>` 내부 연결 예시:

```cshtml
@RenderSection("schema", required: false)
```

따옴표·줄바꿈 등이 들어가는 값을 코드에서 조합할 때는 문자열을 직접 이어 붙이지 말고 JSON 직렬화를 사용한다. JSON을 코드에서 직렬화해 출력하는 경우에는 키를 `@context`, `@type`처럼 원래 형태로 두며, Razor 마크업의 `@@` 이스케이프를 JSON 데이터에 적용하지 않는다.

### 완료 확인

- 렌더링된 HTML에 schema script가 출력되는지, `@context`·`@type`이 정상인지, JSON 문법 오류나 중복 출력이 없는지 확인한다.
- [Schema Markup Validator](https://validator.schema.org/)로 구조를 확인하고, Google 검색 기능 대상 타입은 [Rich Results Test](https://search.google.com/test/rich-results)로도 검사한다. 실제 확인한 결과와 자료가 없어 채우지 못한 항목을 전달한다.

참고: [Google 구조화 데이터 가이드](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [Razor 문법](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-8.0), [Razor 레이아웃과 section](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/layout?view=aspnetcore-8.0).

## 파일 역할

| 구분 | 파일 | 처리 |
|---|---|---|
| 그대로 재사용 | wwwroot/lib의 라이브러리 | 기존 프로젝트의 버전을 보존. 임의 업그레이드 금지 |
| 기본 연결 | wwwroot/js/lenis.js | 사용자 모듈을 시작용으로 정리. type=module로 한 번 로드 |
| 공통 기반 + 설정 | wwwroot/css/reset.css | 초기화·유틸리티 재사용, 색상/폰트/컨테이너 등만 설정 |
| 프로젝트마다 작성 | default.css / default.js | 파일 위치·역할이 같고 내용은 다름 |
| 원본 목록으로 생성 | bundle.css / bundle.js | 실제 파일 제공, 원본·순서는 bundle.sources.json |
| 프로젝트마다 작성 | 헤더·푸터 partial, 페이지 cshtml/CSS/JS | Figma와 제공 콘텐츠 기준 |
| 최소 실행 골격 | csproj, Program.cs, HomeController.cs | Razor 화면 제공용. DB·인증·관리자 기능 없음 |

번들에는 공통으로 존재했던 jQuery 3.3.1, GSAP/ScrollTrigger 3.12.4, Swiper 11.0.5, toast를 포함했다. 기능별 UI를 자동으로 만들지는 않는다. 불필요한 라이브러리를 제거할 때는 참조를 확인하고 원본 목록을 변경한 뒤 번들을 다시 만든다. 라이브러리 버전은 원본 호환을 위한 것이며 최신 버전 추천이 아니다.

## 로드 순서

CSS: bundle.css → reset.css → default.css → 페이지 css section.

JS: bundle.js → lenis.js(type=module) → default.js → 페이지 scripts section. 모듈은 지연 실행되므로 바로 다음 일반 script의 최상단에서 window.lenis를 호출하지 않는다. DOM 준비 후 초기화 또는 실제 사용자 이벤트 안에서 사용한다.

Lenis 라이브러리는 기존 CDN과 같은 1.0.42를 로컬 파일로 포함했다. 네트워크 접속 없이도 모듈을 가져올 수 있다. 초기 인스턴스 생성과 RAF는 lenis.js만 담당한다. GSAP ticker에 또 등록하지 않는다.

## 실행과 번들

이 패키지의 최소 호스트는 ESC 원본 실행 정보에서 확인한 .NET 8을 대상으로 한다. 호환 SDK/ASP.NET Core 런타임이 있는 환경에서 프로젝트 폴더를 기준으로 `dotnet run --urls http://localhost:5080`을 실행한다. 기존 서버 프로젝트에 적용한다면 csproj/Program/Controller를 덮어쓰지 않고 Views·정적 파일·연결 부분을 병합한다. 실행 환경을 임의로 업그레이드하지 않는다.

번들은 미리 생성되어 있으므로 매번 만들 필요가 없다. 원본 목록을 바꾸었을 때만 PowerShell에서 `./tools/build-bundles.ps1`을 실행한다. 추가 npm 설치나 새로운 빌드 프레임워크는 필요 없다. 생성된 bundle 파일을 직접 편집하지 않는다.

기존 배포물에서 WebOptimizer 의존성과 /css/bundle.css, /js/bundle.js 연결을 확인했지만 번들 등록 소스는 제공되지 않았다. 이 패키지는 **공통 원본으로 새로 구성한 정적 번들**이며 원래 WebOptimizer 설정을 복원했다고 주장하지 않는다. 기존 WebOptimizer 설정이 있는 새 작업에는 그것을 우선한다.

## 공통 reset의 범위

초기화, 목록·링크·이미지 기본 방식, pre-line, 컨테이너 클래스와 변수 연결, 말줄임·정렬·그리드·폰트 크기/두께 유틸리티를 재사용할 기반으로 구성했다. 크기 토큰은 선택 가능한 단위표이며 특정 제목 크기를 강제하지 않는다. 색상·폰트·본문 행간·컨테이너·간격·모바일 분기점은 시안 적용 전까지 확정하지 않았다. 사용 변수는 실제 제작 시 반드시 정의한다.

기존 5개 reset의 어느 하나를 그대로 복제한 파일은 아니다. `:root`만 다른 것으로 단정할 수 없어 공통 구조와 예외를 분리했다. 다음은 새 시작 파일에 적용한 개선이며 기존 선호나 원본의 동일 동작으로 단정하지 않는다.

- 잘못된 단위 없는 letter-spacing, 존재하지 않는 input type, 중복 white-space 선언을 복제하지 않음.
- 기본 포커스 제거와 체크박스/파일 입력 전체 숨김을 제외하고 커스텀 폼은 필요한 UI에서 구현.
- 이미지 cover·링크 block 등 반복 패턴은 유지. 로고/콘텐츠 비율과 인라인 링크는 요소별 확인 필요.
- 고정 h1~h5 크기·행간, 스크롤바 장식, 체크박스·datepicker의 디자인은 전역 고정값으로 넣지 않음. pagination은 이 수정본의 지정 구조와 제공 reset 구간을 사용하고, 필요한 디자인 수정도 해당 구간에서 처리.
- grid의 긴 콘텐츠 넘침을 줄이기 위해 minmax(0, 1fr) 사용, align-stretch/justify-stretch 철자를 정리. 원본은 수정하지 않음.
- Lenis 공식 1.0.42 권장 CSS를 추가. 기존 smooth/smoothTouch 대신 해당 버전 API인 smoothWheel/syncTouch 사용. 처음 로드할 때 모션 감소 설정을 반영하고 ScrollTrigger가 있으면 scroll 이벤트를 연결. duration 1.5는 변경 가능한 시작값.

현재 샘플 페이지는 디자인 제작 전 연결 확인용이다. 색상·컨테이너가 채워졌거나 Figma 화면이 구현된 완성 사이트는 아니다. 원본 5개 프로젝트는 수정하지 않았다.


## 원본 시작 패키지의 과거 검증 기록

> 아래는 원본 패키지에 기록되어 있던 과거 검증이며, 이 문서 수정이나 새 프로젝트의 재검증 결과가 아니다. 현재 프로젝트의 실행 환경은 PROJECT-SETTINGS.md를 확인한다.

- 설치된 .NET 9에서 임시 복사본으로 Razor 빌드·렌더링: 경고 0, 오류 0. 배포 csproj는 net8.0을 유지했다. .NET 8 직접 실행은 해당 런타임이 없어 수행하지 않았다.
- Chromium 기반 Edge에서 CSS/JS/ES module 요청 200, jQuery·GSAP·ScrollTrigger·Swiper·toast·Lenis 로드 확인.
- Lenis 휠 이동, stop/start, 내부 data-lenis-prevent 영역, 프레임당 RAF 중복 없음, 초기 모션 감소 설정 확인.
- 시작 화면의 390px 폭에서 가로 넘침 없음, 키보드 본문 바로가기 확인. 실제 Figma 화면·기기 터치는 아직 대상 시안이 없어 검증하지 않았다.
- 원본 프로젝트에서 기록한 1,089개 파일의 해시 일치. 패키지의 복사 라이브러리 6개는 원본 바이트 유지.

Codex의 최상위 규칙 파일 탐색은 [공식 AGENTS.md 안내](https://learn.chatgpt.com/docs/agent-configuration/agents-md)를 참고한다. 하위 폴더의 별도 규칙이나 작업 지시가 있으면 함께 확인해야 한다.
