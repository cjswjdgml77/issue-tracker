import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const IssueDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!issue) return notFound();
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
    </div>
  );
};

export default IssueDetailPage;
