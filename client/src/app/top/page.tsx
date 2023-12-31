import Sidebar from "../_common/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <h2 className="text-lg font-semibold">Hello User!</h2>
          <div className="flex justify-between items-center mt-2 mb-4">
            <h3 className="text-md font-bold">新しいレシピを探す</h3>
            <button className="text-sm font-semibold">全て見る</button>
          </div>
          {/* このあたりのgridの中身は追々精査する */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-orange-200 p-4 rounded-lg shadow-md">
              <h4 className="font-bold">ランダムセレクト</h4>
              <p>週間食事プラン</p>
            </div>
            <div className="bg-yellow-200 p-4 rounded-lg shadow-md">
              <h4 className="font-bold">健康</h4>
              <p>健康重視プラン</p>
            </div>
            <div className="bg-green-200 p-4 rounded-lg shadow-md">
              <h4 className="font-bold">安価な料理</h4>
              <p>低価格プラン</p>
            </div>
            <div className="bg-red-200 p-4 rounded-lg shadow-md">
              <h4 className="font-bold">手間がかかるけど最高な奴ら</h4>
              <p>3150</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 mb-4">
            <h3 className="text-md font-bold">サイト全体</h3>
            <button className="text-sm font-semibold">全て見る</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-orange-200 p-4 rounded-lg shadow-md">
              <h4 className="font-bold">週間人気料理</h4>
              <p>一覧を見る</p>
            </div>
            <div className="bg-yellow-200 p-4 rounded-lg shadow-md">
              <h4 className="font-bold">月間人気料理</h4>
              <p>一覧を見る</p>
            </div>
            <div className="bg-green-200 p-4 rounded-lg shadow-md">
              <h4 className="font-bold">Your Year in Meals</h4>
              <p>2023</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
