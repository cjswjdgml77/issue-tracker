import Pagenation from "./components/Pagenation";

export default function Home() {
  return <Pagenation itemCount={100} pageSize={10} currentPage={10} />;
}
