import Navbar from "../components/Navbar";

export default function GettingStarted() {
  return (
    <>
    <Navbar />
    <div className="max-w-3xl mx-auto py-16">
      <video controls muted  >
      <source className="w-full" src="/FairBite-demo.mp4" type="video/mp4"/>
        </video>
    </div>
    </>
  )
}