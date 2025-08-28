'use client';

import Link from 'next/link';
import { ArrowLeft, Play, Code, Cpu, Clock, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GenerateHDL() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <section className="py-6 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
            <Link href="/products/fpga/hdl-code-generation">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Overview
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">HDL Code Generation</h1>
        </div>
        <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">HDL Generator</Badge>
      </section>
      <section className="py-20 px-4 bg-gray-900/30 flex-1">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Generate Your HDL Code</h2>
          <p className="text-lg text-gray-300 mb-8 text-center">Select HDL type, configure options, and let our AI generate optimized HDL code for your FPGA project.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 1: Select HDL Type</CardTitle>
                <CardDescription className="text-gray-400">Choose the HDL language to generate.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-indigo-400 border-indigo-400">Verilog</Button>
                  <Button variant="outline" className="text-violet-400 border-violet-400">VHDL</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">SystemVerilog</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">High-Level Synthesis</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 2: Configure Options</CardTitle>
                <CardDescription className="text-gray-400">Set optimization and resource options.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-indigo-400 border-indigo-400">Resource Optimization</Button>
                  <Button variant="outline" className="text-violet-400 border-violet-400">Timing Optimization</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">Power Optimization</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">Memory Optimization</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 shadow-lg text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Generate HDL Code
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Generation Status</CardTitle>
                <CardDescription className="text-gray-400">See progress and results of your HDL code generation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Code className="text-indigo-400" />
                    <span className="text-white">AI is preparing your HDL code...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="text-violet-400" />
                    <span className="text-white">Resource optimization...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-blue-400" />
                    <span className="text-white">Timing optimization...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="text-green-400" />
                    <span className="text-white">Power optimization...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Generated HDL Preview</CardTitle>
                <CardDescription className="text-gray-400">Preview the auto-generated HDL code for your configuration.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                  <pre className="text-sm text-gray-300">
{`// Example HDL Code
module counter (
  input clk,
  input rst,
  output reg [7:0] count
);

always @(posedge clk or posedge rst) begin
  if (rst)
    count <= 0;
  else
    count <= count + 1;
end
endmodule
`}
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
