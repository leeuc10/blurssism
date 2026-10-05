// 서버 컴포넌트에서 바로 import (라이브러리에 "use client"가 있어 그대로 동작해야 함)
import { Button, Card, NavBar, TextField, Calendar } from "@caffeinecatkr/blurssism";
export default function Page() {
  return (
    <main>
      <NavBar title="Next.js 테스트" />
      <Card title="서버에서 렌더링" body="이 카드는 서버 컴포넌트 안에 있어요." />
      <TextField label="이메일" />
      <Calendar today={new Date(2026, 9, 6)} value={new Date(2026, 9, 6)} />
      <Button>확인</Button>
    </main>
  );
}
