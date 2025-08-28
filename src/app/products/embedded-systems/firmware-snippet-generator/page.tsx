'use client';

import Link from 'next/link';
import { ArrowRight, Code, Zap, Play, Clock, FileText, Cpu, Shield, Settings, BookOpen, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function FirmwareSnippetGenerator() {
  const snippetCategories = [
    {
      name: "GPIO Control",
      icon: "⚡",
      description: "Digital I/O, PWM, interrupt handling",
      snippets: ["GPIO Init", "PWM Control", "External Interrupts", "Pin Toggle"]
    },
    {
      name: "Communication",
      icon: "📡",
      description: "UART, SPI, I2C implementations",
      snippets: ["UART Setup", "SPI Master/Slave", "I2C Scanner", "Protocol Handlers"]
    },
    {
      name: "Timers & Delays",
      icon: "⏱️",
      description: "Hardware timers, delays, scheduling",
      snippets: ["Timer Config", "Non-blocking Delays", "Task Scheduler", "Watchdog"]
    },
    {
      name: "ADC & Sensors",
      icon: "📊",
      description: "Analog readings, sensor interfaces",
      snippets: ["ADC Reading", "Sensor Calibration", "Signal Processing", "Data Filtering"]
    },
    {
      name: "Power Management",
      icon: "🔋",
      description: "Sleep modes, power optimization",
      snippets: ["Sleep Modes", "Clock Management", "Low Power", "Wake Sources"]
    },
    {
      name: "Memory Management",
      icon: "💾",
      description: "Flash, EEPROM, RAM utilities",
      snippets: ["Flash Write", "EEPROM Access", "Memory Pool", "Data Structures"]
    }
  ];

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Smart Code Generation",
      description: "AI-powered snippets that follow best practices and are optimized for your target MCU."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Complete Documentation",
      description: "Every snippet comes with detailed comments, usage examples, and parameter descriptions."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Error Handling",
      description: "Built-in error checking, bounds validation, and graceful failure handling."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Configurable Parameters",
      description: "Easily customizable snippets with clear configuration options for different use cases."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-time Optimized",
      description: "Code snippets designed for real-time systems with predictable execution times."
    },
    {
      icon: <Copy className="h-8 w-8" />,
      title: "One-click Integration",
      description: "Copy snippets directly to your IDE or download as organized project files."
    }
  ];

  const stats = [
    { number: "1000+", label: "Code Snippets" },
    { number: "50+", label: "MCU Families" },
    { number: "<1s", label: "Generation Time" },
    { number: "99%", label: "Compile Success" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-green-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-teal-600 to-green-600 text-white border-0">
            ⚡ Embedded Systems
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Firmware Snippet
            <span className="bg-gradient-to-r from-teal-400 to-green-300 bg-clip-text text-transparent block">Generator</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate optimized firmware code snippets instantly. Get ready-to-use functions for common embedded tasks with proper error handling and documentation.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 border-0 shadow-lg text-lg px-8 py-6">
            <Play className="mr-2 h-5 w-5" />
            Generate Snippets
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snippet Categories Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Snippet Categories</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Browse our extensive library of firmware code snippets for common embedded tasks</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {snippetCategories.map((category, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-teal-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{category.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {category.snippets.map((snippet, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-teal-600/30 text-teal-300">
                        {snippet}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Smart Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Advanced AI ensures every snippet is production-ready and optimized</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-teal-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                  <Button asChild size="lg" className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 border-0 shadow-lg text-lg px-8 py-6 mt-4">
                    <Link href="/products/embedded-systems/firmware-snippet-generator/generate-snippet">
                      <Play className="mr-2 h-5 w-5" />
                      Generate Snippet
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Generate firmware snippets in seconds</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Select Function", desc: "Choose from 1000+ firmware functions and utilities", icon: <BookOpen className="h-6 w-6" /> },
              { step: "2", title: "Configure", desc: "Customize parameters for your specific MCU and requirements", icon: <Settings className="h-6 w-6" /> },
              { step: "3", title: "Generate", desc: "AI creates optimized code with documentation and error handling", icon: <Zap className="h-6 w-6" /> },
              { step: "4", title: "Integrate", desc: "Copy to clipboard or download as project-ready files", icon: <Download className="h-6 w-6" /> }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">{item.icon}</div>
                </div>
                <div className="text-sm font-bold text-teal-400 mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-900 to-green-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Accelerate Your Development?
          </h2>
          <p className="text-xl mb-8 text-teal-100">Join thousands of embedded developers who save hours with our snippet generator</p>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-teal-900 hover:bg-gray-100 border-0 shadow-lg">
            <Link href="/signup">
              Start Generating Code
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
