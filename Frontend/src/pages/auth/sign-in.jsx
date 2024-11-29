import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import GlobalAxios from "../../../Global/GlobalAxios";
import { useState } from "react";
import Cookies from "js-cookie";


export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const response = await GlobalAxios.post("/admin/login", formData);
      if(response.data.status === "success") {
        console.log(response.data);
        Cookies.set("token", response.data.token);
      }
      if(Cookies.get("token")) {
        window.location.href = "/dashboard/home";
       }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="m-8 flex justify-center gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              name="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
