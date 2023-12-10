import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

const Events = () => {
  interface Event {
    name: string;
    code: string;
  }
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events: Event[] = [
    { name: "Business", code: "BSN" },
    { name: "Charity", code: "FR" },
    { name: "Community", code: "CM" },
    { name: "Conference", code: "CF" },
    { name: "Corporate off-sites & executive meeting", code: "CEM" },
    { name: "Exhibitions", code: "FR" },
    { name: "Fashion shows and red carpets", code: "FR" },
    { name: "Festivals", code: "FR" },
    { name: "Fundraising", code: "FR" },
    { name: "Hybrid", code: "HY" },
    { name: "Networking events", code: "FR" },
    { name: "Private Party", code: "PP" },
    { name: "Product launch", code: "PL" },
    { name: "Seminar", code: "SEM" },
    { name: "Sports and competition", code: "SP" },
    { name: "Team building", code: "TB" },
    { name: "Trade shows", code: "FR" },
    { name: "Virtual", code: "VR" },
    { name: "Weddings", code: "FR" },
    { name: "Workshop", code: "WS" },
  ];
  return (
    <div className="self-stretch bg-gray-200 rounded-[5px] justify-between items-center inline-flex">
      <Dropdown
        value={selectedEvent}
        onChange={(e: DropdownChangeEvent) => setSelectedEvent(e.value)}
        options={events}
        optionLabel="name"
        placeholder="Choose event type"
        className="text-green-500 text-xs bg-gray-200 font-normal font-['Product Sans'] w-full md:w-14rem"
      />
    </div>
  );
};

export default Events;
