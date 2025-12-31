export default function PrimaryButton({
  text = "Button",
  type = "button",
  className = "",
  ...props
}) {
  const classes = ["btn", className].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {text}
    </button>
  );
}
