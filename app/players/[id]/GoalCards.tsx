"use client";
import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Spinner from "@/app/components/ui/Spinner";
import Card from "@/app/components/ui/Card";
import { fetchGoals, fetchLastGoal } from "@/app/api/services/Goal";
import { useParams } from "next/navigation";
import { fetchPlayer } from "@/app/api/services/Player";

export default function GoalCards() {
  const { id } = useParams<{ id: string }>();
  const { ref, inView } = useInView();

  const { data: playerData } = useQuery({
    queryKey: ["player", id],
    queryFn: () => fetchPlayer(+id),
  });

  const { data: lastGoalData } = useQuery({
    queryKey: ["goals/latest", id],
    queryFn: () => fetchLastGoal(+id),
  });

  const {
    status,
    data: goalsData,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["goals", id],
    queryFn: (ctx) => fetchGoals(+id, 100, ctx.pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  React.useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <div className="mx-8 my-12 flex items-center justify-between text-white md:mx-12">
        <h1 className="text-base font-bold md:text-xl lg:text-3xl">
          {playerData?.name}
        </h1>
        <p className="text-base text-goal md:text-xl lg:text-2xl">
          <span className="font-bold">
            {lastGoalData && `${lastGoalData.goal} Goals`}
          </span>
        </p>
      </div>

      {status === "loading" ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : status === "error" ? (
        <span>Error: error</span>
      ) : (
        <>
          <main className="mx-auto grid grid-cols-1 items-start gap-6 max-xl:mx-2 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-screen-xl 2xl:grid-cols-4">
            {goalsData.pages.map((page) => (
              <React.Fragment key={page.nextCursor}>
                {page.playerGoals.map((goal, i) => (
                  <Card key={goal.id} data={goal} delay={(i + 1) * 0.05} />
                ))}
              </React.Fragment>
            ))}
          </main>

          <div className="my-8 flex items-center justify-center">
            <button
              ref={ref}
              onClick={() => void fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage || hasNextPage ? <Spinner /> : null}
            </button>
          </div>
        </>
      )}
    </>
  );
}
