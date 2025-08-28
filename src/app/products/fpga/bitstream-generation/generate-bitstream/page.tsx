'use client';

import Link from 'next/link';
import { ArrowLeft, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GenerateBitstream() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <section className="py-6 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
            <Link href="/products/fpga/bitstream-generation">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Overview
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">Bitstream Generation</h1>
        </div>
        <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">Bitstream Generator</Badge>
      </section>
      <section className="py-20 px-4 bg-gray-900/30 flex-1">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Generate Your FPGA Bitstream</h2>
          <p className="text-lg text-gray-300 mb-8 text-center">Select your FPGA family, configure synthesis options, and let our AI generate optimized bitstream files for your hardware.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 1: Select FPGA Family</CardTitle>
                <CardDescription className="text-gray-400">Choose your FPGA vendor and device.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-indigo-400 border-indigo-400">Xilinx</Button>
                  <Button variant="outline" className="text-violet-400 border-violet-400">Intel</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">Lattice</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">Microsemi</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Step 2: Configure Synthesis</CardTitle>
                <CardDescription className="text-gray-400">Set synthesis, place-and-route, and timing options.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="text-indigo-400 border-indigo-400">Synthesis</Button>
                  <Button variant="outline" className="text-violet-400 border-violet-400">Place & Route</Button>
                  <Button variant="outline" className="text-blue-400 border-blue-400">Timing Analysis</Button>
                  <Button variant="outline" className="text-green-400 border-green-400">Bitstream Export</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 shadow-lg text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Generate Bitstream
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Generation Status</CardTitle>
                <CardDescription className="text-gray-400">See progress and results of your bitstream generation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Play className="text-indigo-400" />
                    <span className="text-white">Synthesis in progress...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="text-violet-400" />
                    <span className="text-white">Place-and-route...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="text-blue-400" />
                    <span className="text-white">Timing analysis...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="text-green-400" />
                    <span className="text-white">Bitstream export...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Generated Bitstream Preview</CardTitle>
                <CardDescription className="text-gray-400">Preview the auto-generated bitstream details.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                  <pre className="text-sm text-gray-300">
{`// Example Bitstream Info
Device: Xilinx Zynq-7000
Synthesis: Complete
Place & Route: Complete
Timing: Met
Bitstream: Exported
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
