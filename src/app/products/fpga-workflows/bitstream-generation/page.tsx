'use client';

import Link from 'next/link';
import { ArrowRight, Cpu, Download, FileCode, Settings, Zap, CheckCircle, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function BitstreamGenerationPage() {
  const features = [
    {
      icon: <FileCode className="h-8 w-8 text-orange-500" />,
      title: "Automated Bitstream Generation",
      description: "Generate FPGA bitstreams directly from HDL code without manual synthesis steps"
    },
    {
      icon: <Cpu className="h-8 w-8 text-orange-500" />,
      title: "Multi-Vendor Support",
      description: "Support for Xilinx, Intel, Lattice, and other FPGA platforms with vendor-specific optimizations"
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Performance Optimization",
      description: "Automatic timing closure and optimization for maximum performance"
    },
    {
      icon: <Settings className="h-8 w-8 text-orange-500" />,
      title: "Resource Optimization",
      description: "Minimize resource utilization through advanced placement and routing techniques"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-orange-500" />,
      title: "Constraint Management",
      description: "Intuitive interface for managing timing, placement, and pin constraints"
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-orange-500" />,
      title: "Detailed Reports",
      description: "Comprehensive reports on resource utilization, timing, and power consumption"
    }
  ];

  const targetDevices = [
    { name: "Xilinx Artix/Kintex/Virtex", description: "Generate bitstreams for Xilinx FPGA families" },
    { name: "Intel Cyclone/Arria/Stratix", description: "Generate bitstreams for Intel FPGA families" },
    { name: "Lattice iCE40/ECP5", description: "Generate bitstreams for Lattice FPGA families" },
    { name: "Microsemi PolarFire", description: "Generate bitstreams for Microsemi FPGA families" }
  ];

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      {/* Hero Section */}
      <div className="space-y-6 mb-12">
        <div className="space-y-2">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800">
            FPGA Workflows
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">Bitstream Generation</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
            Generate optimized FPGA bitstreams from your HDL code with our advanced bitstream generation tool.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/products/fpga-workflows/bitstream-generation/generate-bitstream">
              Generate Bitstream
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
              <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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

      {/* Target Devices */}
      <div className="mb-12">
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30">
          <CardHeader>
            <CardTitle>Supported FPGA Devices</CardTitle>
            <CardDescription>
              Generate bitstreams for various FPGA platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetDevices.map((device, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-0.5 bg-orange-100 dark:bg-orange-900/50 p-2 rounded-md">
                  <Cpu className="h-4 w-4 text-orange-600 dark:text-orange-400" />
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
          <h2 className="text-2xl font-bold mb-2">Bitstream Generation Workflow</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Our streamlined process makes FPGA bitstream generation simple and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Upload HDL Code</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload your Verilog, VHDL, or SystemVerilog files
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Configure Target</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select your target FPGA device and set constraints
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Generate Bitstream</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our system synthesizes, places, and routes your design
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Download & Deploy</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download your bitstream file and implementation reports
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="border-0 bg-gradient-to-r from-orange-100 via-amber-100 to-orange-100 dark:from-orange-950/50 dark:via-amber-950/50 dark:to-orange-950/50">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to generate your FPGA bitstream?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Start generating optimized FPGA bitstreams for your hardware designs today.
            </p>
            <div className="pt-2">
              <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/products/fpga-workflows/bitstream-generation/generate-bitstream">
                  Start Generating Bitstream
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