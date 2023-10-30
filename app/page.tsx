import Pagenation from "./components/Pagenation";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagenation
      itemCount={100}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
