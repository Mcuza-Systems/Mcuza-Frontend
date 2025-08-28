'use client';

import Link from 'next/link';
import { ArrowRight, Layers, Cpu, Settings, Zap, Shield, Target, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SmartHALSynthesizer() {
  const features = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Multi-Layer Abstraction",
      description: "Generate complete HAL with hardware, middleware, and application layers for seamless portability across MCUs."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "MCU-Agnostic Design",
      description: "Create portable HAL that works across different microcontroller families with automatic adaptation."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Smart Configuration",
      description: "AI-powered peripheral configuration with optimal settings for performance, power, and reliability."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimized",
      description: "Generated HAL code optimized for speed, memory usage, and power consumption with benchmark validation."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety Critical Ready",
      description: "MISRA-C compliant code with comprehensive error handling suitable for safety-critical applications."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Industry Standards",
      description: "Follows AUTOSAR, CMSIS, and other industry standards for maximum compatibility and maintainability."
    }
  ];

  const supportedMCUs = [
    { family: "STM32", series: "F0/F1/F3/F4/F7/H7/L0/L1/L4/L5/G0/G4/WB/WL", count: "1000+" },
    { family: "ESP32", series: "ESP32/ESP32-S2/ESP32-S3/ESP32-C3/ESP32-H2", count: "50+" },
    { family: "Nordic nRF", series: "nRF51/nRF52/nRF53/nRF91", count: "80+" },
    { family: "Microchip PIC", series: "PIC16/PIC18/PIC24/dsPIC/PIC32", count: "500+" },
    { family: "Atmel AVR", series: "ATmega/ATtiny/XMEGA/AVR-DA/AVR-DB", count: "200+" },
    { family: "ARM Cortex", series: "M0/M0+/M3/M4/M7/M23/M33/M55", count: "2000+" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
            🏗️ Embedded Systems
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Smart HAL
            <span className="bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent block">Synthesizer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate comprehensive Hardware Abstraction Layers with AI. Create portable, optimized HAL code that works across different MCU families while maintaining performance and safety standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 border-0 shadow-lg text-lg px-8 py-6">
              <Link href="/products/embedded-systems/smart-hal-synthesizer/generate-hal">
                <Play className="mr-2 h-5 w-5" />
                Generate HAL
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-lg px-8 py-6">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Intelligent HAL Generation
            </h2>
            <p className="text-xl text-gray-300">
              AI-powered abstraction layer synthesis for maximum portability and performance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center text-green-400 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
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

      {/* MCU Support */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Comprehensive MCU Support
            </h2>
            <p className="text-xl text-gray-300">
              Generate HAL for thousands of microcontrollers across all major families
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedMCUs.map((mcu, index) => (
              <Card key={index} className="border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg">{mcu.family}</h3>
                      <p className="text-gray-400 text-sm">{mcu.series}</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">{mcu.count}</Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">AI-Generated HAL Code</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our AI generates complete HAL layers with optimized peripheral drivers, 
                configuration management, and cross-platform compatibility while maintaining 
                industry coding standards.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Automatic peripheral initialization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Cross-platform compatibility layer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Performance-optimized implementations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Comprehensive error handling</span>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 border-0 shadow-lg">
                Try HAL Generator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <Card className="border border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white">Generated HAL Example</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-generated GPIO HAL for STM32 with cross-platform support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                  <pre className="text-sm text-gray-300">
                    <code>{`// Auto-generated HAL GPIO Module
#include "hal_gpio.h"

// Platform-specific implementations
#ifdef STM32_PLATFORM
  #include "stm32_gpio_impl.h"
#elif ESP32_PLATFORM
  #include "esp32_gpio_impl.h"
#endif

HAL_Status HAL_GPIO_Init(const GPIO_Config* config) {
    if (config == NULL) {
        return HAL_ERROR_NULL_PTR;
    }
    
    // Validate configuration
    if (!GPIO_IsValidPin(config->pin)) {
        return HAL_ERROR_INVALID_PIN;
    }
    
    // Platform-specific initialization
    return GPIO_Platform_Init(config);
}

HAL_Status HAL_GPIO_WritePin(GPIO_Pin pin, GPIO_State state) {
    if (!GPIO_IsValidPin(pin)) {
        return HAL_ERROR_INVALID_PIN;
    }
    
    return GPIO_Platform_Write(pin, state);
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Why Choose Smart HAL Synthesizer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-green-400">90%</div>
              <div className="text-white font-semibold">Code Reusability</div>
              <div className="text-gray-400 text-sm">Same application code across different MCUs</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-green-400">5x</div>
              <div className="text-white font-semibold">Faster Porting</div>
              <div className="text-gray-400 text-sm">Accelerated migration between platforms</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-green-400">100%</div>
              <div className="text-white font-semibold">Standards Compliance</div>
              <div className="text-gray-400 text-sm">MISRA-C and industry standard adherence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Building Portable Embedded Software
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Generate professional HAL code and accelerate your embedded development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-green-900 hover:bg-gray-100 border-0 shadow-lg">
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
