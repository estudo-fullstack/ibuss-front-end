import logo from "../../assets/icons/icon-ibuss.svg";

export function Header() {
  return (
    <div className="px-6 pt-6 pb-4">
      <img src={logo} alt="Logo iBuss" className="w-20" />
    </div>
  );
}
