'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup submitted:', formData);
  };

  const features = [
    "5 free projects every month",
    "Access to basic AI code generation",
    "Community support and resources",
    "Standard MCU library (20+ controllers)",
    "Basic firmware templates",
    "Project examples and tutorials"
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-gray-900 to-cyan-600/10"></div>
      <div className="relative max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Benefits */}
        <div className="space-y-8">
          <div>
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
              🚀 Join MCUZA Today
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Start Building
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">Electronics Faster</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join thousands of engineers, hobbyists, and students who are accelerating their electronics development with AI-powered tools.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">What you get for free:</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h4 className="font-semibold mb-2 text-white">Ready to upgrade?</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get unlimited projects, advanced AI features, and priority support with our Professional plan.
            </p>
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300 hover:underline text-sm font-medium">
              View pricing plans →
            </Link>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <Card className="shadow-xl border border-gray-700 bg-gray-800/50">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Create your account</CardTitle>
            <CardDescription className="text-gray-400">
              Get started with your free MCUZA account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700" size="lg">
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700" size="lg">
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 shadow-lg" size="lg">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center text-sm text-gray-400">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline">
                Privacy Policy
              </Link>
            </div>

            <Separator className="border-gray-600" />

            <div className="text-center text-sm text-white">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
                Sign in instead
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
