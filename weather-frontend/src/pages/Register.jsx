import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import toast from "react-hot-toast";
function Register() {

  const navigate = useNavigate();

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit = async(e)=>{

      e.preventDefault();
      console.log("Register button clicked");

      try{

          await register(
              username,
              email,
              password
          );

          toast.success("Account created successfully");

          navigate("/");

      }catch (err) {

        console.log(err);

        console.log(err.response);

        console.log(err.response?.data);

        toast.error("Registration failed");

    }

  }

  return (

<div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-700 flex justify-center items-center">

<div className="bg-white w-[420px] rounded-2xl shadow-2xl p-8">

<h1 className="text-4xl text-center font-bold text-blue-700">

Register

</h1>

<form
onSubmit={handleSubmit}
className="space-y-5 mt-8"
>

<input

className="w-full border p-3 rounded-lg"

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>

<input

className="w-full border p-3 rounded-lg"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

className="w-full border p-3 rounded-lg"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>
<button
  type="submit"
  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
  Create Account
</button>

</form>

<p className="text-center mt-6">

Already have an account?

<Link

to="/"

className="text-blue-600 font-semibold ml-2"

>

Login

</Link>

</p>

</div>

</div>

  );

}

export default Register;