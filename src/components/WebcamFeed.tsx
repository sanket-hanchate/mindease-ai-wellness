import Webcam from "react-webcam";

export default function WebcamFeed() {

  return (
    <Webcam
      audio={false}
      mirrored
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}