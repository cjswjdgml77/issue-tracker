import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueBtn from "./DIssueBtn";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetails from "./IssueDetails";
import { authOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "4" }} gap="5">
      <Box className="md:col-span-3">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditIssueBtn issueId={issue.id} />
            <DeleteIssueBtn issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
