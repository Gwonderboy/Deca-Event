import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { MdDeleteForever, MdOutlinePendingActions } from "react-icons/md";
import { IoPricetags } from "react-icons/io5";
import { GiTicket } from "react-icons/gi";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { formatCurrency } from "../utility/currencyFormat";
import TicketsDropdown, { Tickets } from "../components/dropdownTickets";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getSingeEvent } from "../axiosSettings/events/eventAxios";
import EventsTicketsDropdown, {Ticketz} from "../components/eventTicketDropdown";

const Reg4Event = () => {
  const [counter, setCounter] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<Tickets | any>(null);
  const [cart, setCart] = useState<Tickets[]>([]);

  const [events, setEvents] = useState<any>({})
  const user:any = localStorage.getItem("user")
  const mainUser:any = JSON.parse(user)

  const eventId = localStorage.getItem("event_id")
  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  };

  const addToCart = () => {
    if (selectedTicket && counter > 0) {
      const updatedCart = [...cart, { ...selectedTicket, quantity: counter, total_amount: selectedTicket.ticket_amount * counter }];
      setCart(updatedCart);
      console.log(cart)
      setCounter(0);
      setSelectedTicket(null);
    }
  };

  const handleTicketSelect = (ticket: Ticketz) => {
    setSelectedTicket(ticket);
  };

  const calculateSubTotal = () => {
    return cart.reduce(
      (total, item:any) => total + item.ticket_amount * (item.quantity ?? 0),
      0
    );
  };

  const calculateTax = () => {
    const subTotal = calculateSubTotal();
    const taxPercentage = 0.1; // 10% tax
    return subTotal * taxPercentage;
  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();
    const tax = calculateTax();
    return subTotal + tax;
  };

  const handleDeleteCartItem = (index:any) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handlePaymentSubmit = (event:any) => {
    event.preventDefault();
    console.log("Tickets Purchased Successfully");
  };

  const submitFunction = async(event:any)=>{
    try{
      event.preventDefault();
      let total = calculateTotal()
      localStorage.setItem("user_email", mainUser.email)
      localStorage.setItem("amount", total.toString())
  
    }catch(error:any){
      console.log(error.message)
    }
  }
  //EMAIL = mainUser.email
  //AMOUNT = calculateTotal()
  //let amount = localStorage.getItem("amount")
  //amount = Number(amount)
  //const email = localStorage.getItem("user_email")

  const fetchEventData = async() => {
    try{
      const response = await getSingeEvent(eventId)
      setEvents(response.data)
      console.log(response)
    }catch(error:any){
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchEventData()
  }, [])


  return (
    <>
          <div className="fixed left-0">
        <Sidebar />
      </div>

      <div className="pl-20">
        <Navbar
          name={mainUser.first_name}
          image={
            mainUser.profile_picture.length === 0
              ? "/images/event1.png"
              : mainUser.profile_picture
          }
        />
      </div>
    <div className="flex justify-center mt-10">
      <div className="max-w-[982px] w-full md:h-[660px] p-4 md:p-8 bg-white rounded-2xl items-start md:gap-[100px] flex flex-col md:flex-row shadow">
        <div className="w-full md:w-[400px] flex-col justify-start items-start gap-2 mb-32 md:mb-auto">
          <h2 className="text-gray-900 text-base font-bold font-Inter">
            REGISTER FOR EVENTS
          </h2>
          <Input
            title={"Email"}
            placeholder={mainUser.email}
            type={"email"}
            disabled
          />
          <Input
            title={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
          />
          <div className="w-full text-gray-900 text-base font-Inter">
            <table className="w-full gap-5">
              <tr className="font-bold">
                <th>
                  <GiTicket className="text-green-500" />
                  Ticket
                </th>
                <th>
                  <IoPricetags className="text-green-500" />
                  Price
                </th>
                <th>
                  <MdOutlinePendingActions className="text-green-500" />
                  Action
                </th>
              </tr>
              {cart.map((cartItem:any, index) => (
                <tr key={index}>
                  <td>{cartItem.ticket_type}</td>
                  <td>
                    {formatCurrency(cartItem.ticket_amount * (cartItem.quantity ?? 0))}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteCartItem(index)}
                      className="text-red-500 justify-center items-center"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className="w-full md:w-[418px] flex-col justify-end items-end gap-2 md:inline-flex">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="flex-col justify-start items-start inline-flex">
              <p className="text-black text-xl font-medium font-Inter">
                Buy Ticket for {events.title}
              </p>
              <p className="text-black text-2xl font-bold font-Inter">
                {formatCurrency(
                  selectedTicket ? Number(selectedTicket.ticket_amount) * counter : 0
                )}
              </p>
            </div>
            <div className="justify-start items-center gap-6 flex">
              <button type="button" onClick={decrementCounter}>
                <FaSquareMinus className="w-8 h-8 text-green-400 hover:text-gray-300 rounded-md" />
              </button>
              <span className="text-black text-l font-normal font-Inter leading-7">
                {counter}
              </span>
              <button type="button" onClick={incrementCounter}>
                <FaSquarePlus className="w-8 h-8 text-green-400 hover:text-gray-300 rounded-md" />
              </button>
            </div>
          </div>
          <EventsTicketsDropdown tickets={events.ticket_types} onTicketSelect={handleTicketSelect} />
          <button
            type="submit"
            className="flex h-12 py-1 px-2 justify-center items-center flex-shrink-0 rounded font-Inter border-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            onClick={addToCart}
          >
            Add to Cart
          </button>
          <form className="w-full h-[78px] items-start gap-[15px] self-stretch px-4 py-2 mb-4">
            <label className="self-stretch text-black font-normal font-Inter mb-2.5 leading-none tracking-tight">
              Gift Card / Discount Code
            </label>
            <div className="inline-flex space-x-10">
              <input
                placeholder="Input your code"
                type="text"
                className="self-stretch h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500 items-center gap-2.5 w-full"
              />
              <Button
                title={"Apply"}
                text={"#4caf50"}
                bg={"white"}
                type={"submit"}
              />
            </div>
          </form>

          <form
            onSubmit={submitFunction}
            className="self-stretch flex-col justify-end items-end gap-2 flex"
          >
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="text-gray-500 text-base font-normal font-['Inter']">
                Order Summary
              </div>
            </div>
            <div className="self-stretch h-28 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-between items-start inline-flex">
                <h3 className="text-gray-500 text-lg font-medium font-['Inter']">
                  Sub total
                </h3>
                <span className="text-slate-600 text-xl font-medium font-['Inter']">
                  {formatCurrency(calculateSubTotal())}
                </span>
              </div>
              <div className="self-stretch justify-between items-start inline-flex">
                <h3 className="text-gray-500 text-lg font-medium font-['Inter']">
                  Tax
                </h3>
                <span className="text-slate-600 text-xl font-medium font-['Inter']">
                  {formatCurrency(calculateTax())}
                </span>
              </div>
              <div className="self-stretch justify-between items-start inline-flex">
                <h2 className="text-gray-700 text-xl font-bold font-['Inter']">
                  Total
                </h2>
                <span className="text-gray-900 text-xl font-medium font-['Inter']">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
            <Button
              title={"PAYMENTS"}
              text={"white"}
              bg={"#4caf50"}
              type={"submit"}
            />
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Reg4Event;
