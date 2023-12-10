import Button from "./Button";

interface Props {
  date: string;
  ticketsNo: number;
  title: string;
  description: string;
  image: string;
}

function Card(props: Props) {
  return (
    <div
      className={`w-[386.67px] h-[400px] pt-[282px] rounded-md flex-col justify-end items-center flex bg-cover bg-center transition-all duration-100 delay-200 z-20 hover:opacity-0`}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="px-6 pt-2 pb-4 bg-black bg-opacity-10 rounded-bl-md rounded-br-md backdrop-blur-[2px] flex-col justify-start items-start gap-2 inline-flex">
        <div>
          <span className="text-white text-base font-medium font-Inter leading-snug tracking-tight">
            {props.date}
          </span>
          <span className="text-white text-base font-normal font-Inter leading-snug tracking-tight">
            {" "}
            /{" "}
          </span>
          <span className="text-white text-base font-semibold font-Inter leading-snug tracking-tight">
            {props.ticketsNo}
          </span>
          <span className="text-white text-base font-normal font-Inter leading-snug tracking-tight">
            {" "}
          </span>
          <span className="text-white text-base font-medium font-Inter leading-snug tracking-tight">
            Tickets bought
          </span>
        </div>
        <div className="w-[338.67px]">
          <span className="text-white text-lg font-bold font-Inter leading-[25.20px] tracking-tight">
            {props.title}
          </span>
          <span className="text-white text-base font-semibold font-Inter leading-snug tracking-tight">
            ,
          </span>
          <span className="text-white text-sm font-normal font-Inter leading-tight">
            {" "}
          </span>
          <span className="text-white text-sm font-medium font-Inter leading-tight">
            {props.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;

export function Card2(props: Props) {
  return (
    <div
      className={`w-full rounded-md flex-col justify-end items-center bg-cover bg-center card-back`}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="px-6 pt-2 h-full w-full pb-4 bg-black bg-opacity-10 rounded-bl-md rounded-br-md backdrop-blur-[2px] flex-col justify-start items-start gap-2 inline-flex">
        <div>
          <span className="text-white text-base font-medium font-Inter">
            {props.date}
          </span>
          <span className="text-white text-base font-normal font-Inter">
            {" "}
            /{" "}
          </span>
          <span className="text-white text-base font-semibold font-Inter">
            {props.ticketsNo}
          </span>
          <span className="text-white text-base font-normal font-Inter">
            {" "}
          </span>
          <span className="text-white text-base font-medium font-Inter">
            Tickets bought
          </span>
        </div>
        <div className="w-[338.67px]">
          <span className="text-white text-lg font-bold font-Inter leading-[25.20px] tracking-tight">
            {props.title}
          </span>
          <span className="text-white text-base font-semibold font-Inter">
            ,
          </span>
          <span className="text-white text-sm font-normal font-Inter leading-tight">
            {" "}
          </span>
          <span className="text-white text-sm font-medium font-Inter leading-tight">
            {props.description}
          </span>
        </div>
        <Button title={"BUY TICKETS"} text={"text-white"} bg={"bg-green-500"} />
      </div>
    </div>
  );
}

