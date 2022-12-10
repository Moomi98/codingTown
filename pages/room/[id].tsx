import dynamic from "next/dynamic";

const Room = dynamic(() => import("../../components/Room/Room"), {
  ssr: false,
});

const channel = () => {
  return (
    <div className="div">
      <Room />
    </div>
  );
};

export default channel;
