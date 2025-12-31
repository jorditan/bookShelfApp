interface Props {
  title?: string;
  text: string;
  type?: "success" | "error" | "info" | "warning";
}
const Alert = ({ title, text, type = "info" }: Props) => {
  const types = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "text-fg-brand-strong rounded-base bg-brand-softer",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <>
      <div
        className={`p-4 mb-4 text-sm text-fg-brand-strong rounded-base ${types[type]}`}
        role="alert"
      >
        <span className="font-medium">{title}</span> {text}
      </div>
    </>
  );
};

export default Alert;
