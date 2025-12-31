export default function PrimaryButton({
  text = "Button",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className="btn"
      {...props}
    >
      {text}
    </button>
  );
}
