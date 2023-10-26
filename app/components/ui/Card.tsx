import Image from "next/image";
import Stat from "./Stat";
import { useState } from "react";
import { BsTrophy } from "react-icons/bs";
import { AiOutlineHome, AiOutlineCalendar } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { GiSoccerKick, GiSoccerField } from "react-icons/gi";
import { GoGoal } from "react-icons/go";
import { Goal } from "../../interfaces/Goal";

interface CardProps {
  data: Goal;
  delay: number;
}

export default function Card({ data, delay }: CardProps) {
  const date = new Intl.DateTimeFormat().format(new Date(data.date));
  const cardStyle = {
    opacity: 0,
    transform: "translateY(20px)",
    animation: `fade-in 0.25s ease-in-out ${delay}s forwards, slide-up 0.25s ease-in-out ${delay}s forwards`,
  };

  const [showDetail, setShowDetail] = useState(false);

  return (
    <article
      style={cardStyle}
      className="flex cursor-pointer flex-col gap-4 rounded-xl bg-card p-4 pb-0 text-card shadow-xl max-md:text-sm"
      onClick={() => setShowDetail((state) => !state)}
    >
      <header className="mx-3 flex items-center justify-between">
        <p>{date}</p>
        <p
          className={`flex items-center justify-center ${
            data.winning_goal ? "text-winning_goal" : "text-goal"
          }`}
        >
          <span className="mr-1 font-bold">{data.goal}</span>
          Goal
        </p>
      </header>
      <Stat className="!bg-season">
        <AiOutlineCalendar />
        <p>{data.season}</p>
      </Stat>
      <div className="flex flex-col items-center justify-center gap-3">
        <p className={"text-center  font-bold"}>{data.opponent}</p>
        <div className="relative h-[76px] w-[58px]">
          <Image
            src={data.logo}
            alt="Opponent logo"
            fill
            sizes="58px"
            objectFit="contain"
          />
        </div>
      </div>

      {data.competition && (
        <Stat>
          <BsTrophy />
          <p>{data.competition}</p>
        </Stat>
      )}
      {data.venue && (
        <Stat>
          <AiOutlineHome />
          <p>{data.venue === "H" ? "Home" : "Away"}</p>
        </Stat>
      )}
      <div className={`card-detail ${showDetail ? "is-open pb-4" : ""}`}>
        <div className="flex flex-col gap-4 overflow-hidden ">
          {data.minute && (
            <Stat>
              <BiAlarm />
              <p>{data.minute}</p>
            </Stat>
          )}
          {data.position && (
            <Stat>
              <GiSoccerField />
              <p>{data.position}</p>
            </Stat>
          )}
          {data.type_of_goal && (
            <Stat>
              <GiSoccerKick />
              <p>{data.type_of_goal}</p>
            </Stat>
          )}
          {data.goal_assist && (
            <Stat>
              <GoGoal />
              <p>{data.goal_assist}</p>
            </Stat>
          )}
        </div>
      </div>
    </article>
  );
}
