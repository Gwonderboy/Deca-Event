interface Props {
  title: string;
  placeholder: string;
  type: string;
}

function Input(props: Props) {
  return (
    <div className="w-full h-[78px] items-start gap-[15px] self-stretch px-4 py-2 mb-4">
      <div className="self-stretch text-black font-normal font-Inter leading-none tracking-tight">
        {props.title}
      </div>
      <div className="">
        <input
          placeholder={props.placeholder}
          type={props.type}
          className="self-stretch h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500 items-center gap-2.5 w-full"
        />
      </div>
    </div>
  );
}
export default Input;
