interface Props {
  title: string;
  text: string;
  bg: string;
}

function Button(props: Props) {
  return (
    <button
      type="submit"
      className={`${props.text} flex h-12 py-2 px-4 justify-center items-center flex-shrink-0 rounded font-Inter ${props.bg}`}
    >
      {props.title}
    </button>
  );
}

export default Button;
