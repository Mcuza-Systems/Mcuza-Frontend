'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BitstreamGeneration() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">
            ⚡ FPGA Workflows
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            BitStream
            <span className="bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent block">Generation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Automated bitstream generation for FPGA deployment. Streamlined synthesis, place-and-route, and timing optimization for faster development cycles.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 border-0 shadow-lg text-lg px-8 py-6">
            <Link href="/products/fpga/bitstream-generation/generate-bitstream">
              <Play className="mr-2 h-5 w-5" />
              Generate Bitstream
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 to-violet-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Generating Bitstreams
          </h2>
          <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-indigo-900 hover:bg-gray-100 border-0 shadow-lg">
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
