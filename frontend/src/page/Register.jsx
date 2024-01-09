import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <>
            <section className="min-h-screen w-full flex items-center justify-center ">
                <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md w-[95%] max-w-[550px]">
                    <h1 className="text-xl font-bold">Hey new to Meta market! 👋</h1>
                    <p className="mt-2 max-w-[80%] text-center">
                        Create an account and start using now.
                    </p>

                    <form
                        action=""
                        className="mt-4 w-full"
                    >
                        <div className="mb-4">
                            <Input
                                placeholder="User name"
                                title="Name"
                                type="text"
                                name="name"
                            />
                        </div>

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

                        

                        <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">
                            Register
                        </Button>
                    </form>

                    <div className="mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
