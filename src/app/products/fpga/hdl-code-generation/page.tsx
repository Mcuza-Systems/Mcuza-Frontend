'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Play, Cpu, Code, Zap, Target, Settings, BarChart3, Database, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function HDLCodeGeneration() {
  const hdlFeatures = [
    {
      name: "Verilog Generation",
      icon: "🔧",
      description: "Industry-standard Verilog HDL with optimizations",
      capabilities: ["Synthesizable Code", "Timing Constraints", "Testbenches", "Documentation"]
    },
    {
      name: "VHDL Generation",
      icon: "⚙️",
      description: "Robust VHDL code for complex digital systems",
      capabilities: ["Entity/Architecture", "Packages", "Generic Designs", "Assertions"]
    },
    {
      name: "SystemVerilog",
      icon: "🚀",
      description: "Advanced SystemVerilog for verification and design",
      capabilities: ["OOP Features", "Interfaces", "Assertions", "Coverage"]
    },
    {
      name: "High-Level Synthesis",
      icon: "🧠",
      description: "C++ to HDL conversion with optimizations",
      capabilities: ["C++ Input", "Pipeline Generation", "Memory Interfaces", "Pragmas"]
    },
    {
      name: "DSP Optimization",
      icon: "📊",
      description: "Specialized DSP and signal processing blocks",
      capabilities: ["Filter Design", "DSP Blocks", "Fixed-Point", "Pipeline"]
    },
    {
      name: "IP Integration",
      icon: "🔗",
      description: "Seamless integration with existing IP blocks",
      capabilities: ["AXI Interfaces", "Avalon Bus", "Custom Protocols", "Wrappers"]
    }
  ];

  const optimizations = [
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Resource Optimization",
      description: "Minimize LUT, FF, BRAM, and DSP usage through intelligent resource sharing and optimization."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Timing Optimization",
      description: "Achieve target clock frequencies with automatic pipeline insertion and critical path optimization."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Power Optimization",
      description: "Reduce power consumption through clock gating, operand isolation, and dynamic voltage scaling."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Memory Optimization",
      description: "Efficient memory architectures with optimized data paths and bandwidth utilization."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Area Optimization",
      description: "Minimize silicon area through resource sharing, logic optimization, and efficient architectures."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Analysis",
      description: "Detailed performance reports with bottleneck identification and optimization suggestions."
    }
  ];

  const supportedFPGAs = [
    { name: "Xilinx Zynq", logo: "🔵", family: "UltraScale+, Versal" },
    { name: "Intel Arria", logo: "🟦", family: "Stratix, Cyclone" },
    { name: "Microsemi", logo: "⚫", family: "PolarFire, IGLOO" },
    { name: "Lattice", logo: "🔶", family: "iCE40, ECP5" },
    { name: "Gowin", logo: "🔴", family: "GW1N, GW2A" },
    { name: "Efinix", logo: "🟣", family: "Trion, Titanium" }
  ];

  const stats = [
    { number: "10x", label: "Faster Development" },
    { number: "90%", label: "Resource Efficiency" },
    { number: "500MHz+", label: "Achievable Frequency" },
    { number: "50+", label: "Optimization Passes" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            🔧 FPGA Workflows
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            HDL Code Generation &
            <span className="bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent block">Optimization</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate optimized HDL code automatically from high-level specifications. Advanced algorithms ensure efficient hardware implementation and resource utilization.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 shadow-lg text-lg px-8 py-6">
            <Link href="/products/fpga/hdl-code-generation/generate-hdl">
              <Play className="mr-2 h-5 w-5" />
              Generate HDL
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
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HDL Features Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">HDL Generation Capabilities</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Support for all major HDL languages with advanced optimization</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hdlFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-purple-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {feature.capabilities.map((cap, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-purple-600/30 text-purple-300">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Optimizations Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Advanced Optimizations</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">AI-powered optimizations for maximum performance and efficiency</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {optimizations.map((opt, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
                <CardContent className="p-6">
                  <div className="text-purple-400 mb-4">{opt.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{opt.title}</h3>
                  <p className="text-gray-400">{opt.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported FPGAs Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Supported FPGA Families</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Generate optimized code for all major FPGA vendors</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedFPGAs.map((fpga, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-purple-600 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{fpga.logo}</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{fpga.name}</h3>
                  <p className="text-gray-400 text-sm">{fpga.family}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Generate Optimized HDL?
          </h2>
          <p className="text-xl mb-8 text-purple-100">Transform your high-level designs into efficient, optimized HDL code</p>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-purple-900 hover:bg-gray-100 border-0 shadow-lg">
            <Link href="/signup">
              Start HDL Generation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
