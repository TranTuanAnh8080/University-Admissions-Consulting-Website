import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate, } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [searchParams] = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!fullName) newErrors.fullName = "Please fill out this field";
        if (!email) newErrors.email = "Please fill out this field";
        else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setIsLoading(true);
        const token = localStorage.getItem('token'); // Get token when making request

        try {
            const response = await axios.post(
                'http://localhost:8080/user/register',
                {
                    email: email.trim(),
                    fullName: fullName.trim(),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Registration response:', response);

            if (response.status === 200) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(true);
                    setEmail('');
                    setFullName('');
                    navigate('/login'); // or wherever you want to redirect
                }, 2000);
            }
        } catch (error) {
            console.error('Registration error:', error);

            if (error.response?.status === 401) {
                setErrorMessage("Unauthorized. Please login again.");
                navigate('/login');
            } else if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Registration failed. Please try again.");
            }

            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setIsLoading(false);
        }
    };




    const handleEmailVerification = async (token) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/user/confirm?token=${token}`
            );

            if (response.status === 200) {
                setVerificationStatus('success');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (error) {
            setVerificationStatus('error');
        }
    };

    // Check for verification token on component mount
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            handleEmailVerification(token);
        }
    }, [searchParams]);



    // If in verification mode, show verification status
    if (verificationStatus) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
                    {verificationStatus === 'success' ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-800">Email verification successful!</h2>
                            <p className="mt-2 text-gray-600">Redirecting to login page...</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-800">Verification failed!</h2>
                            <p className="mt-2 text-red-600">Invalid or expired verification link.</p>
                            <button
                                onClick={() => navigate('/login')}
                                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
            {/* Background Image */}


            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-100 contrast-150 saturate-200"
                style={{
                    backgroundImage: `url('https://vinaconex25.com.vn/wp-content/uploads/2020/06/1.jpg')`
                }}
            />

            {showSuccess && (
                <div className="fixed top-6 right-6 z-50">
                    <div className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in-down">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Tạo tài khoản thành công!
                    </div>
                </div>
            )}

            {showError && (
                <div className="fixed top-6 right-6 z-50">
                    <div className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {errorMessage}
                    </div>
                </div>
            )}
            {/* Login Form Container */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95 w-full max-w-lg mx-auto">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex space-x-1">
                            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                                <span className="text-white font-bold text-sm">T</span>
                            </div>
                        </div>
                        <span className="ml-2 text-blue-600 font-semibold">Education</span>
                    </div>
                    <h1 className="text-2xl font-bold text-orange-500 mb-2">TRƯỜNG ĐẠI HỌC FPT</h1>
                </div>
                <form className="space-y-6" onSubmit={handleRegister}>

                    {/* Email */}
                    <div>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                            placeholder="Email"

                        />
                        {errors.email && (
                            <div className="mt-2 text-red-500 text-sm flex items-center font-serif">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 text-gray-700"
                            placeholder="Username"

                        />
                        {errors.fullName && (
                            <div className="mt-2 text-red-500 text-sm flex items-center font-serif">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.fullName}
                            </div>
                        )}
                    </div>
                    {errors.submit && (
                        <div className="text-red-500 text-sm text-center">
                            {errors.submit}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;