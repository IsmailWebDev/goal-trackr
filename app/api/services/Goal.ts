import { Goal } from "@/app/interfaces/Goal";

export async function fetchGoals(
  id: number,
  limit: number,
  pageParam: number = 0,
): Promise<{ playerGoals: Goal[]; nextCursor?: number }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/${id}?limit=${limit}&cursor=${pageParam}`,
  );
  const { data } = await res.json();
  return data;
}
export async function fetchLastGoal(id: number): Promise<Goal> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/${id}/latest`,
  );
  const { data } = await res.json();
  return data;
}
