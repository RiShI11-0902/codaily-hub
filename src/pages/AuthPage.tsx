import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGoogleSignIn =()=>{
        const popup = window.open(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/google`,
            "_blank",
            "width=500,height=600"
        );

        window.addEventListener("message", (event) => {
            if (event.data === "auth-success") {
                window.location.href = "/dashboard";
            }
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endpoint = isLogin ? `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login` : `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/register`;
            const { data } = await axios.post(
                endpoint,
                form,
                {
                    withCredentials: true, // ✅ Important for cookies!
                }
            );

            // store token (you can use cookies instead)
            localStorage.setItem("token", data.token);

            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  text-white animate-fade-in">
            <Card className="w-full max-w-md  backdrop-blur-md border border-white/20 shadow-lg transition-all">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold gradient-heading">
                        {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
                    </CardTitle>
                    <p className="text-blue-300 text-sm mt-1">
                        {isLogin ? "Login to continue your coding journey" : "Join 2 Code Daily today!"}
                    </p>
                </CardHeader>

                <CardContent>
                    <Button
                            type="button"
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 hover:gradient-heading transition-all"
                            onClick={handleGoogleSignIn}
                        >
                            <AiOutlineGoogle className="text-xl" />
                            Continue with Google
                        </Button>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                        {!isLogin && (
                            <div>
                                <label className="text-sm gradient-heading">Name</label>
                                <Input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter your name"
                                    required={!isLogin}
                                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-sm gradient-heading">Email</label>
                            <Input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm gradient-heading">Password</label>
                            <Input
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isLogin ? (
                                "Login"
                            ) : (
                                "Register"
                            )}
                        </Button>

                        <Separator className="my-4 bg-white/20" />

                        
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center mt-4">
                    <p className="text-sm text-blue-300">
                        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-400 hover:underline font-medium ml-1"
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AuthPage;
