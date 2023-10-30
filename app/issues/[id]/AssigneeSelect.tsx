"use client";
import { Skeleton } from "@/app/components/";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "false"}
        onValueChange={async (userId) => {
          try {
            await axios.patch("/api/issues/" + issue.id, {
              assignedToUserId: userId === "false" ? null : userId,
            });
          } catch (error) {
            toast.error("Change could not be saved.");
          }
        }}
      >
        <Select.Trigger placeholder="Assgn..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="false">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/user").then((res) => res.data),
    staleTime: 60 * 60 * 1000, // 60mins
    retry: 3,
  });
export default AssigneeSelect;
