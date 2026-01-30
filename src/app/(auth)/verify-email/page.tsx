"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/firebase/auth-context";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2, MailCheck, RefreshCcw } from "lucide-react";
import { auth } from "@/lib/firebase/client";

export default function VerifyEmailPage() {
    const { user, loading } = useAuth();
    const [resending, setResending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
    }

    if (!user) {
        router.replace("/login");
        return null;
    }

    if (user.emailVerified) {
        router.replace("/");
        return null;
    }

    const handleResendInfo = async () => {
        setResending(true);
        setMessage(null);
        try {
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
                setMessage("Verification email sent! Please check your inbox.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to send email. Please try again later.");
        } finally {
            setResending(false);
        }
    };

    const checkVerification = async () => {
        setVerifying(true);
        try {
            if (auth.currentUser) {
                await auth.currentUser.reload();
                if (auth.currentUser.emailVerified) {
                    router.replace("/");
                } else {
                    setMessage("Email not verified yet.");
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                        <MailCheck className="h-6 w-6 text-blue-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
                    <p className="text-gray-600 mb-6">
                        We&apos;ve sent a verification email to <strong>{user.email}</strong>.<br />
                        Please click the link in the email to verify your account.
                    </p>

                    {message && (
                        <div className={`text-sm p-2 rounded mb-4 ${message.includes("sent") ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                            {message}
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            onClick={checkVerification}
                            disabled={verifying}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all"
                        >
                            {verifying ? <Loader2 className="animate-spin h-5 w-5" /> : "I've verified my email"}
                        </button>

                        <button
                            onClick={handleResendInfo}
                            disabled={resending}
                            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            {resending ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <RefreshCcw className="h-4 w-4 mr-2" />}
                            Resend verification email
                        </button>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                        <button onClick={() => auth.signOut()} className="text-blue-600 hover:underline">
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
