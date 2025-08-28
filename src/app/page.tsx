'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Code, Cpu, Brain, Settings, CheckCircle, Star, Users, TrendingUp, Clock, FileText, Github, BookOpen, Terminal, Play, Folder, File, Monitor, AlertCircle, Command, ChevronDown, Layers, Rocket, Shield, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "AI-Powered Code Generation",
      description: "Generate optimized firmware, HAL drivers, and protocol implementations with intelligent AI assistance."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "MCU Compatibility",
      description: "Support for 100+ microcontrollers with automatic porting and optimization for your target platform."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Edge AI Integration",
      description: "Deploy and optimize machine learning models for edge devices with automatic compression and validation."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "FPGA Workflows",
      description: "Complete HDL generation, bitstream creation, and automated testbench development for FPGA projects."
    }
  ];

  const techFeatures = [
    {
      title: "Open Source Collaboration",
      description: "Contribute to our growing library of drivers, HAL implementations, and firmware modules. Join a community of engineers building the future together."
    },
    {
      title: "Cross-Platform Compatibility",
      description: "Our tools work seamlessly across major operating systems and development environments. Use your preferred IDE or workflow."
    },
    {
      title: "Extensive MCU Support",
      description: "From popular ARM Cortex-M series to specialized RISC-V processors, we support a wide range of microcontrollers across different architectures."
    },
    {
      title: "Community Driven",
      description: "Regular hackathons, challenges, and community events to solve real-world electronics problems together."
    }
  ];

  const useCases = [
    {
      title: "Research & Education",
      description: "Perfect for academic research, teaching embedded systems, and student projects. Accelerate learning with AI-assisted development.",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "IoT Development",
      description: "Build connected devices and IoT solutions quickly with ready-to-use protocol implementations and sensor integrations.",
      icon: <Cpu className="h-6 w-6" />
    },
    {
      title: "Robotics & Automation",
      description: "Develop control systems, motor drivers, and sensor fusion algorithms for robotics applications.",
      icon: <Settings className="h-6 w-6" />
    },
    {
      title: "Medical Devices",
      description: "Prototype medical and healthcare electronics with precision and reliability. Focus on innovation while we handle the implementation.",
      icon: <Brain className="h-6 w-6" />
    }
  ];

  const contributions = [
    {
      title: "Driver Repository",
      description: "Contribute to our open-source driver repository for various sensors, actuators, and peripherals."
    },
    {
      title: "Educational Resources",
      description: "Share your knowledge through tutorials, workshops, and documentation to help others learn."
    },
    {
      title: "Testing & Validation",
      description: "Help improve our tools by testing implementations on different hardware and providing feedback."
    },
    {
      title: "Code Optimization",
      description: "Contribute optimizations for specific MCUs or applications to improve performance and efficiency."
    }
  ];

  return (
    <div className="flex flex-col bg-[#0a0a0a] text-white min-h-screen">
      {/* Professional Hero Section */}
      <section className="relative py-28 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a] overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,65,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(64,224,208,0.05),transparent_60%)]" />
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-[#00ff41]/3 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#40e0d0]/3 rounded-full blur-3xl animate-pulse-slow" />
        </div>
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="container mx-auto relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Professional Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111]/80 border border-[#00ff41]/20 rounded-full backdrop-blur-sm">
                <Zap className="w-3.5 h-3.5 text-[#00ff41]" />
                <span className="text-[#00ff41] font-medium text-sm tracking-wide">AI-Powered Electronics Platform</span>
              </div>
            </div>
            
            {/* Refined Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="block bg-gradient-to-r from-white via-[#00ff41]/90 to-[#40e0d0]/90 bg-clip-text text-transparent">
                Accelerate Your Electronics
              </span>
              <span className="block bg-gradient-to-r from-[#40e0d0]/90 via-white to-white bg-clip-text text-transparent mt-2">
                Innovation with AI
              </span>
            </h1>
            
            {/* Professional Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              The industry-leading platform for embedded systems, edge AI, and FPGA development.
              Leverage intelligent code generation to transform concepts into production-ready solutions.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 w-full max-w-xl">
              <Link href="/rapid-prototyping" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff41]/80 to-[#40e0d0]/80 rounded-lg opacity-70 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                <div className="relative w-full px-6 py-3.5 bg-[#0a0a0a] border border-[#00ff41]/30 rounded-lg flex items-center justify-center gap-3 group-hover:bg-[#0f0f0f] transition-colors">
                  <Play className="w-4 h-4 text-[#00ff41]" />
                  <span className="text-white font-medium">Start Building Now</span>
                  <ArrowRight className="w-4 h-4 text-[#00ff41] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link href="/docs" className="group w-full sm:w-auto px-6 py-3.5 border border-gray-800 rounded-lg hover:border-[#40e0d0]/40 hover:bg-[#40e0d0]/5 transition-all duration-300 flex items-center justify-center gap-3">
                <Monitor className="w-4 h-4 text-[#40e0d0]" />
                <span className="text-white font-medium">View Documentation</span>
              </Link>
            </div>
            
            {/* Professional Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-baseline">
                  <span className="text-[#00ff41]">1000</span>
                  <span className="text-[#00ff41]">+</span>
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                  MCU Types Supported
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-baseline">
                  <span className="text-[#40e0d0]">99.8</span>
                  <span className="text-[#40e0d0]">%</span>
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                  Code Accuracy Rate
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-baseline">
                  <span className="text-[#ff6b35]">50</span>
                  <span className="text-[#ff6b35]">x</span>
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                  Faster Development
                </div>
              </div>
            </div>
          </div>
          
          {/* Professional Feature Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="group p-6 bg-[#111]/60 border border-gray-800 rounded-lg hover:border-[#00ff41]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff41]/5">
              <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 flex items-center justify-center mb-5">
                <Code className="w-5 h-5 text-[#00ff41]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">AI Code Generation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Generate optimized firmware and drivers with intelligent AI assistance for any microcontroller platform.</p>
            </div>
            
            <div className="group p-6 bg-[#111]/60 border border-gray-800 rounded-lg hover:border-[#40e0d0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#40e0d0]/5">
              <div className="w-10 h-10 rounded-lg bg-[#40e0d0]/10 flex items-center justify-center mb-5">
                <Brain className="w-5 h-5 text-[#40e0d0]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Edge AI Integration</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Deploy and optimize machine learning models for edge devices with automatic compression and validation.</p>
            </div>
            
            <div className="group p-6 bg-[#111]/60 border border-gray-800 rounded-lg hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6b35]/5">
              <div className="w-10 h-10 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center mb-5">
                <Zap className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Rapid Prototyping</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Transform concepts into working prototypes in minutes instead of months with our streamlined development tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111]/80 border border-[#00ff41]/20 rounded-full backdrop-blur-sm mb-4">
              <Cpu className="w-3.5 h-3.5 text-[#00ff41]" />
              <span className="text-[#00ff41] font-medium text-xs tracking-wide">ADVANCED CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#00ff41]/90 to-[#40e0d0]/90 bg-clip-text text-transparent">
              Built for Modern Electronics Development
            </h2>
            <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto font-light">
              Advanced AI-powered tools designed for engineers, researchers, and innovators who demand precision and efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techFeatures.map((feature, index) => (
              <Card key={index} className="border border-gray-800 shadow-xl hover:shadow-2xl hover:shadow-[#00ff41]/10 transition-all duration-300 bg-[#111]/60 hover:border-[#00ff41]/30 group">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white group-hover:text-[#00ff41] transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-300/90 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Powerful Tools for Modern Electronics
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to build, test, and deploy electronics projects with AI assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-800 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-300 transition-colors">{feature.title}</CardTitle>
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

      {/* Complete Product Suite */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111]/80 border border-[#40e0d0]/20 rounded-full backdrop-blur-sm mb-4">
              <Layers className="w-3.5 h-3.5 text-[#40e0d0]" />
              <span className="text-[#40e0d0] font-medium text-xs tracking-wide">COMPREHENSIVE TOOLS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#40e0d0]/90 to-[#00ff41]/90 bg-clip-text text-transparent">
              Complete Product Suite
            </h2>
            <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto font-light">
              Explore our comprehensive suite of professional tools designed for every aspect of modern electronics development.
            </p>
          </div>
          
          <Tabs defaultValue="embedded" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-[#111]/80 border border-gray-800 rounded-lg overflow-hidden">
              <TabsTrigger 
                value="embedded" 
                className="data-[state=active]:bg-[#00ff41]/10 data-[state=active]:text-[#00ff41] py-3 text-sm font-medium"
              >
                <Cpu className="w-4 h-4 mr-2" />
                Embedded Systems
              </TabsTrigger>
              <TabsTrigger 
                value="edge_ai" 
                className="data-[state=active]:bg-[#40e0d0]/10 data-[state=active]:text-[#40e0d0] py-3 text-sm font-medium"
              >
                <Brain className="w-4 h-4 mr-2" />
                Edge AI
              </TabsTrigger>
              <TabsTrigger 
                value="fpga" 
                className="data-[state=active]:bg-[#ff6b35]/10 data-[state=active]:text-[#ff6b35] py-3 text-sm font-medium"
              >
                <Workflow className="w-4 h-4 mr-2" />
                FPGA Workflows
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="embedded" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#00ff41]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff41]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 flex items-center justify-center mb-5">
                    <Code className="w-5 h-5 text-[#00ff41]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00ff41] transition-colors">MCU Code Generator</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Generate optimized C/C++ code for any microcontroller with our AI assistant.
                  </p>
                  <Link href="/products/mcu-code-generator" className="text-[#00ff41] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#00ff41]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff41]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 flex items-center justify-center mb-5">
                    <Zap className="w-5 h-5 text-[#00ff41]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00ff41] transition-colors">Peripheral Wizard</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Configure and generate drivers for any MCU peripheral with intelligent optimization.
                  </p>
                  <Link href="/products/peripheral-wizard" className="text-[#00ff41] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#00ff41]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff41]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 flex items-center justify-center mb-5">
                    <Workflow className="w-5 h-5 text-[#00ff41]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00ff41] transition-colors">Embedded IDE</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    A complete development environment with AI-powered features for embedded systems.
                  </p>
                  <Link href="/products/embedded-ide" className="text-[#00ff41] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="edge_ai" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#40e0d0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#40e0d0]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#40e0d0]/10 flex items-center justify-center mb-5">
                    <Brain className="w-5 h-5 text-[#40e0d0]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#40e0d0] transition-colors">Model Optimizer</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Compress and optimize ML models for deployment on resource-constrained edge devices.
                  </p>
                  <Link href="/products/model-optimizer" className="text-[#40e0d0] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#40e0d0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#40e0d0]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#40e0d0]/10 flex items-center justify-center mb-5">
                    <Code className="w-5 h-5 text-[#40e0d0]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#40e0d0] transition-colors">Edge Runtime</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Efficient runtime environment for executing ML models on various edge hardware platforms.
                  </p>
                  <Link href="/products/edge-runtime" className="text-[#40e0d0] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#40e0d0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#40e0d0]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#40e0d0]/10 flex items-center justify-center mb-5">
                    <Workflow className="w-5 h-5 text-[#40e0d0]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#40e0d0] transition-colors">Edge AI Studio</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    End-to-end environment for developing, optimizing, and deploying edge AI applications.
                  </p>
                  <Link href="/products/edge-ai-studio" className="text-[#40e0d0] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fpga" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6b35]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center mb-5">
                    <Code className="w-5 h-5 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">HDL Generator</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    AI-assisted generation of optimized Verilog and VHDL code for FPGA designs.
                  </p>
                  <Link href="/products/hdl-generator" className="text-[#ff6b35] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6b35]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center mb-5">
                    <Workflow className="w-5 h-5 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">Synthesis Optimizer</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Automatically optimize FPGA synthesis parameters for better performance and resource utilization.
                  </p>
                  <Link href="/products/synthesis-optimizer" className="text-[#ff6b35] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-6 hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6b35]/5 group">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center mb-5">
                    <Cpu className="w-5 h-5 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">FPGA Studio</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Complete environment for FPGA development with AI-assisted design and optimization tools.
                  </p>
                  <Link href="/products/fpga-studio" className="text-[#ff6b35] flex items-center gap-2 group text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Rapid Prototyping Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              🎯 Our Flagship Feature
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              One Prompt. Rapid Prototyping. Redefined.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Describe your project in simple words – we'll handle the rest. Get complete solutions in minutes, not months.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Auto-Generated Firmware</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Complete, production-ready firmware tailored to your specific requirements and hardware configuration.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle>Complete Bill of Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Real-time pricing and availability for all components, with direct supplier links and alternative suggestions.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Settings className="h-6 w-6" />
                </div>
                <CardTitle>Ready-to-Use Schematic</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Professional-grade schematics with proper component placement, routing suggestions, and design rule checks.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/rapid-prototyping">
                Try Rapid Prototyping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111]/80 border border-[#ff6b35]/20 rounded-full backdrop-blur-sm mb-4">
              <Zap className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span className="text-[#ff6b35] font-medium text-xs tracking-wide">INDUSTRY SOLUTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#ff6b35]/90 to-[#00ff41]/90 bg-clip-text text-transparent">
              Powering Innovation Across Industries
            </h2>
            <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto font-light">
              See how MCUZA is transforming electronics development in various sectors with professional-grade tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-8 hover:border-[#00ff41]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff41]/5 group">
              <div className="w-12 h-12 rounded-lg bg-[#00ff41]/10 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-[#00ff41]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00ff41] transition-colors">Industrial Automation</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Accelerate development of industrial controllers, PLCs, and smart sensors with our AI-powered tools.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00ff41] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Reduced time-to-market by 60%</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00ff41] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Enhanced reliability and safety</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00ff41] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Seamless integration with existing systems</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-8 hover:border-[#40e0d0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#40e0d0]/5 group">
              <div className="w-12 h-12 rounded-lg bg-[#40e0d0]/10 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-[#40e0d0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#40e0d0] transition-colors">Medical Devices</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Develop cutting-edge medical devices with our specialized tools for healthcare applications.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#40e0d0] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Compliant with medical standards</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#40e0d0] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Enhanced diagnostic capabilities</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#40e0d0] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Optimized for low power consumption</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#111]/60 border border-gray-800 rounded-lg p-8 hover:border-[#ff6b35]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6b35]/5 group">
              <div className="w-12 h-12 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#ff6b35] transition-colors">Aerospace & Defense</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Build mission-critical systems with our high-reliability tools for aerospace applications.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">DO-178C compliant development</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Fault-tolerant system design</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Advanced verification and validation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Contribution Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Join Our Community of Innovators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MCUZA is more than a platform—it's a collaborative ecosystem where engineers share knowledge, contribute code, and shape the future of electronics development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {contributions.map((contribution, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{contribution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {contribution.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl">
              <Github className="h-8 w-8 text-gray-700" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Open Source Collaboration</div>
                <div className="text-gray-600">Contribute to our repositories and help build the future</div>
              </div>
              <Button asChild className="ml-4">
                <Link href="https://github.com/mcuza" target="_blank">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-[#0a0a0a] border-t border-gray-800/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111]/80 border border-[#00ff41]/20 rounded-full backdrop-blur-sm mb-6">
            <Rocket className="w-3.5 h-3.5 text-[#00ff41]" />
            <span className="text-[#00ff41] font-medium text-xs tracking-wide">GET STARTED TODAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#00ff41]/90 to-[#40e0d0]/90 bg-clip-text text-transparent">
            Ready to Transform Your Electronics Development?
          </h2>
          <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto mb-10 font-light">
            Join thousands of engineers and companies who are accelerating their development with MCUZA's professional tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button size="lg" className="bg-[#00ff41] hover:bg-[#00ff41]/90 text-black font-medium px-8 py-6 h-auto text-base shadow-lg shadow-[#00ff41]/20 border-0">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-white/5 font-medium px-8 py-6 h-auto text-base">
              Schedule Demo
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">No credit card required</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
