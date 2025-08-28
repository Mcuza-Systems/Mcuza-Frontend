'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, FileText, Cpu, DollarSign, Clock, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function RapidPrototyping() {
  const [projectDescription, setProjectDescription] = useState('');

  const examples = [
    "Build a smart doorbell with camera and WiFi connectivity",
    "Create a weather monitoring system with LCD display",
    "Design a motor control system for robotics applications",
    "Develop an IoT sensor node for agriculture monitoring",
    "Build a home automation hub with voice control"
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Describe Your Project",
      description: "Simply tell us what you want to build in plain English. Include details about functionality, sensors, connectivity, and any specific requirements.",
      icon: <FileText className="h-8 w-8" />
    },
    {
      step: 2,
      title: "AI Analysis & Design",
      description: "Our advanced AI analyzes your requirements and selects the optimal components, architecture, and design patterns for your project.",
      icon: <Sparkles className="h-8 w-8" />
    },
    {
      step: 3,
      title: "Get Complete Solution",
      description: "Receive production-ready firmware, detailed schematics, and a complete bill of materials with real-time pricing in minutes.",
      icon: <Zap className="h-8 w-8" />
    }
  ];

  const features = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Production-Ready Firmware",
      description: "Complete, optimized C/C++ code with proper error handling, documentation, and industry best practices."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Schematics",
      description: "Detailed circuit diagrams with component placement, routing suggestions, and design rule checks."
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Live BOM Pricing",
      description: "Real-time component pricing from multiple suppliers with availability and alternative part suggestions."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Instant Results",
      description: "Get your complete project package in under 5 minutes, from description to deployment-ready solution."
    }
  ];

  const handleExampleClick = (example: string) => {
    setProjectDescription(example);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
            🎯 Flagship Feature
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            One Prompt.
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">Rapid Prototyping.</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">Redefined.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Describe your electronics project in simple words – we'll generate complete firmware, schematics, and BOM with real-time pricing. From idea to prototype in minutes.
          </p>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Try It Now - Completely Free
            </h2>
            <p className="text-xl text-gray-300">
              Describe any electronics project and see the magic happen
            </p>
          </div>
          
          <Card className="p-8 shadow-xl border-2 border-blue-500/20 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-blue-500/25">
            <div className="space-y-6">
              <div>
                <label htmlFor="project-description" className="text-lg font-semibold mb-3 block text-white">
                  What would you like to build?
                </label>
                <textarea
                  id="project-description"
                  className="w-full p-4 border border-gray-600 bg-gray-700 text-white rounded-lg min-h-[120px] text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  placeholder="e.g., I want to build a smart home security system with motion sensors, camera integration, WiFi connectivity, and mobile app notifications. It should run on battery power and work outdoors..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button size="lg" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 shadow-lg hover:shadow-blue-500/25" disabled={!projectDescription.trim()}>
                  <Send className="mr-2 h-5 w-5" />
                  Generate My Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <span className="text-sm text-gray-400">
                  Usually takes 2-5 minutes
                </span>
              </div>
            </div>
          </Card>
          
          {/* Example Projects */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center text-white">
              Or try one of these example projects:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-left p-4 rounded-lg border border-gray-600 bg-gray-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="text-sm text-gray-400">Example {index + 1}</span>
                  <p className="font-medium text-white">{example}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How Rapid Prototyping Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform transforms your ideas into production-ready solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <Card key={index} className="relative border border-gray-700 bg-gray-800/50 shadow-lg hover:bg-gray-800/70 hover:shadow-blue-500/25 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-4 mx-auto">
                    {item.icon}
                  </div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center text-gray-300">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What You Get in Every Package
            </h2>
            <p className="text-xl text-gray-300">
              Complete solutions ready for production deployment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border border-gray-700 bg-gray-800/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:bg-gray-800/70">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Output Preview */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              See What You'll Receive
            </h2>
            <p className="text-xl text-gray-300">
              Real examples from our rapid prototyping system
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">Firmware Code</Badge>
                <CardTitle className="text-lg text-white">main.c</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm border border-gray-700">
                  <div className="text-green-600">// Auto-generated firmware</div>
                  <div className="text-blue-600">#include</div> <span className="text-orange-600">"hal_gpio.h"</span>
                  <div className="text-blue-600">#include</div> <span className="text-orange-600">"wifi_manager.h"</span>
                  <div className="mt-2 text-gray-600">...</div>
                  <div className="text-blue-600">int</div> <span className="text-purple-600">main</span>() {'{'}
                  <div className="ml-4">sensor_init();</div>
                  <div className="ml-4">wifi_connect();</div>
                  <div className="ml-4 text-gray-600">// Production-ready code</div>
                  <div>{'}'}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">Schematic</Badge>
                <CardTitle className="text-lg text-white">Circuit Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg h-48 flex items-center justify-center border border-gray-700">
                  <div className="text-center text-gray-400">
                    <Cpu className="h-16 w-16 mx-auto mb-2 text-blue-400" />
                    <p className="text-white">Professional PCB Layout</p>
                    <p className="text-sm text-gray-400">with routing suggestions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">Bill of Materials</Badge>
                <CardTitle className="text-lg text-white">Component List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white">
                    <span>ESP32-WROOM-32</span>
                    <span className="text-green-400">$4.20</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>DHT22 Sensor</span>
                    <span className="text-green-400">$3.15</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>PCB (10x10cm)</span>
                    <span className="text-green-400">$2.50</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold text-white">
                    <span>Total Cost:</span>
                    <span className="text-blue-400">$18.45</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Prices updated in real-time
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Build Your Next Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of engineers who are accelerating their development with rapid prototyping
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-blue-900 hover:bg-gray-100 border-0 shadow-lg">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
