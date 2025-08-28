'use client';

import Link from 'next/link';
import { ArrowRight, Code, Cpu, Zap, Settings, CheckCircle, BarChart2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function HDLCodeGenerationPage() {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Automated HDL Generation",
      description: "Generate optimized Verilog or VHDL code from high-level specifications"
    },
    {
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
      title: "Multi-Platform Support",
      description: "Target Xilinx, Intel, Lattice, and other FPGA platforms with device-specific optimizations"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Performance Optimization",
      description: "Automatic timing analysis and optimization for maximum clock frequency"
    },
    {
      icon: <Settings className="h-8 w-8 text-blue-500" />,
      title: "Resource Efficiency",
      description: "Minimize LUT, FF, BRAM, and DSP usage through advanced optimization techniques"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
      title: "Design Rule Checking",
      description: "Automatic verification against common HDL design pitfalls and best practices"
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-blue-500" />,
      title: "Performance Analysis",
      description: "Detailed reports on resource utilization, timing, and power consumption"
    }
  ];

  const hdlTypes = [
    { name: "Verilog", description: "Industry-standard hardware description language" },
    { name: "VHDL", description: "IEEE standard hardware description language" },
    { name: "SystemVerilog", description: "Extended Verilog with verification capabilities" },
    { name: "High-Level Synthesis", description: "C/C++ to HDL conversion" }
  ];

  const targetDevices = [
    { name: "Xilinx Artix/Kintex/Virtex", description: "Optimized for Xilinx FPGA families" },
    { name: "Intel Cyclone/Arria/Stratix", description: "Optimized for Intel FPGA families" },
    { name: "Lattice iCE40/ECP5", description: "Optimized for Lattice FPGA families" },
    { name: "Microsemi PolarFire", description: "Optimized for Microsemi FPGA families" }
  ];

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      {/* Hero Section */}
      <div className="space-y-6 mb-12">
        <div className="space-y-2">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
            FPGA Workflows
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">HDL Code Generation & Optimization</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
            Generate optimized HDL code for your FPGA designs with our advanced code generation and optimization tool.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/products/fpga-workflows/hdl-code-generation/generate-hdl">
              Generate HDL Code
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">
              Explore Features
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Features */}
      <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* HDL Types and Target Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <CardHeader>
            <CardTitle>Supported HDL Types</CardTitle>
            <CardDescription>
              Generate code in various hardware description languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hdlTypes.map((type, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-0.5 bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                  <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
          <CardHeader>
            <CardTitle>Target FPGA Devices</CardTitle>
            <CardDescription>
              Optimized code generation for various FPGA platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {targetDevices.map((device, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
                  <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-medium">{device.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{device.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Workflow Steps */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">HDL Generation Workflow</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Our streamlined process makes HDL code generation simple and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Specify Requirements</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Define your design requirements and target FPGA platform
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Configure Options</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Set optimization goals and design constraints
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Generate Code</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our AI generates optimized HDL code based on your specifications
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Review & Download</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Review generated code, performance metrics, and download your files
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="border-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-blue-950/50">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to generate optimized HDL code?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Start generating high-performance, resource-efficient HDL code for your FPGA designs today.
            </p>
            <div className="pt-2">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/products/fpga-workflows/hdl-code-generation/generate-hdl">
                  Start Generating HDL Code
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}