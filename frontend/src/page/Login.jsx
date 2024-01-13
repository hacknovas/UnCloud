import {Link} from "react-router-dom"
import React from "react"
import Input from "../components/Input"
import Button from "../components/Button"
export default function Login() {
    return (
        <>
            <section className="min-h-screen w-full flex items-center justify-center bg-blue-100">
                <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md w-[95%] max-w-[550px]">
                    <h1 className="text-xl font-bold">Welcome to UnCloud! 👋</h1>
                    <p className="mt-2 max-w-[80%] text-center">
                        Please login with email address and password to continue .
                    </p>

                    <form
                        action=""
                        className="mt-4 w-full"
                    >
                        <div className="mb-4">
                            <Input
                                placeholder="Email address"
                                title="Email address"
                                type="email"
                                name="email"
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                placeholder="*********"
                                title="Password"
                                type="password"
                                name="password"
                            />
                        </div>

                        <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Login
                        </Button>
                    </form>

                    <div className="mt-4">
                        Dont have an account yet ?{" "}
                        <Link to="/register" className="text-primary">
                            Create an account
                        </Link>
                    </div>
                </div>
            </section>

        </>
    )
}
