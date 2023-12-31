// ランダムセレクト画面を表示するページ

import List from "../_common/list";
import Sidebar from "../_common/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <main className="flex">
        <div className="bg-white">
          <List />
        </div>
      </main>
    </div>
  );
}
