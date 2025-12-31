export default function PrimaryButton({text = "Button", type = "button"}) {
    return(
        <button type={type} className="btn">
            {text}
        </button>
    );
}