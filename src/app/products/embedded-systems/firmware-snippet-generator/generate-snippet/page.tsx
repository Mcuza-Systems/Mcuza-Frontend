'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, FileCode, Cpu, Layers, Clock, ArrowRight, Check, ChevronRight, X, Info, AlertCircle, Download, FileDown, Zap, Settings, Bookmark } from 'lucide-react';
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

export default function SnippetGeneratorIDE() {
  // State management for snippet generation workflow
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMCU, setSelectedMCU] = useState('');
  const [snippetRequirements, setSnippetRequirements] = useState('');
  const [advancedOptions, setAdvancedOptions] = useState({
    optimization: 'balanced',
    includeComments: true,
    includeErrorHandling: true,
    includeTestCode: false,
    customIncludes: ''
  });
  const [codeStyle, setCodeStyle] = useState('standard');
  const [outputFormat, setOutputFormat] = useState('zip');
  const [includeExamples, setIncludeExamples] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Predefined data for snippet categories and MCUs
  const snippetCategories = [
    { id: 'peripheral', name: 'Peripheral Initialization', color: 'cyan', icon: <Settings className="h-5 w-5" /> },
    { id: 'communication', name: 'Communication Protocols', color: 'blue', icon: <FileCode className="h-5 w-5" /> },
    { id: 'power', name: 'Power Management', color: 'green', icon: <Zap className="h-5 w-5" /> },
    { id: 'interrupt', name: 'Interrupt Handling', color: 'purple', icon: <AlertCircle className="h-5 w-5" /> },
    { id: 'memory', name: 'Memory Management', color: 'pink', icon: <Layers className="h-5 w-5" /> },
    { id: 'timing', name: 'Timing and Scheduling', color: 'yellow', icon: <Clock className="h-5 w-5" /> },
    { id: 'bootloader', name: 'Bootloader Functions', color: 'orange', icon: <Cpu className="h-5 w-5" /> },
    { id: 'filesystem', name: 'File System Operations', color: 'indigo', icon: <FileDown className="h-5 w-5" /> },
    { id: 'security', name: 'Security Features', color: 'emerald', icon: <Shield className="h-5 w-5" /> },
    { id: 'custom', name: 'Custom Functionality', color: 'violet', icon: <Bookmark className="h-5 w-5" /> },
  ];
  
  const mcuFamilies = [
    { id: 'stm32', name: 'STM32 Series', manufacturer: 'ST Microelectronics' },
    { id: 'avr', name: 'AVR Series', manufacturer: 'Microchip' },
    { id: 'pic', name: 'PIC Series', manufacturer: 'Microchip' },
    { id: 'msp430', name: 'MSP430 Series', manufacturer: 'Texas Instruments' },
    { id: 'esp32', name: 'ESP32 Series', manufacturer: 'Espressif' },
    { id: 'nrf52', name: 'nRF52 Series', manufacturer: 'Nordic Semiconductor' },
    { id: 'sam', name: 'SAM Series', manufacturer: 'Microchip' },
    { id: 'rp2040', name: 'RP2040', manufacturer: 'Raspberry Pi' },
    { id: 'kinetis', name: 'Kinetis Series', manufacturer: 'NXP' },
    { id: 'renesas', name: 'RA/RX Series', manufacturer: 'Renesas' },
  ];

  // Helper functions for step completion and progress
  const isStepComplete = (step) => {
    switch (step) {
      case 1: return !!selectedCategory;
      case 2: return !!selectedMCU;
      case 3: return snippetRequirements.length >= 10;
      case 4: return true; // Advanced options are optional
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

  // Handlers for category, MCU, and requirement changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleMCUChange = (mcu) => {
    setSelectedMCU(mcu);
  };

  const handleRequirementsChange = (e) => {
    setSnippetRequirements(e.target.value);
  };

  const handleAdvancedOptionChange = (option, value) => {
    setAdvancedOptions({
      ...advancedOptions,
      [option]: value
    });
  };

  // Code generation function
  const generateSnippetCode = () => {
    if (!isStepComplete(1) || !isStepComplete(2) || !isStepComplete(3)) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate code generation process
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          // Set example generated code based on selected category
          let exampleCode = '';
          
          if (selectedCategory === 'peripheral') {
            exampleCode = `// GPIO Initialization for ${selectedMCU}\n\n#include "${selectedMCU.toLowerCase()}_gpio.h"\n\nvoid GPIO_Init(void) {\n  // Configure GPIO Port A Pin 5 as output\n  GPIO_InitTypeDef GPIO_InitStruct = {0};\n  \n  /* Enable clock for GPIOA */\n  __HAL_RCC_GPIOA_CLK_ENABLE();\n  \n  /* Configure GPIO pin : PA5 */\n  GPIO_InitStruct.Pin = GPIO_PIN_5;\n  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;\n  GPIO_InitStruct.Pull = GPIO_NOPULL;\n  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;\n  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);\n${advancedOptions.includeErrorHandling ? '\n  /* Error handling */\n  if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_5) != GPIO_PIN_RESET) {\n    Error_Handler();\n  }\n' : ''}\n  /* User requirements: ${snippetRequirements.substring(0, 50)}... */\n}\n`;
          } else if (selectedCategory === 'communication') {
            exampleCode = `// UART Communication for ${selectedMCU}\n\n#include "${selectedMCU.toLowerCase()}_uart.h"\n\nUART_HandleTypeDef huart2;\n\nvoid UART_Init(void) {\n  huart2.Instance = USART2;\n  huart2.Init.BaudRate = 115200;\n  huart2.Init.WordLength = UART_WORDLENGTH_8B;\n  huart2.Init.StopBits = UART_STOPBITS_1;\n  huart2.Init.Parity = UART_PARITY_NONE;\n  huart2.Init.Mode = UART_MODE_TX_RX;\n  huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;\n  huart2.Init.OverSampling = UART_OVERSAMPLING_16;\n  \n  if (HAL_UART_Init(&huart2) != HAL_OK) {\n    Error_Handler();\n  }\n${advancedOptions.includeTestCode ? '\n  /* Test code */\n  const char *test_msg = "UART Test\\r\\n";\n  HAL_UART_Transmit(&huart2, (uint8_t*)test_msg, strlen(test_msg), 100);\n' : ''}\n  /* User requirements: ${snippetRequirements.substring(0, 50)}... */\n}\n`;
          } else if (selectedCategory === 'power') {
            exampleCode = `// Power Management for ${selectedMCU}\n\n#include "${selectedMCU.toLowerCase()}_pwr.h"\n\nvoid ConfigureLowPowerMode(void) {\n  /* Configure the system for low power mode */\n  PWR_LowPowerTypeDef LowPowerConfig = {0};\n  \n  LowPowerConfig.Mode = PWR_MODE_STOP2;\n  LowPowerConfig.WakeupSource = PWR_WAKEUP_PIN1;\n  \n  /* Enter low power mode */\n  HAL_PWR_EnterLowPowerMode(&LowPowerConfig);\n${advancedOptions.includeComments ? '\n  /* Note: In STOP2 mode, all clocks are stopped except LSI/LSE */\n  /* Current consumption is reduced to ~5uA */\n' : ''}\n  /* User requirements: ${snippetRequirements.substring(0, 50)}... */\n}\n`;
          } else {
            exampleCode = `// ${snippetCategories.find(c => c.id === selectedCategory)?.name} for ${selectedMCU}\n\n#include "${selectedMCU.toLowerCase()}_hal.h"\n\n/* Function implementation based on requirements */\nvoid Initialize${snippetCategories.find(c => c.id === selectedCategory)?.name.replace(/\s/g, '')}(void) {\n  /* Configuration code will be generated here */\n  \n  /* User requirements: ${snippetRequirements} */\n${advancedOptions.includeComments ? '\n  /* This code is optimized for ${advancedOptions.optimization} performance */\n' : ''}\n}\n`;
          }
          
          setGeneratedCode(exampleCode);
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
          <Link href="/products/embedded-systems/firmware-snippet-generator">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Firmware Snippet Generator</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            {isGenerating ? 'Generating...' : 'Ready'}
          </Badge>
          <Badge variant="outline" className="bg-gray-800">
            <Code className="h-3 w-3 mr-1" />
            {selectedMCU || 'No MCU Selected'}
          </Badge>
        </div>
      </div>

      {/* Left Sidebar - Steps */}
      <div className="w-64 bg-gray-900 pt-16 pb-4 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Generation Steps</h2>
          <div className="mt-4 space-y-1">
            <button
              onClick={() => setActiveStep(1)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${activeStep === 1 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isStepComplete(1) ? 'bg-green-500' : 'bg-gray-700'}`}>
                {isStepComplete(1) ? <Check className="h-3 w-3" /> : '1'}
              </div>
              <span>Select Category</span>
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
              <span>Select MCU</span>
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
              <span>Define Requirements</span>
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
              <span>Advanced Options</span>
              {activeStep === 4 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
            
            <button
              onClick={() => isStepComplete(4) && setActiveStep(5)}
              className={`w-full flex items-center px-3 py-2 rounded-md ${!isStepComplete(4) ? 'opacity-50 cursor-not-allowed' : activeStep === 5 ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50'}`}
              disabled={!isStepComplete(4)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${generatedCode ? 'bg-green-500' : 'bg-gray-700'}`}>
                {generatedCode ? <Check className="h-3 w-3" /> : '5'}
              </div>
              <span>Generate Code</span>
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
          {/* Step 1: Select Category */}
          {activeStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Select Snippet Category</h2>
              <p className="text-gray-400 mb-6">Choose the type of firmware snippet you need to generate.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {snippetCategories.map((category) => (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer border-2 transition-all ${selectedCategory === category.id ? `border-${category.color}-500 bg-${category.color}-500/10` : 'border-gray-800 hover:border-gray-700 bg-gray-900'}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className={`p-2 rounded-md bg-${category.color}-500/20`}>
                          {category.icon}
                        </div>
                        {selectedCategory === category.id && (
                          <Badge className={`bg-${category.color}-500`}>
                            Selected
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium text-lg">{category.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {getDescriptionForCategory(category.id)}
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
          
          {/* Step 2: Select MCU */}
          {activeStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Select Target MCU</h2>
              <p className="text-gray-400 mb-6">Choose the microcontroller for which you want to generate the snippet.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mcuFamilies.map((mcu) => (
                  <Card 
                    key={mcu.id}
                    className={`cursor-pointer border-2 transition-all ${selectedMCU === mcu.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800 hover:border-gray-700 bg-gray-900'}`}
                    onClick={() => handleMCUChange(mcu.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="p-2 rounded-md bg-blue-500/20">
                          <Cpu className="h-5 w-5" />
                        </div>
                        {selectedMCU === mcu.id && (
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
          
          {/* Step 3: Define Requirements */}
          {activeStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Define Snippet Requirements</h2>
              <p className="text-gray-400 mb-6">Describe what you want the firmware snippet to do. Be as specific as possible.</p>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <Label htmlFor="requirements" className="text-sm font-medium mb-2 block">
                    Requirements Description
                  </Label>
                  <Textarea 
                    id="requirements"
                    placeholder="Example: I need a snippet to initialize and read from an external temperature sensor connected via I2C to my STM32 MCU. The sensor uses address 0x48 and requires a specific startup sequence..."
                    className="min-h-[200px] bg-gray-950 border-gray-800"
                    value={snippetRequirements}
                    onChange={handleRequirementsChange}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {snippetRequirements.length} characters (minimum 10 required)
                    {snippetRequirements.length < 10 && (
                      <span className="text-red-500 ml-2">
                        Please provide more details for better results
                      </span>
                    )}
                  </p>
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
          
          {/* Step 4: Advanced Options */}
          {activeStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Advanced Options</h2>
              <p className="text-gray-400 mb-6">Configure additional settings for your firmware snippet.</p>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="optimization" className="text-sm font-medium mb-2 block">
                        Code Optimization
                      </Label>
                      <Select 
                        value={advancedOptions.optimization} 
                        onValueChange={(value) => handleAdvancedOptionChange('optimization', value)}
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
                        Code Features
                      </Label>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="includeComments" 
                          checked={advancedOptions.includeComments}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('includeComments', checked)}
                        />
                        <Label htmlFor="includeComments" className="text-sm">
                          Include detailed comments
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="includeErrorHandling" 
                          checked={advancedOptions.includeErrorHandling}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('includeErrorHandling', checked)}
                        />
                        <Label htmlFor="includeErrorHandling" className="text-sm">
                          Include error handling
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="includeTestCode" 
                          checked={advancedOptions.includeTestCode}
                          onCheckedChange={(checked) => handleAdvancedOptionChange('includeTestCode', checked)}
                        />
                        <Label htmlFor="includeTestCode" className="text-sm">
                          Include test/example code
                        </Label>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="customIncludes" className="text-sm font-medium mb-2 block">
                        Custom Includes (Optional)
                      </Label>
                      <Textarea 
                        id="customIncludes"
                        placeholder="#include "custom_header.h"\n#include "project_config.h""
                        className="h-[100px] bg-gray-950 border-gray-800"
                        value={advancedOptions.customIncludes}
                        onChange={(e) => handleAdvancedOptionChange('customIncludes', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Code Style
                      </Label>
                      <RadioGroup 
                        value={codeStyle} 
                        onValueChange={setCodeStyle}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard">Standard (Default)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="minimal" id="minimal" />
                          <Label htmlFor="minimal">Minimal (Reduced verbosity)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="robust" id="robust" />
                          <Label htmlFor="robust">Robust (Extra validation)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="educational" id="educational" />
                          <Label htmlFor="educational">Educational (Detailed explanations)</Label>
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
          
          {/* Step 5: Generate Code */}
          {activeStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Generate Firmware Snippet</h2>
              <p className="text-gray-400 mb-6">Review your selections and generate the firmware snippet.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle>Generation Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
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
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="includeExamples" 
                            checked={includeExamples}
                            onCheckedChange={setIncludeExamples}
                          />
                          <Label htmlFor="includeExamples" className="text-sm">
                            Include usage examples
                          </Label>
                        </div>
                        
                        <Button 
                          onClick={generateSnippetCode} 
                          disabled={isGenerating || !isStepComplete(1) || !isStepComplete(2) || !isStepComplete(3)}
                          className="w-full"
                          size="lg"
                        >
                          {isGenerating ? (
                            <>
                              <span className="animate-pulse">Generating Snippet...</span>
                              <Progress value={generationProgress} className="h-1 mt-2" />
                            </>
                          ) : (
                            <>
                              <Zap className="mr-2 h-5 w-5" />
                              GENERATE SNIPPET CODE
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {generatedCode && (
                    <Card className="bg-gray-900 border-gray-800 mt-6">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>Generated Code</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-950 rounded-md p-4 overflow-auto max-h-[400px]">
                          <pre className="text-sm font-mono text-gray-300">
                            {generatedCode}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div>
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle>Generation Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Selected Category</h3>
                          <p className="text-white">
                            {snippetCategories.find(c => c.id === selectedCategory)?.name || 'None'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Target MCU</h3>
                          <p className="text-white">
                            {mcuFamilies.find(m => m.id === selectedMCU)?.name || 'None'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Code Style</h3>
                          <p className="text-white capitalize">{codeStyle}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Estimated Generation Time</h3>
                          <p className="text-white">~15-30 seconds</p>
                        </div>
                        
                        {(!isStepComplete(1) || !isStepComplete(2) || !isStepComplete(3)) && (
                          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-md p-3 mt-4">
                            <div className="flex">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-yellow-500">Incomplete Configuration</h4>
                                <ul className="text-xs text-yellow-500/80 mt-1 list-disc list-inside">
                                  {!isStepComplete(1) && <li>Select a snippet category</li>}
                                  {!isStepComplete(2) && <li>Select a target MCU</li>}
                                  {!isStepComplete(3) && <li>Define snippet requirements</li>}
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

// Helper function to get description for each category
function getDescriptionForCategory(categoryId) {
  switch (categoryId) {
    case 'peripheral':
      return 'Initialize and configure MCU peripherals like GPIO, ADC, DAC, etc.';
    case 'communication':
      return 'Implement communication protocols like UART, SPI, I2C, CAN, etc.';
    case 'power':
      return 'Manage power modes, sleep states, and low-power configurations.';
    case 'interrupt':
      return 'Set up and handle interrupts, ISRs, and priority management.';
    case 'memory':
      return 'Access and manage different memory types (Flash, RAM, EEPROM).';
    case 'timing':
      return 'Configure timers, delays, and scheduling mechanisms.';
    case 'bootloader':
      return 'Implement bootloader functionality for firmware updates.';
    case 'filesystem':
      return 'Work with file systems on external or internal storage.';
    case 'security':
      return 'Implement encryption, secure boot, and other security features.';
    case 'custom':
      return 'Create custom functionality specific to your application needs.';
    default:
      return 'Select a category to see its description.';
  }
}

// Helper function to get icon for Shield
function Shield({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
