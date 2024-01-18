import { useState, useEffect } from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa6";
import { SlDislike, SlLike } from "react-icons/sl";
import { getSingeEvent, userDislikesAnEvent, userLikesAnEvent } from "../axiosSettings/events/eventAxios";
import { showErrorToast, showSuccessToast } from "../utility/toast";

interface Props {
  description: string;
  time: string;
  organizerInfo: string;
  organizerImage: string;
}

function SingleEventBody(props: Props) {

  const [event, setEvent] = useState<any>({})
const eventId = localStorage.getItem("event_id")
  const fetchData = async()=>{
    try{
      const response = await getSingeEvent(eventId)
      setEvent(response.data)
      return response.data.data
      }catch(error:any){
          console.log(error)
      }
  }

  useEffect(()=>{
    fetchData();
}, [])

const userLikesEvent = async()=>{
  try{
    const response = await userLikesAnEvent(eventId)
    if(response.status !== 200){
      return showErrorToast(response.data.message)
    }

    showSuccessToast(response.data.message)
    return fetchData()
  }catch (error: any) {
    if (error.response) {
      return showErrorToast(error.response.data.message);
    } else if (error.request) {
      return showErrorToast("Network Error. Please try again later.");
    } else {
      return showErrorToast("Error occurred. Please try again.");
    }
  }
}
const userDislikesEvent = async()=>{
  try{
    const response = await userDislikesAnEvent(eventId)
    if(response.status !== 200){
      return showErrorToast(response.data.message)
    }

    showSuccessToast(response.data.message)
    return fetchData()
  }catch (error: any) {
    if (error.response) {
      return showErrorToast(error.response.data.message);
    } else if (error.request) {
      return showErrorToast("Network Error. Please try again later.");
    } else {
      return showErrorToast("Error occurred. Please try again.");
    }
  }
}

  return (
    <div className="flex justify-between pt-5">
      <div className="w-6/12">
        <p className="font-medium">Description</p>
        <p className="font-Inter h-[10%] overflow-y-scroll">{props.description}</p>
        <div className="w-[300px] h-[100px] mt-2 flex justify-between">
            <button 
            onClick={userLikesEvent}
            >
              <span className="hover:text-green-800 text-green-500">
              <SlLike className="w-[100px] h-[50px]" />
              <span>{event.likesArr?.length === 1 ? <p>{event.likes} like</p>: <p>{event.likes} likes</p>}</span>
              </span>
            </button>
            <button 
            onClick={userDislikesEvent}
            >
              <span className="hover:text-red-800 text-red-500">
              <SlDislike className="w-[100px] h-[50px]" />
              <span>{event.dislikesArr?.length === 1 ? <p>{event.dislikes} dislike</p>: <p>{event.dislikes} dislikes</p>}</span>
              </span>
            </button>
          </div>
        <p className="pt-3 font-medium">Hours</p>
        <p className="font-Inter">
          Time <span className="text-green-500">{props.time}</span>
          <br />
          {/* Weekends hours: <span className="text-green-500">7PM- 8PM</span> */}
        </p>
        <p className="pt-3">Organizer Contact</p>
        <div className="w-[600px]flex flex gap-[10px]">
        <img
          src={props.organizerImage}
          alt="map"
          width={50}
          height={50}
          className="border-radius-[50%]"
        /> {props.organizerInfo}
        </div>
      </div>
      <div className="w-5/12">
        <p className="font-medium">Event location</p>
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*qYUvh-EtES8dtgKiBRiLsA.png"
          alt="map"
          width={480}
          height={260}
        />
        <p className="text-black font-medium pt-3">Share with friends</p>
        <div>
          <div className="w-32 h-8 md:w-96 flex gap-3">
            <a href="facebook.com" className="w-8 h-8">
              <FaFacebookF className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
            </a>
            <a href="instagram.com" className="w-8 h-8">
              <FaInstagram className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
            </a>
            <a href="instagram.com" className="w-8 h-8">
              <FaTelegram className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
            </a>
            <a href="instagram.com" className="w-8 h-8">
              <FaTwitter className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
            </a>
            <a href="instagram.com" className="w-8 h-8">
              <FaEnvelope className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEventBody;
