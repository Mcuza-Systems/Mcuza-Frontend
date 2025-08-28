'use client';
'use client';

import Link from 'next/link';
import { ArrowLeft, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GenerateTestbench() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <section className="py-6 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
            <Link href="/products/fpga/testbench-automation">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Overview
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">Testbench Automation</h1>
        </div>
        <Badge className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0">Testbench Generator</Badge>
      </section>
      <section className="py-20 px-4 bg-gray-900/30 flex-1">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Generate Your FPGA Testbench</h2>
          <p className="text-lg text-gray-300 mb-8 text-center">Select your design type, configure test options, and let our AI generate comprehensive testbench code for your hardware.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 1: Select Design Type</CardTitle>
                <CardDescription className="text-gray-400">Choose your HDL design type.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-teal-400 border-teal-400">Verilog</Button>
                  <Button variant="outline" className="text-cyan-400 border-cyan-400">VHDL</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">SystemVerilog</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">Mixed-Signal</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 2: Configure Test Options</CardTitle>
                <CardDescription className="text-gray-400">Set simulation, coverage, and reporting options.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-teal-400 border-teal-400">Simulation</Button>
                  <Button variant="outline" className="text-cyan-400 border-cyan-400">Coverage</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">Assertions</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">Reporting</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 border-0 shadow-lg text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Generate Testbench
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Generation Status</CardTitle>
                <CardDescription className="text-gray-400">See progress and results of your testbench generation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Play className="text-teal-400" />
                    <span className="text-white">Simulation in progress...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="text-cyan-400" />
                    <span className="text-white">Coverage analysis...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="text-blue-400" />
                    <span className="text-white">Assertions checking...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="text-green-400" />
                    <span className="text-white">Reporting...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Generated Testbench Preview</CardTitle>
                <CardDescription className="text-gray-400">Preview the auto-generated testbench code for your configuration.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                  <pre className="text-sm text-gray-300">
{`// Example Testbench Code\nmodule tb_counter;\n  reg clk, rst;\n  wire [7:0] count;\n\n  counter uut (\n    .clk(clk),\n    .rst(rst),\n    .count(count)\n  );\n\n  initial begin\n    clk = 0; rst = 1;\n    #10 rst = 0;\n    repeat (100) #5 clk = ~clk;\n  end\nendmodule\n`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
