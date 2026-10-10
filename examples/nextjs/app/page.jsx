// 서버 컴포넌트에서 바로 import (라이브러리에 "use client"가 있어 그대로 동작해야 함).
// onClick·onChange 같은 함수 props와 useToast() 같은 훅은 "use client" 파일(Interactive.jsx) 안에서만 씁니다.
import { Button, Card, NavBar, TextField, Calendar, Alert, Link, Accordion, Tabs, Pagination } from "@caffeinecatkr/blurssism";
import Interactive from "./Interactive.jsx";
export default function Page() {
  return (
    <main className="bl-container">
      <NavBar title="Next.js 테스트" />
      <Alert tone="positive" title="서버에서 렌더링됐어요">이 알림은 서버 컴포넌트 안에 있어요. <Link href="https://github.com/leeuc10/blurssism" external>저장소</Link></Alert>
      <Tabs label="원두" items={[{ id: "a", label: "소개", panel: <Card title="서버에서 렌더링" body="이 카드는 서버 컴포넌트 안에 있어요." /> }, { id: "b", label: "추출", panel: <p className="bl-body">핸드드립 2분 30초.</p> }]} />
      <Accordion defaultValue="ship" items={[{ id: "ship", title: "배송은 언제 와요?", content: "볶은 다음 날 보내 드려요." }, { id: "refund", title: "환불은요?", content: "7일 안에 돼요." }]} />
      <Pagination count={5} defaultPage={2} />
      <TextField label="이메일" />
      <Calendar today={new Date(2026, 9, 6)} value={new Date(2026, 9, 6)} />
      <Button>확인</Button>
      <Interactive />
    </main>
  );
}
