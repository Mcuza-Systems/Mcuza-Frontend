'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Zap, FileText, Cpu, Clock, CheckCircle, Play, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function IntelligentDriversGenerator() {
  const [selectedComponent, setSelectedComponent] = useState('');

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Advanced LLM models analyze component datasheets and generate optimized device drivers with proper error handling and industry best practices."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Multi-Protocol Support",
      description: "Generate drivers for I2C, SPI, UART, CAN, USB, and other communication protocols with automatic configuration and initialization."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Production-Ready Code",
      description: "Generated code follows MISRA-C standards, includes comprehensive error handling, and comes with detailed documentation."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "MCU Optimization",
      description: "Drivers optimized for specific microcontrollers including STM32, ESP32, PIC, AVR, and ARM Cortex-M series."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Complete Documentation",
      description: "Auto-generated API documentation, usage examples, integration guides, and configuration instructions."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Hardware Validation",
      description: "Generated drivers tested against real hardware with comprehensive test suites and validation frameworks."
    }
  ];

  const supportedCategories = [
    { name: "Temperature Sensors", count: "200+", examples: "BME280, DHT22, DS18B20" },
    { name: "Display Controllers", count: "150+", examples: "SSD1306, ST7735, ILI9341" },
    { name: "Motor Drivers", count: "80+", examples: "DRV8825, A4988, L298N" },
    { name: "Communication Modules", count: "120+", examples: "ESP32, nRF24L01, HC-05" },
    { name: "Power Management", count: "90+", examples: "TPS61040, LM2596, ADP5070" },
    { name: "Sensor Interfaces", count: "300+", examples: "MPU6050, ADXL345, HMC5883L" }
  ];

  const driverExample = `// Auto-generated BME280 Driver by MCUZA
#include "bme280_driver.h"
#include "i2c_hal.h"

// Driver instance
static BME280_Handle_t bme280_handle;

/**
 * @brief Initialize BME280 sensor
 * @param config Pointer to configuration structure
 * @return BME280_Status_t Operation status
 */
BME280_Status_t BME280_Init(const BME280_Config_t* config) {
    BME280_Status_t status = BME280_OK;
    
    // Validate input parameters
    if (config == NULL) {
        return BME280_ERROR_NULL_PTR;
    }
    
    // Initialize I2C interface
    if (I2C_Init(&config->i2c_config) != I2C_OK) {
        return BME280_ERROR_I2C_INIT;
    }
    
    // Store configuration
    bme280_handle.config = *config;
    bme280_handle.is_initialized = false;
    
    // Read and verify chip ID
    uint8_t chip_id;
    status = BME280_ReadRegister(BME280_REG_CHIP_ID, &chip_id);
    if (status != BME280_OK) {
        return BME280_ERROR_COMMUNICATION;
    }
    
    if (chip_id != BME280_CHIP_ID_VALUE) {
        return BME280_ERROR_INVALID_CHIP_ID;
    }
    
    // Read calibration coefficients
    status = BME280_ReadCalibrationData(&bme280_handle.calib_data);
    if (status != BME280_OK) {
        return BME280_ERROR_CALIBRATION;
    }
    
    // Configure sensor settings
    status = BME280_ConfigureSensor(&bme280_handle);
    if (status != BME280_OK) {
        return BME280_ERROR_CONFIGURATION;
    }
    
    bme280_handle.is_initialized = true;
    return BME280_OK;
}

/**
 * @brief Read all sensor measurements
 * @param data Pointer to data structure
 * @return BME280_Status_t Operation status
 */
BME280_Status_t BME280_ReadAll(BME280_Data_t* data) {
    if (!bme280_handle.is_initialized || data == NULL) {
        return BME280_ERROR_NOT_INITIALIZED;
    }
    
    uint8_t raw_data[8];
    BME280_Status_t status;
    
    // Read all measurement registers at once for efficiency
    status = BME280_ReadRegisters(BME280_REG_PRESS_MSB, raw_data, 8);
    if (status != BME280_OK) {
        return status;
    }
    
    // Convert raw data using calibration coefficients
    data->pressure = BME280_CompensatePressure(raw_data, &bme280_handle.calib_data);
    data->temperature = BME280_CompensateTemperature(raw_data, &bme280_handle.calib_data);
    data->humidity = BME280_CompensateHumidity(raw_data, &bme280_handle.calib_data);
    
    // Update timestamp
    data->timestamp = HAL_GetTick();
    
    return BME280_OK;
}`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
            🤖 Embedded Systems
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Intelligent Drivers
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">Generator</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate production-ready device drivers in seconds using advanced AI. Simply describe your component or upload a datasheet, and get complete, tested driver code with documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 shadow-lg text-lg px-8 py-6">
            <Link href="/products/embedded-systems/intelligent-drivers-generator/generate-driver">
                <Play className="mr-2 h-5 w-5" />
                Generate Driver
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-lg px-8 py-6">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              AI-Powered Driver Generation
            </h2>
            <p className="text-xl text-gray-300">
              Advanced language models trained on millions of datasheets and driver implementations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-4">
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

      {/* Interactive Demo */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Try the Driver Generator
            </h2>
            <p className="text-xl text-gray-300">
              See how our AI generates complete drivers from component descriptions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Component Selection */}
            <Card className="border border-gray-700 bg-gray-800/50 p-6">
              <CardHeader>
                <CardTitle className="text-xl text-white">Select Component Category</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose from thousands of supported components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {supportedCategories.map((category, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedComponent === category.name
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/50'
                      }`}
                      onClick={() => setSelectedComponent(category.name)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">{category.name}</h3>
                        <Badge variant="outline" className="text-blue-400 border-blue-400">{category.count}</Badge>
                      </div>
                      <p className="text-sm text-gray-400">{category.examples}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white">
                    Or describe your component:
                  </label>
                  <textarea
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="e.g., BME280 environmental sensor with I2C interface, measures temperature, pressure, and humidity..."
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0" asChild>
                  <Link href="./generate-driver">
                    Generate Driver Code
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Generated Code Output */}
            <Card className="border border-gray-700 bg-gray-800/50 p-6">
              <CardHeader>
                <CardTitle className="text-xl text-white">Generated Driver Code</CardTitle>
                <CardDescription className="text-gray-400">
                  Production-ready C code with complete error handling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                    <TabsTrigger value="code" className="text-white data-[state=active]:bg-blue-600">Driver (.c)</TabsTrigger>
                    <TabsTrigger value="header" className="text-white data-[state=active]:bg-blue-600">Header (.h)</TabsTrigger>
                    <TabsTrigger value="docs" className="text-white data-[state=active]:bg-blue-600">Docs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="code" className="mt-4">
                    <div className="bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto border border-gray-700">
                      <pre className="text-sm text-gray-300">
                        <code>{driverExample}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="header" className="mt-4">
                    <div className="bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto border border-gray-700">
                      <pre className="text-sm text-gray-300">
                        <code>{`#ifndef BME280_DRIVER_H
#define BME280_DRIVER_H

#include <stdint.h>
#include <stdbool.h>

// BME280 Register Addresses
#define BME280_REG_CHIP_ID      0xD0
#define BME280_REG_RESET        0xE0
#define BME280_REG_CTRL_HUM     0xF2
#define BME280_REG_STATUS       0xF3
#define BME280_REG_CTRL_MEAS    0xF4
#define BME280_REG_CONFIG       0xF5
#define BME280_REG_PRESS_MSB    0xF7

// Status enumeration
typedef enum {
    BME280_OK = 0,
    BME280_ERROR_NULL_PTR = -1,
    BME280_ERROR_I2C_INIT = -2,
    BME280_ERROR_COMMUNICATION = -3,
    BME280_ERROR_INVALID_CHIP_ID = -4,
    BME280_ERROR_CALIBRATION = -5,
    BME280_ERROR_CONFIGURATION = -6,
    BME280_ERROR_NOT_INITIALIZED = -7
} BME280_Status_t;

// Configuration structure
typedef struct {
    uint8_t i2c_address;
    uint32_t i2c_speed;
    uint8_t oversampling_temp;
    uint8_t oversampling_press;
    uint8_t oversampling_hum;
    uint8_t filter_coeff;
} BME280_Config_t;

// Measurement data structure
typedef struct {
    float temperature;    // °C
    float pressure;       // hPa
    float humidity;       // %RH
    uint32_t timestamp;   // ms
} BME280_Data_t;

// Function prototypes
BME280_Status_t BME280_Init(const BME280_Config_t* config);
BME280_Status_t BME280_ReadAll(BME280_Data_t* data);
BME280_Status_t BME280_Reset(void);
BME280_Status_t BME280_Sleep(void);
BME280_Status_t BME280_Wakeup(void);

#endif // BME280_DRIVER_H`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="docs" className="mt-4">
                    <div className="space-y-4 text-gray-300 max-h-96 overflow-y-auto">
                      <div>
                        <h4 className="font-semibold text-white mb-2">BME280 Driver Documentation</h4>
                        <p className="text-sm">AI-generated driver for Bosch BME280 environmental sensor with I2C interface.</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-white mb-1">Quick Start:</h5>
                        <ol className="text-sm space-y-1 list-decimal list-inside">
                          <li>Configure I2C interface in your HAL</li>
                          <li>Initialize driver with BME280_Init()</li>
                          <li>Read measurements with BME280_ReadAll()</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-white mb-1">Features:</h5>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Complete error handling and validation</li>
                          <li>Configurable oversampling and filtering</li>
                          <li>Power management functions</li>
                          <li>Hardware abstraction layer compatible</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                    Copy Code
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                    Export Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Why Choose Intelligent Drivers Generator?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-blue-400">50x</div>
              <div className="text-white font-semibold">Faster Development</div>
              <div className="text-gray-400 text-sm">Generate complete drivers in minutes, not days</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-blue-400">99.8%</div>
              <div className="text-white font-semibold">Code Accuracy</div>
              <div className="text-gray-400 text-sm">Validated against real hardware and datasheets</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-blue-400">1000+</div>
              <div className="text-white font-semibold">Components Supported</div>
              <div className="text-gray-400 text-sm">Growing database of component drivers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Generate Your First Driver?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of embedded developers who've accelerated their projects with AI-generated drivers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-blue-900 hover:bg-gray-100 border-0 shadow-lg">
              <Link href="/signup">
                Start Generating
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
