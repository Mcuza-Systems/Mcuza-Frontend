'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Play, Cpu, Zap, Shield, RefreshCw, Code2, Target, Layers, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function PortingFirmwareMCUs() {
  const features = [
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Cross-Platform Compatibility",
      description: "Automatically adapt firmware for different MCU architectures including ARM Cortex-M, AVR, PIC, and RISC-V."
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Smart Code Translation",
      description: "AI-powered code analysis translates register mappings, peripheral configurations, and hardware abstractions."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Hardware Abstraction",
      description: "Automatically generate hardware abstraction layers (HAL) for seamless cross-platform compatibility."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Validation & Testing",
      description: "Built-in validation ensures ported firmware maintains functionality and performance standards."
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Memory Optimization",
      description: "Intelligent memory layout optimization for different MCU memory architectures and constraints."
    },
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: "Version Control Integration",
      description: "Seamless integration with Git workflows for tracking porting changes and maintaining multiple targets."
    }
  ];

  const supportedMCUs = [
    { name: "ARM Cortex-M", logo: "🏗️", variants: "M0, M3, M4, M7, M33" },
    { name: "ESP32/ESP8266", logo: "📡", variants: "WiFi, Bluetooth, IoT" },
    { name: "STM32 Series", logo: "⚡", variants: "F0, F1, F4, F7, H7" },
    { name: "Arduino", logo: "🤖", variants: "Uno, Mega, Nano" },
    { name: "PIC Microchip", logo: "🔧", variants: "PIC16, PIC18, PIC32" },
    { name: "RISC-V", logo: "🚀", variants: "SiFive, Kendryte" }
  ];

  const stats = [
    { number: "500+", label: "MCU Families Supported" },
    { number: "95%", label: "Successful Port Rate" },
    { number: "10x", label: "Faster Than Manual" },
    { number: "24/7", label: "Automated Processing" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0">
            🔄 Embedded Systems
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Porting Firmware
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent block">For MCUs</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Seamlessly port firmware across different microcontrollers. AI-powered analysis ensures compatibility and optimal performance on target hardware.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg text-lg px-8 py-6">
            <Link href="/products/embedded-systems/porting-firmware-mcus/port-firmware">
              <Play className="mr-2 h-5 w-5" />
              Start Porting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Porting Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Advanced AI algorithms handle the complexity of cross-platform firmware migration</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-emerald-600 transition-colors">
                <CardContent className="p-6">
                  <div className="text-emerald-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported MCUs Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Supported MCU Families</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Port between any of these popular microcontroller platforms</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedMCUs.map((mcu, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-emerald-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{mcu.logo}</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{mcu.name}</h3>
                  <p className="text-gray-400 text-sm">{mcu.variants}</p>
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
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Simple 4-step process to port your firmware</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Upload Source", desc: "Upload your existing firmware code and select source MCU" },
              { step: "2", title: "Select Target", desc: "Choose target MCU platform and configuration settings" },
              { step: "3", title: "AI Analysis", desc: "Our AI analyzes and translates hardware-specific code" },
              { step: "4", title: "Download Port", desc: "Get optimized firmware ready for your target MCU" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-900 to-green-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Port Your Firmware?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">Join thousands of developers who trust MCUZA for firmware porting</p>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-emerald-900 hover:bg-gray-100 border-0 shadow-lg">
            <Link href="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
