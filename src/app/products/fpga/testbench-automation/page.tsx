'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TestbenchAutomation() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0">
            🧪 FPGA Workflows
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Test Bench
            <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent block">Automation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Automated test bench generation and verification for FPGA designs. Comprehensive testing frameworks ensure robust and reliable hardware implementations.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 border-0 shadow-lg text-lg px-8 py-6">
            <Link href="/products/fpga/testbench-automation/generate-testbench">
              <Play className="mr-2 h-5 w-5" />
              Generate Test Bench
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-teal-900 to-cyan-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Automating Tests
          </h2>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-teal-900 hover:bg-gray-100 border-0 shadow-lg">
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
