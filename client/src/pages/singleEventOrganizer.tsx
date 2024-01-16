import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaArrowLeft,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaThumbsDown,
  FaThumbsUp,
  FaTrash,
  FaTwitter,
} from "react-icons/fa6";
import Button from "../components/Button";
import "./table.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventComments, getSingeEvent, addEventComments, upComingEvents, userDeleteEvent } from "../axiosSettings/events/eventAxios";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import Modal from "../components/modal";

function SingleEventOrganizer() {
  const user:any = localStorage.getItem("user")
  const mainUser:any = JSON.parse(user)
  const event_id:any = localStorage.getItem("event_id")
  const navigate = useNavigate()
  const { eventId } = useParams();
  const [event, setEvent] = useState<any>({})
  const [comments, setComments] = useState<any>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<any>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  function formatDate(dateString:any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  function formatDateTime(dateString: any) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
}
  const locate = localStorage.getItem("location")
  const fetchData = async()=>{
    try{
      const response = await getSingeEvent(eventId)
      setEvent(response.data)
      return response.data.data
      }catch(error:any){
          console.log(error)
      }
  }

  const addComments = async(e:React.FormEvent<HTMLFormElement>)=>{
    try{
      e.preventDefault()
      setLoading(true)
      const body = {
        comments: newComment
      }
      const response = await addEventComments(eventId, body)
      if(response.status !== 'success'){
        setLoading(false)
        return showErrorToast(response.message)
      }
      showSuccessToast(response.message)
      fetchEventComments()
      fetchData()
      setNewComment("")
      localStorage.setItem("event", JSON.stringify(response.data))
      return setLoading(false)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }
  
  const fetchEventComments = async()=>{
    try{
      const response = await getEventComments(eventId)
      setComments(response.mainComments)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }
  useEffect(()=>{
      fetchData();
      fetchEventComments();
  }, [])

  const handleCommentChange = async(e:any)=>{
    try{
      e.preventDefault()
      let target = e.target.value
      setNewComment(target)
    }catch(error:any){
      console.log(error)
    }
  }

  const deleteEventFunction = async()=>{
    try{
      setDeleteLoading(true)
      const response = await userDeleteEvent(eventId)
      console.log(response)
      if (response.status !== 200){
        setDeleteLoading(false)
        showErrorToast(response.data.message)
        return setShowDeleteModal(false)
      }
      showSuccessToast(response.data.message)
      setDeleteLoading(false)
      navigate("/hostedevent")
      return setShowDeleteModal(false)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }

  const handleClose = async() => {
    setDeleteLoading(false)
    return setShowDeleteModal(false)
  }

  const buttons:any = [
    {
      label: `${deleteLoading ? "Loading..." : "Confirm"}`,
      onClick: ()=> deleteEventFunction(),
      bg: '#27AE60', // Replace with your desired color
      text: '#FFFFFF', // Replace with your desired color
    },
  ]
  return (
    <div className="w-screen pb-5">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="pl-24">
        <div>
          <Navbar
           name={mainUser.first_name} image={mainUser.profile_picture?.length === 0
            ? "/images/event1.png"
            : mainUser.profile_picture}
          />
        </div>
        <div className="ml-16 mr-16 mt-2">
          <div className="pl-8 my-2">
          <a href={`http://localhost:5173${locate}`} className="no-underline text-black">
              <div className="flex">
                <FaArrowLeft className="text-black" />{" "}
                <p className="pl-2">Back</p>
              </div>
            </a>
          </div>
          <div
            className="w-full h-[595px] bg-neutral-900 bg-opacity-30 bg-cover bg-center rounded-[10px]"
            style={{
              backgroundImage: `url(${event.event_image})`,
            }}
          >
            <div className="flex px-20 text-white justify-end py-5">
              <div>
                <a href="#" className="w-8 h-8" onClick={()=> setShowDeleteModal(true)}>
                  <FaTrash className="text-red-500 w-full h-full p-2 bg-white rounded-full" />
                </a>
              </div>
            </div>

            <div className="flex px-20 text-white justify-between pt-35">
              <div className="w-3/5 h-[307px] flex-col gap-[18px] inline-flex">
                <h1 className="text-white text-[64px] font-['Inter']">
                {event.title}
                </h1>
                <div className="text-white text-base font-Inter">
                {event.description}
                </div>
                <div className="relative">
                  <div className="left-[29px] top-0 text-white text-lg font-normal font-['Inter']"></div>
                </div>
              </div>
              {/* right div */}
              <div className="bg-white rounded-[10px] shadow p-10">
                <div className="text-black text-2xl font-normal font-Inter pb-4">
                  Date & time
                </div>
                <div className="text-zinc-500 text-lg font-normal font-Inter pb-4">
                {`${formatDate(event.event_date)} ${event.event_time}`}
                </div>

                {/* <div className="text-green-500 text-base font-normal font-Inter pb-4">
                  Add to calendar
                </div>
                <div className="self-stretch gap-2.5 inline-flex pb-4">
                  <Button
                    title={"Book Now"}
                    text={"white"}
                    bg={"green"}
                    type={"button"}
                  />
                </div> */}
                <div className="text-center text-zinc-500 text-base font-normal font-['Inter']">
                  No Refunds
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-5">
            <div className="w-6/12">
              <p className="font-medium">Description</p>
              <p className="font-Inter">
              {event.description}
              </p>
            </div>
            <div className="w-5/12">
              <div className="flex justify-between w-[70%]">
                <div className="">
              <p className="pt-3 font-medium">Time</p>
              <p className="font-Inter">
                {/* Weekdays hours:{" "} */}
                <span className="text-green-500">{event.event_time}</span>
                <br />
                {/* Weekends hours: <span className="text-green-500">7PM- 8PM</span> */}
              </p>
              </div>
              <div>
                <p className="pt-3 font-medium">Event Status</p>
                <p className="font-Inter">
                {/* Weekdays hours:{" "} */}
                {event.isBlocked ? <span className="text-red-500">Blocked, Please <a className="text-red-500" href="mailto:admin@example.com?subject=Blocked&body=Please%20Contact%20Admin">Contact Admin</a></span> : <span className="text-green-500">Active</span>}
                <br />
              </p>
              </div>
              </div>
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
          {/* comment section */}
          <div className="text-gray-900 text-base font-medium leading-snug tracking-tight py-4">
            Comments
          </div>
          <div className="p-5 w-full bg-white rounded-lg shadow border border-gray-300 flex-col">
            <div className="flex">
              <img
                src={mainUser.profile_picture?.length === 0
                  ? "/images/event1.png"
                  : mainUser.profile_picture}
                alt="profile_pic"
                className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
              />
              <h3 className="text-black text-lg pl-2 font-semibold">
              {mainUser.user_name}
              </h3>
            </div>
            <hr />
            <div className="w-full">
              <form className="flex justify-between w-full" onSubmit={(e:any)=> addComments(e)}>
                <div className="w-4/5">
                  <input
                    type="text"
                    className="h-12 w-full border border-gray-500 px-2 font-Inter"
                    required
                    value={newComment}
                    onChange={(e)=> handleCommentChange(e)}
                  />
                </div>
                <div className="pl-2 w-1/5">
                  <Button
                    title={loading ? "Loading..." : "Comment"}
                    text={"white"}
                    bg={"green"}
                    type={"submit"}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="py-3 bg-gray-100 p-[20px] h-[300px] overflow-y-scroll">
          {comments && comments.map((comment:any, index:any) => (
            <div key={index}>
              <div className="flex">
                <img
                  src={comment.picture}
                  alt="profile_pic"
                  className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
                />
                <h3 className="text-black text-lg pl-2 font-semibold">
                {comment.name}
                </h3>
              </div>
              <p className="font-Inter">
              {comment.comment}
              </p>
              <div className="flex justify-start font-Inter">
                <a href="#" className="w-8 h-8">
                  <FaThumbsUp className="" />
                </a>
                <a href="#" className="w-8 h-8">
                  <FaThumbsDown className="" />
                </a>
                <p>{formatDateTime(comment.comment_time)}</p>
              </div>
            </div>
             ))}
             {!comments && <p>No comments yet.</p>}
          </div>
          <div className="w-full">
            <div className="text-gray-900 text-base text-center font-medium leading-snug tracking-tight py-4">
              Purchased Tickets
            </div>
            <table className="w-full text-gray-500 font-Inter text-xs">
              <thead className="w-full">
                <td className="w-1/4">NAME</td>
                <td className="w-1/4">EMAIL</td>
                <td className="w-1/4">TICKET TYPE</td>
                <td className="w-1/4">TOTAL</td>
              </thead>
              <tbody>
                <tr className="table-style">
                  <td className="flex">
                    <img
                      src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                      alt="profile_pic"
                      className="w-7 h-7 relative rounded-[200px] border-2 border-gray-300"
                    />{" "}
                    <p className="pl-3">John Doe</p>{" "}
                  </td>
                  <td>jd@gmail.com</td>
                  <td>VIP</td>
                  <td>1</td>
                </tr>
                <tr className="table-style">
                  <td className="flex table-style">
                    <img
                      src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                      alt="profile_pic"
                      className="w-7 h-7 relative rounded-[200px] border-2 border-gray-300"
                    />{" "}
                    <p className="pl-3">John Doe</p>{" "}
                  </td>
                  <td>jd@gmail.com</td>
                  <td>VIP</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal onClose={() => handleClose()} buttons={buttons}>
          <p className="font-Inter text-center">
          <span className="text-red-500">Are you sure you want to delete this event?</span>
              </p>
        </Modal>
      )}
    </div>
  );
}

export default SingleEventOrganizer;
