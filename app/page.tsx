import LatestIssues from "./LatestIssues";
import Pagenation from "./components/Pagenation";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return <LatestIssues />;
}
