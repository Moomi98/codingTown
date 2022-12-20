import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Room = dynamic(() => import("../../components/Room/Room"), {
  ssr: false,
});

const channel = () => {
  const router = useRouter();
  let nickName: string = "";

  if (typeof window !== "undefined") {
    nickName = localStorage.getItem("nickName") as string;
  }

  const roomCode = router.query.id as string;

  return (
    <div className="div">
      <Room roomCode={Number(roomCode)} nickName={nickName} />
    </div>
  );
};

export default channel;
