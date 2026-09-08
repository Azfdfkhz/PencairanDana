import Image from "next/image";
import PencairanDana from "@/app/pencairan-dana/Page"
import Cairkandana from "@/app/pencairan-dana/cairkan-dana/Page"

export default function Home() {
  return (
    <>
      <PencairanDana/>

      <Cairkandana/>
    </>
  );
}
