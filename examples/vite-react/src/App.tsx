import { useState } from "react";
import { Button, Dialog, TextField, Select, Table, TabBar, MediaCard, IconButton, applyCremaPreference, type ButtonProps } from "@caffeinecatkr/blurssism";
import "@caffeinecatkr/blurssism/fonts.css";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";

applyCremaPreference();

const primary: ButtonProps["variant"] = "primary";

export default function App() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("home");
  return (
    <div className="bl-root">
      <Button variant={primary} onClick={() => setOpen(true)}>열기</Button>
      <TextField label="이메일" onChange={(e) => console.log(e.target.value)} />
      <Select label="지역" options={["서울", { value: "busan", label: "부산" }]} onChange={(e) => console.log(e.target.value)} />
      <Table caption="표" columns={[{ key: "n", label: "이름" }, { key: "h", label: "시간", numeric: true, render: (r: { n: string; h: number }) => r.h + "h" }]} rows={[{ n: "a", h: 1 }]} />
      <MediaCard title="사진" lite action={<IconButton icon="heart" label="좋아요" />} />
      <TabBar value={tab} onChange={setTab} items={[{ id: "home", label: "홈", icon: "home" }]} />
      <Dialog open={open} onClose={() => setOpen(false)} title="확인">
        <Button variant="ghost" size="md" onClick={() => setOpen(false)}>닫기</Button>
      </Dialog>
    </div>
  );
}
