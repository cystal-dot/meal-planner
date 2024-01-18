"use client";
// ランダムセレクト画面を表示するページ
import { useEffect, useState } from "react";
import List from "../_common/list";
import Sidebar from "../_common/sidebar";

export default function Home({}) {
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/data");
        const data = await res.json();
        setRecipeData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData().then(() => setIsLoading(false));
  }, []);

  // Loadingはいい感じに後で作る
  if (isLoading) return <div>Loading...</div>;
  if (!recipeData) return <div>No data</div>;

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
