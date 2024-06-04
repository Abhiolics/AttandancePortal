
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main>
    <div className="flex ">
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?t=st=1717150540~exp=1717154140~hmac=24e28de5bcfcf0283af7c9ae787a0ed8adf5999164fac276643af78ced9d8659&w=900)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Attendance System</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <Link href="/login">
    <button className="btn btn-info" >Get Started</button>
    </Link>
    </div>
  </div>
</div>
    </div>
    </main>
  );
}
