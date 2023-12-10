// import axios from "../configurations/httpSetup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { CiSearch } from "react-icons/ci";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { IoMdCalendar } from "react-icons/io";
import Events from "../components/events";
import Locations from "../components/locations";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import CalendarInput from "../components/calender";
import CardContainer from "../components/CardContainer";

export const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen w-full items-center">
      <nav className="w-full bg-gray-100 p-4 fixed top-0 z-40">
        <div className="w-10/12 mx-auto flex items-center justify-between">
          <div className="text-center">
            <span className="text-gray-900 text-3xl font-normal font-Holtwood leading-14">
              DECA
            </span>
            <span className="text-green-500 text-3xl font-normal font-Holtwood leading-14">
              EVENTS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to={"/signin"} className="no-underline">
              <Button title={"Login"} text={"text-green-500"} bg={"bg-white"} />
            </Link>
            <Link to={"/signup"} className="no-underline">
              <Button
                title={"Signup"}
                text={"text-white"}
                bg={"bg-green-500"}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* ----------------------- Header ----------------------- */}

      <section className="rounded-md w-full relative mb-4 items-center justify-center flex flex-col">
        <div className="bg-[url('/images/img.png')] w-11/12 bg-cover bg-center h-[596px] md:max-h-screen  items-center rounded-md">
          <h1 className="text-center text-white text-4xl font-bold mt-60 font-bold font-Product uppercase">
            Made for those <br />
            who do
          </h1>
        </div>
        <div className="w-10/12 flex inline-flex items-center p-2 md:p-8 bg-green-500 rounded-md md:flex-col justify-start md:absolute top-[510px]">
          <form
            action=""
            method="get"
            className="md:w-full lg:w-full p-4 md:p-8 flex flex-col md:flex-row items-center"
          >
            <div className="mb-4 md:mb-0 md:w-1/3">
              <p className="text-gray-50 text-base font-normal font-Product mb-2">
                Looking for
              </p>
              <Events />
            </div>
            <div className="mb-4 md:mb-0 md:w-1/3 cursor-pointer">
              <p className="text-gray-50 text-base font-normal font-Product mb-2">
                Location
              </p>
              <Locations />
            </div>
            <div className="mb-4 md:mb-0 md:w-1/3">
              <p className="text-gray-50 text-base font-normal font-Product mb-2">
                When
              </p>
              <CalendarInput />
            </div>
            <button type="submit" className="w-full md:w-[70px] p-2.5 bg-emerald-900 rounded-[5px] items-center gap-2.5 hover:bg-emerald-700">
              <CiSearch className="w-6 h-6 relative w-full text-white" />
            </button>
          </form>
        </div>
      </section>

      {/* ----------------------- Events ----------------------- */}

      <div className="w-full mt-24 items-center mb-8">
        <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col items-start gap-1.5">
            <div className="text-green-500 text-2xl font-semibold font-Inter">
              Upcoming Events
            </div>
            <div className="w-16 h-1 bg-green-500"></div>
          </div>
          <div className="flex gap-5">
            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
              <div className="text-slate-500 text-xs font-normal font-Inter leading-none tracking-tight">
                Any category
              </div>
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
              <div className="text-slate-500 text-xs font-normal font-Inter leading-none tracking-tight">
                Lagos
              </div>
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
              <div className="text-slate-500 text-xs font-normal font-Inter leading-none tracking-tight">
                25/12/2023
              </div>
              <IoMdCalendar />
            </div>
          </div>
        </div>
        <CardContainer />
      </div>
      <Button title={"Load more..."} text={"text-white"} bg={"bg-green-500"} />

      {/* ----------------------- Footer ----------------------- */}

      <footer className="h-80 w-full bg-green-500 items-center justify-center flex flex-col mt-16">
        <h1 className="font-Holtwood text-3xl font-normal text-white my-7">
          <span className="text-white">DECA</span>
          <span className="text-emerald-900">EVENTS</span>
        </h1>
        <form
          action="#"
          method="POST"
          className="flex max-w-md justify-center items-center gap-2.5 mt-6"
        >
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="px-4 py-2.5 text-sm border-b-2 rounded-md border-gray-400 outline-none opacity-50 focus:border-blue-400 flex-grow flex-shrink-0 flex-basis-0 h-14 md:h-14 "
            placeholder="Enter your mail"
          />
          <button
            type="submit"
            className="w-32 md:w-40 px-10 py-2.5 bg-emerald-900 rounded-md text-white font-sans hover:bg-emerald-700"
          >
            Subscribe
          </button>
        </form>
        <div className="w-full md:w-[292px] my-7 h-12 flex justify-center items-center gap-5 text-center text-white font-normal font-product-sans">
          <a href="#" className="no-underline text-white">
            Home
          </a>
          <a href="" className="no-underline text-white">
            About
          </a>
          <a href="" className="no-underline text-white">
            Get in touch
          </a>
        </div>
        <div className="w-11/12 top-20 md:mt-18 border border-white"></div>
        <div className=" w-11/12 flex justify-between mt-10">
          <div className="w-32 h-8 md:w-96 flex gap-3">
            <a href="linkedin.com">
              <FaLinkedin className="text-white" />
            </a>
            <a href="instagram.com">
              <FaInstagram className="text-white" />
            </a>
            <a href="facebook.com">
              <FaFacebookF className="text-white" />
            </a>
          </div>
          <p className="text-right text-white text-sm font-normal font-inter">
            Non Copyrighted © 2023 Upload by Deca-Event
          </p>
        </div>
      </footer>
    </div>
  );
};
