'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Cpu, ArrowsExpand, Layers, Clock, ArrowRight, Check, ChevronRight, X, Info, AlertCircle, Download, FileDown, Zap, Settings, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function PortingFirmwareIDE() {
  // State management for firmware porting workflow
  const [activeStep, setActiveStep] = useState(1);
  const [sourceMCU, setSourceMCU] = useState('');
  const [targetMCU, setTargetMCU] = useState('');
  const [firmwareDetails, setFirmwareDetails] = useState({
    description: '',
    sourceCode: '',
    dependencies: ''
  });
  const [portingOptions, setPortingOptions] = useState({
    optimizationLevel: 'balanced',
    maintainAPIs: true,
    adaptPeripherals: true,
    includeTests: true,
    preserveComments: true
  });
  const [outputFormat, setOutputFormat] = useState('zip');
  const [isPorting, setIsPorting] = useState(false);
  const [portingProgress, setPortingProgress] = useState(0);
  const [portedCode, setPortedCode] = useState('');
  
  // Predefined data for MCU families
  const mcuFamilies = [
    { id: 'stm32f4', name: 'STM32F4 Series', manufacturer: 'ST Microelectronics', architecture: 'ARM Cortex-M4' },
    { id: 'stm32f7', name: 'STM32F7 Series', manufacturer: 'ST Microelectronics', architecture: 'ARM Cortex-M7' },
    { id: 'stm32h7', name: 'STM32H7 Series', manufacturer: 'ST Microelectronics', architecture: 'ARM Cortex-M7' },
    { id: 'atmega328p', name: 'ATmega328P', manufacturer: 'Microchip', architecture: '8-bit AVR' },
    { id: 'atmega2560', name: 'ATmega2560', manufacturer: 'Microchip', architecture: '8-bit AVR' },
    { id: 'pic32mx', name: 'PIC32MX Series', manufacturer: 'Microchip', architecture: 'MIPS32' },
    { id: 'msp430f5', name: 'MSP430F5xx', manufacturer: 'Texas Instruments', architecture: '16-bit MSP430' },
    { id: 'esp32', name: 'ESP32', manufacturer: 'Espressif', architecture: 'Xtensa LX6' },
    { id: 'nrf52840', name: 'nRF52840', manufacturer: 'Nordic Semiconductor', architecture: 'ARM Cortex-M4F' },
    { id: 'rp2040', name: 'RP2040', manufacturer: 'Raspberry Pi', architecture: 'ARM Cortex-M0+' },
    { id: 'sam3x8e', name: 'SAM3X8E', manufacturer: 'Microchip', architecture: 'ARM Cortex-M3' },
    { id: 'kinetis_k64', name: 'Kinetis K64', manufacturer: 'NXP', architecture: 'ARM Cortex-M4F' },
    { id: 'ra6m3', name: 'RA6M3', manufacturer: 'Renesas', architecture: 'ARM Cortex-M4F' },
  ];

  // Helper functions for step completion and progress
  const isStepComplete = (step) => {
    switch (step) {
      case 1: return !!sourceMCU;
      case 2: return !!targetMCU;
      case 3: return firmwareDetails.description.length >= 10 && firmwareDetails.sourceCode.length >= 10;
      case 4: return true; // Porting options are optional
      default: return false;
    }
  };

  const calculateProgress = () => {
    let completed = 0;
    for (let i = 1; i <= 4; i++) {
      if (isStepComplete(i)) completed++;
    }
    return (completed / 4) * 100;
  };

  // Navigation functions
  const goToNextStep = () => {
    if (activeStep < 5 && isStepComplete(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Handlers for MCU and firmware detail changes
  const handleSourceMCUChange = (mcu) => {
    setSourceMCU(mcu);
  };

  const handleTargetMCUChange = (mcu) => {
    setTargetMCU(mcu);
  };

  const handleFirmwareDetailChange = (field, value) => {
    setFirmwareDetails({
      ...firmwareDetails,
      [field]: value
    });
  };

  const handlePortingOptionChange = (option, value) => {
    setPortingOptions({
      ...portingOptions,
      [option]: value
    });
  };

  // Firmware porting function
  const portFirmware = () => {
    if (!isStepComplete(1) || !isStepComplete(2) || !isStepComplete(3)) {
      return;
    }

    setIsPorting(true);
    setPortingProgress(0);

    // Simulate porting process
    const interval = setInterval(() => {
      setPortingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPorting(false);
          
          // Set example ported code
          const sourceMCUObj = mcuFamilies.find(m => m.id === sourceMCU);
          const targetMCUObj = mcuFamilies.find(m => m.id === targetMCU);
          
          let exampleCode = `// Ported firmware from ${sourceMCUObj?.name} to ${targetMCUObj?.name}\n`;
          exampleCode += `// Original architecture: ${sourceMCUObj?.architecture}\n`;
          exampleCode += `// Target architecture: ${targetMCUObj?.architecture}\n\n`;
          
          if (sourceMCU.includes('stm32') && targetMCU.includes('stm32')) {
            // STM32 to STM32 porting example
            exampleCode += `#include "${targetMCU.toLowerCase()}_hal.h"\n\n`;
            exampleCode += `// Adapted GPIO initialization\n`;
            exampleCode += `void GPIO_Init(void) {\n`;
            exampleCode += `  GPIO_InitTypeDef GPIO_InitStruct = {0};\n\n`;
            exampleCode += `  /* Enable clock for required GPIOs */\n`;
            exampleCode += `  __HAL_RCC_GPIOA_CLK_ENABLE();\n`;
            exampleCode += `  __HAL_RCC_GPIOB_CLK_ENABLE();\n\n`;
            exampleCode += `  /* Configure GPIO pins */\n`;
            exampleCode += `  GPIO_InitStruct.Pin = GPIO_PIN_5;\n`;
            exampleCode += `  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;\n`;
            exampleCode += `  GPIO_InitStruct.Pull = GPIO_NOPULL;\n`;
            exampleCode += `  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;\n`;
            exampleCode += `  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);\n`;
            exampleCode += `}\n\n`;
            exampleCode += `// Adapted UART initialization\n`;
            exampleCode += `UART_HandleTypeDef huart1;\n\n`;
            exampleCode += `void UART_Init(void) {\n`;
            exampleCode += `  huart1.Instance = USART1;\n`;
            exampleCode += `  huart1.Init.BaudRate = 115200;\n`;
            exampleCode += `  huart1.Init.WordLength = UART_WORDLENGTH_8B;\n`;
            exampleCode += `  huart1.Init.StopBits = UART_STOPBITS_1;\n`;
            exampleCode += `  huart1.Init.Parity = UART_PARITY_NONE;\n`;
            exampleCode += `  huart1.Init.Mode = UART_MODE_TX_RX;\n`;
            exampleCode += `  huart1.Init.HwFlowCtl = UART_HWCONTROL_NONE;\n`;
            exampleCode += `  huart1.Init.OverSampling = UART_OVERSAMPLING_16;\n`;
            exampleCode += `  HAL_UART_Init(&huart1);\n`;
            exampleCode += `}\n`;
          } else if (sourceMCU.includes('atmega') && targetMCU.includes('stm32')) {
            // AVR to STM32 porting example
            exampleCode += `#include "${targetMCU.toLowerCase()}_hal.h"\n\n`;
            exampleCode += `// Ported from AVR digitalWrite to STM32 HAL_GPIO_WritePin\n`;
            exampleCode += `void digitalWrite(uint8_t pin, uint8_t state) {\n`;
            exampleCode += `  // Map Arduino pin to STM32 GPIO\n`;
            exampleCode += `  GPIO_TypeDef* port;\n`;
            exampleCode += `  uint16_t gpio_pin;\n\n`;
            exampleCode += `  // Pin mapping logic\n`;
            exampleCode += `  switch(pin) {\n`;
            exampleCode += `    case 13: // LED pin on Arduino\n`;
            exampleCode += `      port = GPIOC;\n`;
            exampleCode += `      gpio_pin = GPIO_PIN_13;\n`;
            exampleCode += `      break;\n`;
            exampleCode += `    // Add more pin mappings as needed\n`;
            exampleCode += `    default:\n`;
            exampleCode += `      return; // Invalid pin\n`;
            exampleCode += `  }\n\n`;
            exampleCode += `  // Convert Arduino HIGH/LOW to HAL GPIO_PIN_SET/GPIO_PIN_RESET\n`;
            exampleCode += `  GPIO_PinState gpio_state = (state == 1) ? GPIO_PIN_SET : GPIO_PIN_RESET;\n`;
            exampleCode += `  HAL_GPIO_WritePin(port, gpio_pin, gpio_state);\n`;
            exampleCode += `}\n\n`;
            exampleCode += `// Ported from AVR delay to STM32 HAL_Delay\n`;
            exampleCode += `void delay(uint32_t ms) {\n`;
            exampleCode += `  HAL_Delay(ms);\n`;
            exampleCode += `}\n`;
          } else {
            // Generic porting example
            exampleCode += `#include "${targetMCU.toLowerCase()}_hal.h"\n\n`;
            exampleCode += `// Ported initialization function\n`;
            exampleCode += `void SystemInit(void) {\n`;
            exampleCode += `  // Configure system clock\n`;
            exampleCode += `  SystemClock_Config();\n\n`;
            exampleCode += `  // Initialize peripherals\n`;
            exampleCode += `  HAL_Init();\n`;
            exampleCode += `  GPIO_Init();\n`;
            exampleCode += `  UART_Init();\n`;
            exampleCode += `}\n\n`;
            exampleCode += `// Ported main function\n`;
            exampleCode += `int main(void) {\n`;
            exampleCode += `  // Initialize system\n`;
            exampleCode += `  SystemInit();\n\n`;
            exampleCode += `  // Main application loop\n`;
            exampleCode += `  while (1) {\n`;
            exampleCode += `    // Application code\n`;
            exampleCode += `    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);\n`;
            exampleCode += `    HAL_Delay(500);\n`;
            exampleCode += `  }\n`;
            exampleCode += `}\n`;
          }
          
          setPortedCode(exampleCode);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // UI for the IDE
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gray-900 p-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <Link href="/products/embedded-systems/porting-firmware-mcus">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Firmware Porting Tool</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            {isPorting ? 'Porting...' : 'Ready'}
          </Badge>
          <Badge variant="outline" className="bg-gray-800">
            <ArrowsExpand className="h-3 w-3 mr-1" />
            {sourceMCU && targetMCU ? `${sourceMCU} → ${targetMCU}` : 'No MCUs Selected'}
          </Badge>
        </div>
      </div>

      {/* Left Sidebar - Steps */}
      <div className="w-64 bg-gray-900 pt-16 pb-4 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Porting Steps</h2>
          <div className="mt-4 space-y-1">
            <button
              onClick={() => setActiveStep(1)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${activeStep === 1 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(1) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(1) ? <Check className="h-3 w-3" /> : '1'}
              </div>
              <span>Select Source MCU</span>
              {activeStep === 1 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(1) && setActiveStep(2)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(1) ? 'opacity-50 cursor-not-allowed' : activeStep === 2 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(1)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(2) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(2) ? <Check className="h-3 w-3" /> : '2'}
              </div>
              <span>Select Target MCU</span>
              {activeStep === 2 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(2) && setActiveStep(3)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(2) ? 'opacity-50 cursor-not-allowed' : activeStep === 3 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(2)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(3) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(3) ? <Check className="h-3 w-3" /> : '3'}
              </div>
              <span>Firmware Details</span>
              {activeStep === 3 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(3) && setActiveStep(4)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(3) ? 'opacity-50 cursor-not-allowed' : activeStep === 4 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(3)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(4) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(4) ? <Check className="h-3 w-3" /> : '4'}
              </div>
              <span>Porting Options</span>
              {activeStep === 4 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(4) && setActiveStep(5)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(4) ? 'opacity-50 cursor-not-allowed' : activeStep === 5 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(4)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${portedCode ? 'bg-green-500' : 'bg-gray-700'}`}>
                {portedCode ? <Check className="h-3 w-3" /> : '5'}
              </div>
              <span>Port Firmware</span>
              {activeStep === 5 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
          </div>
        </div>
        
        <div className="px-4 mt-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Progress</h2>
          <Progress value={calculateProgress()} className="mt-2 h-2" />
          <p className="text-xs text-gray-500 mt-1">{Math.round(calculateProgress())}% Complete</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pt-16 pb-4 overflow-y-auto">
        <div className="p-6">
          {/* Step 1: Select Source MCU */}
          {activeStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Select Source MCU</h2>
              <p className="text-gray-400 mb-6">Choose the microcontroller that your current firmware is designed for.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mcuFamilies.map((mcu) => (
                  <Card 
                    key={mcu.id}
                    className={`cursor-pointer border-2 transition-all ${sourceMCU === mcu.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800 hover:border-gray-700 bg-gray-900'}`}
                    onClick={() => handleSourceMCUChange(mcu.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="p-2 rounded-md bg-blue-500/20">
                          <Cpu className="h-5 w-5" />
                        </div>
                        {sourceMCU === mcu.id && (
                          <Badge className="bg-blue-500">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium text-lg">{mcu.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {mcu.manufacturer}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {mcu.architecture}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={goToNextStep} 
                  disabled={!isStepComplete(1)}
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Select Target MCU */}
          {activeStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Select Target MCU</h2>
              <p className="text-gray-400 mb-6">Choose the microcontroller that you want to port your firmware to.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mcuFamilies.map((mcu) => (
                  <Card 
                    key={mcu.id}
                    className={`cursor-pointer border-2 transition-all ${targetMCU === mcu.id ? 'border-green-500 bg-green-500/10' : 'border-gray-800 hover:border-gray-700 bg-gray-900'}`}
                    onClick={() => handleTargetMCUChange(mcu.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="p-2 rounded-md bg-green-500/20">
                          <Cpu className="h-5 w-5" />
                        </div>
                        {targetMCU === mcu.id && (
                          <Badge className="bg-green-500">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium text-lg">{mcu.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {mcu.manufacturer}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {mcu.architecture}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
                <Button 
                  onClick={goToNextStep} 
                  disabled={!isStepComplete(2)}
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Firmware Details */}
          {activeStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Firmware Details</h2>
              <p className="text-gray-400 mb-6">Provide information about the firmware you want to port.</p>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                      Firmware Description
                    </Label>
                    <Textarea 
                      id="description"
                      placeholder="Describe your firmware's purpose, functionality, and key features..."
                      className="h-[100px] bg-gray-950 border-gray-800"
                      value={firmwareDetails.description}
                      onChange={(e) => handleFirmwareDetailChange('description', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {firmwareDetails.description.length} characters (minimum 10 required)
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="sourceCode" className="text-sm font-medium mb-2 block">
                      Source Code Samples (Key Functions)
                    </Label>
                    <Textarea 
                      id="sourceCode"
                      placeholder="Paste key functions or code snippets that need to be ported..."
                      className="h-[200px] bg-gray-950 border-gray-800 font-mono text-sm"
                      value={firmwareDetails.sourceCode}
                      onChange={(e) => handleFirmwareDetailChange('sourceCode', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {firmwareDetails.sourceCode.length} characters (minimum 10 required)
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="dependencies" className="text-sm font-medium mb-2 block">
                      Dependencies (Optional)
                    </Label>
                    <Textarea 
                      id="dependencies"
                      placeholder="List any libraries, HAL versions, or external dependencies..."
                      className="h-[100px] bg-gray-950 border-gray-800"
                      value={firmwareDetails.dependencies}
                      onChange={(e) => handleFirmwareDetailChange('dependencies', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
                <Button 
                  onClick={goToNextStep} 
                  disabled={!isStepComplete(3)}
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 4: Porting Options */}
          {activeStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Porting Options</h2>
              <p className="text-gray-400 mb-6">Configure how you want the firmware to be ported.</p>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="optimizationLevel" className="text-sm font-medium mb-2 block">
                        Optimization Level
                      </Label>
                      <Select 
                        value={portingOptions.optimizationLevel} 
                        onValueChange={(value) => handlePortingOptionChange('optimizationLevel', value)}
                      >
                        <SelectTrigger className="bg-gray-950 border-gray-800">
                          <SelectValue placeholder="Select optimization level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-950 border-gray-800">
                          <SelectItem value="size">Optimize for Size</SelectItem>
                          <SelectItem value="speed">Optimize for Speed</SelectItem>
                          <SelectItem value="balanced">Balanced (Default)</SelectItem>
                          <SelectItem value="debug">Debug Friendly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-sm font-medium block">
                        Porting Features
                      </Label>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="maintainAPIs" 
                          checked={portingOptions.maintainAPIs}
                          onCheckedChange={(checked) => handlePortingOptionChange('maintainAPIs', checked)}
                        />
                        <Label htmlFor="maintainAPIs" className="text-sm">
                          Maintain API compatibility
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="adaptPeripherals" 
                          checked={portingOptions.adaptPeripherals}
                          onCheckedChange={(checked) => handlePortingOptionChange('adaptPeripherals', checked)}
                        />
                        <Label htmlFor="adaptPeripherals" className="text-sm">
                          Adapt peripheral configurations
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="includeTests" 
                          checked={portingOptions.includeTests}
                          onCheckedChange={(checked) => handlePortingOptionChange('includeTests', checked)}
                        />
                        <Label htmlFor="includeTests" className="text-sm">
                          Include validation tests
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="preserveComments" 
                          checked={portingOptions.preserveComments}
                          onCheckedChange={(checked) => handlePortingOptionChange('preserveComments', checked)}
                        />
                        <Label htmlFor="preserveComments" className="text-sm">
                          Preserve comments and documentation
                        </Label>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Output Format
                      </Label>
                      <RadioGroup 
                        value={outputFormat} 
                        onValueChange={setOutputFormat}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="zip" id="zip" />
                          <Label htmlFor="zip">ZIP Archive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tar" id="tar" />
                          <Label htmlFor="tar">TAR.GZ Archive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="individual" id="individual" />
                          <Label htmlFor="individual">Individual Files</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
                <Button 
                  onClick={goToNextStep} 
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 5: Port Firmware */}
          {activeStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Port Firmware</h2>
              <p className="text-gray-400 mb-6">Review your selections and port the firmware.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle>Porting Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-gray-950 rounded-md p-4">
                          <h3 className="text-sm font-medium mb-2">Porting Summary</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Source MCU:</span>
                              <span>{mcuFamilies.find(m => m.id === sourceMCU)?.name || 'None'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Target MCU:</span>
                              <span>{mcuFamilies.find(m => m.id === targetMCU)?.name || 'None'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Architecture Change:</span>
                              <span>
                                {sourceMCU && targetMCU ? 
                                  mcuFamilies.find(m => m.id === sourceMCU)?.architecture === mcuFamilies.find(m => m.id === targetMCU)?.architecture ?
                                  'Same Architecture' : 'Cross-Architecture' : 'N/A'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Optimization:</span>
                              <span className="capitalize">{portingOptions.optimizationLevel}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={portFirmware} 
                          disabled={isPorting || !isStepComplete(1) || !isStepComplete(2) || !isStepComplete(3)}
                          className="w-full"
                          size="lg"
                        >
                          {isPorting ? (
                            <>
                              <span className="animate-pulse">Porting Firmware...</span>
                              <Progress value={portingProgress} className="h-1 mt-2" />
                            </>
                          ) : (
                            <>
                              <ArrowsExpand className="mr-2 h-5 w-5" />
                              PORT FIRMWARE
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {portedCode && (
                    <Card className="bg-gray-900 border-gray-800 mt-6">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>Ported Code</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-950 rounded-md p-4 overflow-auto max-h-[400px]">
                          <pre className="text-sm font-mono text-gray-300">
                            {portedCode}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div>
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle>Porting Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Porting Complexity</h3>
                          <p className="text-white">
                            {sourceMCU && targetMCU ? 
                              mcuFamilies.find(m => m.id === sourceMCU)?.manufacturer === mcuFamilies.find(m => m.id === targetMCU)?.manufacturer ?
                              'Medium (Same Manufacturer)' : 'High (Different Manufacturer)' : 'Not Determined'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Estimated Time</h3>
                          <p className="text-white">
                            {sourceMCU && targetMCU ? 
                              mcuFamilies.find(m => m.id === sourceMCU)?.architecture === mcuFamilies.find(m => m.id === targetMCU)?.architecture ?
                              '~30-60 seconds' : '~1-2 minutes' : 'N/A'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Compatibility Notes</h3>
                          <p className="text-white text-sm">
                            {sourceMCU && targetMCU ? getCompatibilityNotes(sourceMCU, targetMCU) : 'Select source and target MCUs to see compatibility notes.'}
                          </p>
                        </div>
                        
                        {(!isStepComplete(1) || !isStepComplete(2) || !isStepComplete(3)) && (
                          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-md p-3 mt-4">
                            <div className="flex">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-yellow-500">Incomplete Configuration</h4>
                                <ul className="text-xs text-yellow-500/80 mt-1 list-disc list-inside">
                                  {!isStepComplete(1) && <li>Select a source MCU</li>}
                                  {!isStepComplete(2) && <li>Select a target MCU</li>}
                                  {!isStepComplete(3) && <li>Provide firmware details</li>}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="mt-8 flex justify-start">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get compatibility notes based on source and target MCUs
function getCompatibilityNotes(sourceMCU, targetMCU) {
  // Same family (e.g., STM32 to STM32)
  if (sourceMCU.includes('stm32') && targetMCU.includes('stm32')) {
    return 'High compatibility. HAL functions should port with minimal changes. Peripheral registers and clock configurations may need adjustment.';
  }
  
  // AVR to ARM
  if (sourceMCU.includes('atmega') && (targetMCU.includes('stm32') || targetMCU.includes('sam') || targetMCU.includes('nrf52'))) {
    return 'Low compatibility. Significant architecture differences. Register-level code will need complete rewrite. Higher-level abstractions may be adaptable.';
  }
  
  // ARM to ARM (different families)
  if ((sourceMCU.includes('stm32') || sourceMCU.includes('sam') || sourceMCU.includes('nrf52')) && 
      (targetMCU.includes('stm32') || targetMCU.includes('sam') || targetMCU.includes('nrf52'))) {
    return 'Medium compatibility. Similar architecture but different peripheral implementations. HAL functions will need adaptation.';
  }
  
  // ESP32 specific
  if (sourceMCU.includes('esp32') || targetMCU.includes('esp32')) {
    return 'Medium compatibility. ESP32 has unique WiFi/BT capabilities and FreeRTOS integration that may require special handling.';
  }
  
  // Default case
  return 'Compatibility analysis not available for this specific combination. Code will be ported with general best practices.';
}
