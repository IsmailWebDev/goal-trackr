import { Player } from "@/app/interfaces/Player";
export async function fetchPlayer(id: number): Promise<Player> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/${id}`);
  const { data } = await res.json();
  return data;
}
