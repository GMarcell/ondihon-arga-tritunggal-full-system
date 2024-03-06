export default function FloatingButton() {
  return (
    <a
      href="https://wa.me/6282312073911?text=I'm%20interested%20in%20your%20product%20for%20sale"
      target="_blank"
    >
      <button className="btn btn-square btn-ghost  !fixed bottom-6 right-6 btn-lg flex gap-1 items-center border border-blue-gray-50">
        <img src='/logos/WhatsApp_icon.png' alt="icon"/>
      </button>
    </a>
  );
}
