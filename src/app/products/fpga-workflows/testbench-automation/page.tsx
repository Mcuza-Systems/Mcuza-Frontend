'use client';

import Link from 'next/link';
import { ArrowRight, FileCode, CheckCircle, Zap, BarChart2, Code, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestbenchAutomationPage() {
  const features = [
    {
      icon: <FileCode className="h-8 w-8 text-blue-500" />,
      title: "Automated Testbench Generation",
      description: "Generate comprehensive testbenches for your HDL designs with minimal effort"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
      title: "Comprehensive Test Coverage",
      description: "Ensure thorough verification with automatically generated test cases and assertions"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Simulation Integration",
      description: "Seamless integration with popular simulation tools like ModelSim, VCS, and Vivado Simulator"
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-blue-500" />,
      title: "Coverage Analysis",
      description: "Detailed code and functional coverage reports to identify verification gaps"
    },
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Multiple HDL Support",
      description: "Support for Verilog, VHDL, and SystemVerilog designs and testbenches"
    },
    {
      icon: <Layers className="h-8 w-8 text-blue-500" />,
      title: "Hierarchical Verification",
      description: "Generate testbenches for individual modules or entire design hierarchies"
    }
  ];

  const testbenchTypes = [
    { name: "Self-Checking Testbenches", description: "Automatically verify outputs against expected results" },
    { name: "Directed Testing", description: "Specific test vectors targeting known edge cases" },
    { name: "Constrained Random Testing", description: "Randomized inputs with constraints for thorough verification" },
    { name: "Assertion-Based Verification", description: "Formal properties to verify design behavior" }
  ];

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      {/* Hero Section */}
      <div className="space-y-6 mb-12">
        <div className="space-y-2">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
            FPGA Workflows
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">Testbench Automation</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
            Accelerate your verification process with automated testbench generation for HDL designs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/products/fpga-workflows/testbench-automation/generate-testbench">
              Generate Testbench
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

      {/* Testbench Types */}
      <div className="mb-12">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <CardHeader>
            <CardTitle>Supported Testbench Types</CardTitle>
            <CardDescription>
              Generate various types of testbenches for comprehensive verification
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testbenchTypes.map((type, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-0.5 bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Workflow Steps */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Testbench Generation Workflow</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Our streamlined process makes testbench creation simple and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Upload HDL Design</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload your Verilog, VHDL, or SystemVerilog files
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
                <h3 className="font-medium mb-2">Configure Testbench</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select testbench type and verification options
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
                <h3 className="font-medium mb-2">Generate Testbench</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our system creates a comprehensive testbench for your design
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
                <h3 className="font-medium mb-2">Download & Simulate</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download your testbench and run simulations with your preferred tool
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
            <h2 className="text-2xl font-bold">Ready to accelerate your verification process?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Start generating comprehensive testbenches for your HDL designs today.
            </p>
            <div className="pt-2">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/products/fpga-workflows/testbench-automation/generate-testbench">
                  Start Generating Testbench
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