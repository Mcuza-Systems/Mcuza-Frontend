'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Code, Shield, Layers, Clock, Cpu, ArrowRight, Check, ChevronRight, X, Info, AlertCircle, Download, FileDown, Zap, Microchip, Settings, FileCode, Wrench } from 'lucide-react';
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

export default function HALSynthesizerIDE() {
  // State management for HAL generation workflow
  const [activeStep, setActiveStep] = useState(1);
  const [selectedMCU, setSelectedMCU] = useState('');
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);
  const [halSettings, setHalSettings] = useState({});
  const [advancedOptions, setAdvancedOptions] = useState({});
  const [codeStyle, setCodeStyle] = useState('standard');
  const [outputFormat, setOutputFormat] = useState('zip');
  const [includeExamples, setIncludeExamples] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Predefined data for MCU families and peripherals
  const mcuFamilies = [
    { id: 'stm32f4', name: 'STM32F4', color: 'blue', icon: <Microchip className="h-5 w-5" /> },
    { id: 'stm32f7', name: 'STM32F7', color: 'indigo', icon: <Microchip className="h-5 w-5" /> },
    { id: 'stm32h7', name: 'STM32H7', color: 'purple', icon: <Microchip className="h-5 w-5" /> },
    { id: 'atmega', name: 'ATmega', color: 'green', icon: <Microchip className="h-5 w-5" /> },
    { id: 'pic32', name: 'PIC32', color: 'red', icon: <Microchip className="h-5 w-5" /> },
    { id: 'esp32', name: 'ESP32', color: 'cyan', icon: <Microchip className="h-5 w-5" /> },
    { id: 'nrf52', name: 'nRF52', color: 'orange', icon: <Microchip className="h-5 w-5" /> },
    { id: 'msp430', name: 'MSP430', color: 'yellow', icon: <Microchip className="h-5 w-5" /> },
    { id: 'sam', name: 'SAM', color: 'pink', icon: <Microchip className="h-5 w-5" /> },
    { id: 'rp2040', name: 'RP2040', color: 'emerald', icon: <Microchip className="h-5 w-5" /> },
  ];
  
  const peripheralTypes = [
    { id: 'gpio', name: 'GPIO', description: 'General Purpose Input/Output' },
    { id: 'uart', name: 'UART', description: 'Universal Asynchronous Receiver/Transmitter' },
    { id: 'spi', name: 'SPI', description: 'Serial Peripheral Interface' },
    { id: 'i2c', name: 'I2C', description: 'Inter-Integrated Circuit' },
    { id: 'adc', name: 'ADC', description: 'Analog-to-Digital Converter' },
    { id: 'dac', name: 'DAC', description: 'Digital-to-Analog Converter' },
    { id: 'timer', name: 'Timer', description: 'Timer/Counter' },
    { id: 'pwm', name: 'PWM', description: 'Pulse Width Modulation' },
    { id: 'dma', name: 'DMA', description: 'Direct Memory Access' },
    { id: 'rtc', name: 'RTC', description: 'Real-Time Clock' },
    { id: 'watchdog', name: 'Watchdog', description: 'Watchdog Timer' },
    { id: 'flash', name: 'Flash', description: 'Flash Memory Interface' },
    { id: 'usb', name: 'USB', description: 'Universal Serial Bus' },
    { id: 'can', name: 'CAN', description: 'Controller Area Network' },
    { id: 'ethernet', name: 'Ethernet', description: 'Ethernet Controller' },
  ];
  
  const optimizationLevels = ['None', 'Size', 'Speed', 'Balanced'];
  const abstractionLevels = ['Low', 'Medium', 'High'];
  const threadingOptions = ['None', 'RTOS-Compatible', 'Interrupt-Based', 'Callback-Based'];
  const errorHandlingOptions = ['Basic', 'Advanced', 'Comprehensive'];
  
  // Helper functions
  const getMCUColor = (mcuId) => {
    const mcu = mcuFamilies.find(m => m.id === mcuId);
    return mcu ? mcu.color : 'gray';
  };
  
  const isStepComplete = (step) => {
    switch (step) {
      case 1: return !!selectedMCU;
      case 2: return selectedPeripherals.length > 0;
      case 3: return Object.keys(halSettings).length > 0;
      case 4: return true; // Advanced options are optional
      default: return false;
    }
  };
  
  const canProceedToNextStep = (currentStep) => {
    return isStepComplete(currentStep);
  };
  
  const getStepProgress = () => {
    let completedSteps = 0;
    for (let i = 1; i <= 4; i++) {
      if (isStepComplete(i)) completedSteps++;
    }
    return (completedSteps / 4) * 100;
  };
  
  // Navigation functions
  const goToNextStep = () => {
    if (activeStep < 5 && canProceedToNextStep(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  
  // MCU selection handler
  const handleMCUSelect = (mcuId) => {
    setSelectedMCU(mcuId);
    // Reset peripherals when changing MCU
    setSelectedPeripherals([]);
    setHalSettings({});
  };
  
  // Peripheral selection handler
  const handlePeripheralToggle = (peripheralId) => {
    setSelectedPeripherals(prev => {
      if (prev.includes(peripheralId)) {
        return prev.filter(id => id !== peripheralId);
      } else {
        return [...prev, peripheralId];
      }
    });
  };
  
  // HAL settings handlers
  const handleSettingChange = (setting, value) => {
    setHalSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleAdvancedOptionChange = (option, value) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };
  
  // Generation function
  const generateHALCode = () => {
    if (!canProceedToNextStep(4)) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate generation process
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          // Set example generated code
          setGeneratedCode(getExampleGeneratedCode());
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  // Example generated code based on selected MCU and peripherals
  const getExampleGeneratedCode = () => {
    // Get a sample peripheral for code generation
    const samplePeripheral = selectedPeripherals[0] || 'gpio';
    
    switch (samplePeripheral) {
      case 'gpio':
        return `/**
 * HAL GPIO Driver for ${mcuFamilies.find(m => m.id === selectedMCU)?.name || 'MCU'}
 * Generated by Smart HAL Synthesizer
 * Optimization: ${halSettings.optimization || 'Balanced'}
 * Abstraction Level: ${halSettings.abstractionLevel || 'Medium'}
 */

#include "${selectedMCU}_hal_gpio.h"

/* GPIO Port Structure Definition */
typedef struct {
    volatile uint32_t MODER;    /* Mode register */
    volatile uint32_t OTYPER;   /* Output type register */
    volatile uint32_t OSPEEDR;  /* Output speed register */
    volatile uint32_t PUPDR;    /* Pull-up/pull-down register */
    volatile uint32_t IDR;      /* Input data register */
    volatile uint32_t ODR;      /* Output data register */
    volatile uint32_t BSRR;     /* Bit set/reset register */
    volatile uint32_t LCKR;     /* Lock register */
    volatile uint32_t AFR[2];   /* Alternate function registers */
} GPIO_TypeDef;

/* GPIO Base Addresses */
#define GPIOA_BASE      (0x40020000UL)
#define GPIOB_BASE      (0x40020400UL)
#define GPIOC_BASE      (0x40020800UL)
#define GPIOD_BASE      (0x40020C00UL)
#define GPIOE_BASE      (0x40021000UL)

/* GPIO Port Instances */
#define GPIOA           ((GPIO_TypeDef *) GPIOA_BASE)
#define GPIOB           ((GPIO_TypeDef *) GPIOB_BASE)
#define GPIOC           ((GPIO_TypeDef *) GPIOC_BASE)
#define GPIOD           ((GPIO_TypeDef *) GPIOD_BASE)
#define GPIOE           ((GPIO_TypeDef *) GPIOE_BASE)

/* GPIO Mode Definitions */
#define GPIO_MODE_INPUT     0x00000000U
#define GPIO_MODE_OUTPUT    0x00000001U
#define GPIO_MODE_AF        0x00000002U
#define GPIO_MODE_ANALOG    0x00000003U

/* GPIO Pull-up/Pull-down Definitions */
#define GPIO_NOPULL         0x00000000U
#define GPIO_PULLUP         0x00000001U
#define GPIO_PULLDOWN       0x00000002U

/**
 * @brief Initialize GPIO pin
 * @param port: GPIO port (GPIOA, GPIOB, etc.)
 * @param pin: Pin number (0-15)
 * @param mode: Pin mode (GPIO_MODE_INPUT, GPIO_MODE_OUTPUT, etc.)
 * @param pull: Pull-up/pull-down configuration
 * @return HAL status
 */
HAL_StatusTypeDef HAL_GPIO_Init(GPIO_TypeDef *port, uint16_t pin, uint32_t mode, uint32_t pull) {
    /* Enable clock for GPIO port */
    /* Clock enabling code specific to ${selectedMCU} */
    
    /* Configure GPIO pin mode */
    uint32_t position = pin * 2;
    uint32_t moder = port->MODER;
    moder &= ~(0x3UL << position);
    moder |= (mode << position);
    port->MODER = moder;
    
    /* Configure pull-up/pull-down */
    uint32_t pupdr = port->PUPDR;
    pupdr &= ~(0x3UL << position);
    pupdr |= (pull << position);
    port->PUPDR = pupdr;
    
    return HAL_OK;
}

/**
 * @brief Set GPIO pin state
 * @param port: GPIO port (GPIOA, GPIOB, etc.)
 * @param pin: Pin number (0-15)
 * @param state: Pin state (0 or 1)
 */
void HAL_GPIO_WritePin(GPIO_TypeDef *port, uint16_t pin, uint8_t state) {
    if (state) {
        port->BSRR = (1UL << pin);
    } else {
        port->BSRR = (1UL << (pin + 16));
    }
}

/**
 * @brief Read GPIO pin state
 * @param port: GPIO port (GPIOA, GPIOB, etc.)
 * @param pin: Pin number (0-15)
 * @return Pin state (0 or 1)
 */
uint8_t HAL_GPIO_ReadPin(GPIO_TypeDef *port, uint16_t pin) {
    return (port->IDR & (1UL << pin)) ? 1 : 0;
}

/**
 * @brief Toggle GPIO pin state
 * @param port: GPIO port (GPIOA, GPIOB, etc.)
 * @param pin: Pin number (0-15)
 */
void HAL_GPIO_TogglePin(GPIO_TypeDef *port, uint16_t pin) {
    port->ODR ^= (1UL << pin);
}`;
      case 'uart':
        return `/**
 * HAL UART Driver for ${mcuFamilies.find(m => m.id === selectedMCU)?.name || 'MCU'}
 * Generated by Smart HAL Synthesizer
 * Optimization: ${halSettings.optimization || 'Balanced'}
 * Abstraction Level: ${halSettings.abstractionLevel || 'Medium'}
 */

#include "${selectedMCU}_hal_uart.h"

/* UART Structure Definition */
typedef struct {
    volatile uint32_t SR;       /* Status register */
    volatile uint32_t DR;       /* Data register */
    volatile uint32_t BRR;      /* Baud rate register */
    volatile uint32_t CR1;      /* Control register 1 */
    volatile uint32_t CR2;      /* Control register 2 */
    volatile uint32_t CR3;      /* Control register 3 */
    volatile uint32_t GTPR;     /* Guard time and prescaler register */
} UART_TypeDef;

/* UART Base Addresses */
#define UART1_BASE      (0x40011000UL)
#define UART2_BASE      (0x40004400UL)
#define UART3_BASE      (0x40004800UL)

/* UART Instances */
#define UART1           ((UART_TypeDef *) UART1_BASE)
#define UART2           ((UART_TypeDef *) UART2_BASE)
#define UART3           ((UART_TypeDef *) UART3_BASE)

/* UART Flags */
#define UART_FLAG_TXE       0x00000080U
#define UART_FLAG_RXNE      0x00000020U
#define UART_FLAG_IDLE      0x00000010U
#define UART_FLAG_ORE       0x00000008U
#define UART_FLAG_FE        0x00000002U

/**
 * @brief Initialize UART peripheral
 * @param huart: UART handle
 * @return HAL status
 */
HAL_StatusTypeDef HAL_UART_Init(UART_HandleTypeDef *huart) {
    /* Enable clock for UART peripheral */
    /* Clock enabling code specific to ${selectedMCU} */
    
    /* Configure UART parameters */
    uint32_t pclk = 0;
    uint32_t usartdiv = 0;
    
    /* Get clock frequency */
    /* Clock retrieval code specific to ${selectedMCU} */
    pclk = 84000000; /* Example clock frequency */
    
    /* Calculate baud rate register value */
    usartdiv = (pclk + (huart->Init.BaudRate/2)) / huart->Init.BaudRate;
    huart->Instance->BRR = usartdiv;
    
    /* Configure UART control registers */
    huart->Instance->CR1 = 0;
    huart->Instance->CR1 |= UART_CR1_TE | UART_CR1_RE; /* Enable transmitter and receiver */
    
    /* Configure word length, parity, stop bits */
    /* Configuration code based on huart->Init parameters */
    
    /* Enable UART */
    huart->Instance->CR1 |= UART_CR1_UE;
    
    return HAL_OK;
}

/**
 * @brief Send data over UART
 * @param huart: UART handle
 * @param pData: Pointer to data buffer
 * @param Size: Amount of data to send
 * @param Timeout: Timeout duration
 * @return HAL status
 */
HAL_StatusTypeDef HAL_UART_Transmit(UART_HandleTypeDef *huart, uint8_t *pData, uint16_t Size, uint32_t Timeout) {
    uint32_t tickstart = HAL_GetTick();
    
    for (uint16_t i = 0; i < Size; i++) {
        /* Wait for TXE flag */
        while (!(huart->Instance->SR & UART_FLAG_TXE)) {
            if ((HAL_GetTick() - tickstart) > Timeout) {
                return HAL_TIMEOUT;
            }
        }
        
        /* Transmit data */
        huart->Instance->DR = (*pData++ & 0xFF);
    }
    
    return HAL_OK;
}

/**
 * @brief Receive data over UART
 * @param huart: UART handle
 * @param pData: Pointer to data buffer
 * @param Size: Amount of data to receive
 * @param Timeout: Timeout duration
 * @return HAL status
 */
HAL_StatusTypeDef HAL_UART_Receive(UART_HandleTypeDef *huart, uint8_t *pData, uint16_t Size, uint32_t Timeout) {
    uint32_t tickstart = HAL_GetTick();
    
    for (uint16_t i = 0; i < Size; i++) {
        /* Wait for RXNE flag */
        while (!(huart->Instance->SR & UART_FLAG_RXNE)) {
            if ((HAL_GetTick() - tickstart) > Timeout) {
                return HAL_TIMEOUT;
            }
        }
        
        /* Receive data */
        *pData++ = (uint8_t)(huart->Instance->DR & 0xFF);
    }
    
    return HAL_OK;
}`;
      default:
        return `/**
 * HAL Driver for ${mcuFamilies.find(m => m.id === selectedMCU)?.name || 'MCU'} - ${peripheralTypes.find(p => p.id === samplePeripheral)?.name || 'Peripheral'}
 * Generated by Smart HAL Synthesizer
 * 
 * MCU: ${mcuFamilies.find(m => m.id === selectedMCU)?.name || 'Unknown'}
 * Peripherals: ${selectedPeripherals.map(p => peripheralTypes.find(pt => pt.id === p)?.name || p).join(', ')}
 * Settings: ${JSON.stringify(halSettings, null, 2)}
 * Advanced Options: ${JSON.stringify(advancedOptions, null, 2)}
 * Code Style: ${codeStyle}
 */

/* This is a placeholder for the actual generated HAL code */
/* The real implementation would include full peripheral driver */`;
    }
  };
  
  // Render HAL settings based on selected peripherals
  const renderHALSettings = () => {
    if (selectedPeripherals.length === 0) {
      return (
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50">
          <div className="flex items-center gap-2 text-yellow-400">
            <AlertCircle className="h-5 w-5" />
            <p>Please select at least one peripheral first.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="optimization">Optimization Level</Label>
          <Select 
            value={halSettings.optimization || ''} 
            onValueChange={(value) => handleSettingChange('optimization', value)}
          >
            <SelectTrigger id="optimization">
              <SelectValue placeholder="Select optimization level" />
            </SelectTrigger>
            <SelectContent>
              {optimizationLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">Determines the balance between code size and execution speed.</p>
        </div>
        
        <div>
          <Label htmlFor="abstractionLevel">Abstraction Level</Label>
          <Select 
            value={halSettings.abstractionLevel || ''} 
            onValueChange={(value) => handleSettingChange('abstractionLevel', value)}
          >
            <SelectTrigger id="abstractionLevel">
              <SelectValue placeholder="Select abstraction level" />
            </SelectTrigger>
            <SelectContent>
              {abstractionLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">Controls how much hardware details are abstracted away.</p>
        </div>
        
        <div>
          <Label htmlFor="threading">Threading Model</Label>
          <Select 
            value={halSettings.threading || ''} 
            onValueChange={(value) => handleSettingChange('threading', value)}
          >
            <SelectTrigger id="threading">
              <SelectValue placeholder="Select threading model" />
            </SelectTrigger>
            <SelectContent>
              {threadingOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">Defines how the HAL handles concurrent operations.</p>
        </div>
        
        <div>
          <Label htmlFor="errorHandling">Error Handling</Label>
          <Select 
            value={halSettings.errorHandling || ''} 
            onValueChange={(value) => handleSettingChange('errorHandling', value)}
          >
            <SelectTrigger id="errorHandling">
              <SelectValue placeholder="Select error handling approach" />
            </SelectTrigger>
            <SelectContent>
              {errorHandlingOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">Determines how errors are detected and reported.</p>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="includeComments" 
            checked={halSettings.includeComments || false} 
            onCheckedChange={(checked) => handleSettingChange('includeComments', checked)}
          />
          <Label htmlFor="includeComments">Include detailed comments</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="includeAsserts" 
            checked={halSettings.includeAsserts || false} 
            onCheckedChange={(checked) => handleSettingChange('includeAsserts', checked)}
          />
          <Label htmlFor="includeAsserts">Include parameter validation (asserts)</Label>
        </div>
      </div>
    );
  };
  
  // Render advanced options
  const renderAdvancedOptions = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="targetCompiler">Target Compiler</Label>
          <Select 
            value={advancedOptions.targetCompiler || ''} 
            onValueChange={(value) => handleAdvancedOptionChange('targetCompiler', value)}
          >
            <SelectTrigger id="targetCompiler">
              <SelectValue placeholder="Select target compiler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gcc">GCC</SelectItem>
              <SelectItem value="iar">IAR</SelectItem>
              <SelectItem value="keil">Keil</SelectItem>
              <SelectItem value="clang">Clang</SelectItem>
              <SelectItem value="generic">Generic (Compiler-Agnostic)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="memoryModel">Memory Model</Label>
          <Select 
            value={advancedOptions.memoryModel || ''} 
            onValueChange={(value) => handleAdvancedOptionChange('memoryModel', value)}
          >
            <SelectTrigger id="memoryModel">
              <SelectValue placeholder="Select memory model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="interruptPriorities">Interrupt Priority Levels</Label>
          <Input 
            id="interruptPriorities" 
            type="number" 
            min="1" 
            max="16" 
            placeholder="4" 
            value={advancedOptions.interruptPriorities || ''} 
            onChange={(e) => handleAdvancedOptionChange('interruptPriorities', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="prefixStyle">Function Prefix Style</Label>
          <RadioGroup 
            value={advancedOptions.prefixStyle || 'hal'} 
            onValueChange={(value) => handleAdvancedOptionChange('prefixStyle', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hal" id="prefix_hal" />
              <Label htmlFor="prefix_hal">HAL_Module_Function</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="module" id="prefix_module" />
              <Label htmlFor="prefix_module">Module_Function</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="prefix_custom" />
              <Label htmlFor="prefix_custom">Custom Prefix</Label>
            </div>
          </RadioGroup>
        </div>
        
        {advancedOptions.prefixStyle === 'custom' && (
          <div>
            <Label htmlFor="customPrefix">Custom Prefix</Label>
            <Input 
              id="customPrefix" 
              placeholder="MY_HAL" 
              value={advancedOptions.customPrefix || ''} 
              onChange={(e) => handleAdvancedOptionChange('customPrefix', e.target.value)}
            />
          </div>
        )}
        
        <div>
          <Label htmlFor="customOptions">Custom Options</Label>
          <Textarea 
            id="customOptions" 
            placeholder="Enter any custom options or requirements here..." 
            value={advancedOptions.customOptions || ''} 
            onChange={(e) => handleAdvancedOptionChange('customOptions', e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    );
  };
  
  // Render code style options
  const renderCodeStyleOptions = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label>Code Style</Label>
          <RadioGroup 
            value={codeStyle} 
            onValueChange={setCodeStyle}
            className="mt-2"
          >
            <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-800">
              <RadioGroupItem value="standard" id="style_standard" className="mt-1" />
              <div>
                <Label htmlFor="style_standard" className="font-medium">Standard</Label>
                <p className="text-sm text-gray-400">Clean, well-documented code following industry standards.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-800">
              <RadioGroupItem value="minimal" id="style_minimal" className="mt-1" />
              <div>
                <Label htmlFor="style_minimal" className="font-medium">Minimal</Label>
                <p className="text-sm text-gray-400">Compact code with essential functionality only.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-800">
              <RadioGroupItem value="robust" id="style_robust" className="mt-1" />
              <div>
                <Label htmlFor="style_robust" className="font-medium">Robust</Label>
                <p className="text-sm text-gray-400">Extensive error handling and validation for production use.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-800">
              <RadioGroupItem value="educational" id="style_educational" className="mt-1" />
              <div>
                <Label htmlFor="style_educational" className="font-medium">Educational</Label>
                <p className="text-sm text-gray-400">Heavily commented code explaining each step for learning purposes.</p>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <Label>Output Format</Label>
          <RadioGroup 
            value={outputFormat} 
            onValueChange={setOutputFormat}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="zip" id="format_zip" />
              <Label htmlFor="format_zip">ZIP Archive</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tar.gz" id="format_targz" />
              <Label htmlFor="format_targz">TAR.GZ Archive</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="format_individual" />
              <Label htmlFor="format_individual">Individual Files</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="includeExamples" 
            checked={includeExamples} 
            onCheckedChange={setIncludeExamples}
          />
          <Label htmlFor="includeExamples">Include usage examples</Label>
        </div>
      </div>
    );
  };
  
  // Render generation actions
  const renderGenerationActions = () => {
    const isConfigComplete = isStepComplete(1) && isStepComplete(2) && isStepComplete(3);
    
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className={`bg-gradient-to-r from-${getMCUColor(selectedMCU)}-600 to-${getMCUColor(selectedMCU)}-500 hover:from-${getMCUColor(selectedMCU)}-700 hover:to-${getMCUColor(selectedMCU)}-600 text-white border-0 shadow-lg text-lg px-8 py-6 ${!isConfigComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={generateHALCode}
            disabled={!isConfigComplete || isGenerating}
          >
            {isGenerating ? (
              <>
                <Zap className="mr-2 h-5 w-5 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                GENERATE HAL CODE
              </>
            )}
          </Button>
        </div>
        
        {!isConfigComplete && (
          <div className="p-4 border border-yellow-600/30 rounded-lg bg-yellow-900/20">
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>Please complete the required configuration steps before generating code.</p>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-yellow-300/70 ml-7 list-disc">
              {!isStepComplete(1) && <li>Select an MCU family</li>}
              {!isStepComplete(2) && <li>Select at least one peripheral</li>}
              {!isStepComplete(3) && <li>Configure HAL settings</li>}
            </ul>
          </div>
        )}
        
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Generating HAL code...</span>
              <span>{generationProgress}%</span>
            </div>
            <Progress value={generationProgress} className="h-2" />
          </div>
        )}
        
        {generatedCode && !isGenerating && (
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
              <FileDown className="mr-2 h-5 w-5" />
              Download Code
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
              <Code className="mr-2 h-5 w-5" />
              View Full Code
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  // Render generation information
  const renderGenerationInfo = () => {
    if (!selectedMCU) return null;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Generation Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">MCU Family</div>
            <div className="font-medium text-white flex items-center gap-2">
              {mcuFamilies.find(m => m.id === selectedMCU)?.icon}
              {mcuFamilies.find(m => m.id === selectedMCU)?.name}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">Code Style</div>
            <div className="font-medium text-white capitalize">{codeStyle}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">Optimization</div>
            <div className="font-medium text-white">{halSettings.optimization || 'Balanced'}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">Estimated Time</div>
            <div className="font-medium text-white">~20 seconds</div>
          </div>
        </div>
        
        {selectedPeripherals.length > 0 && (
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Selected Peripherals</div>
            <div className="flex flex-wrap gap-2">
              {selectedPeripherals.map(peripheralId => {
                const peripheral = peripheralTypes.find(p => p.id === peripheralId);
                return (
                  <Badge key={peripheralId} className="bg-gray-700 text-white">
                    {peripheral?.name || peripheralId}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        
        {Object.keys(halSettings).length > 0 && (
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Selected Settings</div>
            <div className="space-y-1">
              {Object.entries(halSettings).map(([key, value]) => {
                if (typeof value === 'boolean') {
                  return (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white">{value ? 'Yes' : 'No'}</span>
                    </div>
                  );
                }
                return (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-white">{value.toString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <section className="py-6 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
            <Link href="/products/embedded-systems/smart-hal-synthesizer">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Overview
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">Smart HAL Synthesizer</h1>
        </div>
        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">HAL Generator</Badge>
      </section>
      
      {/* Main content */}
      <section className="py-8 px-4 bg-gray-900/30 flex-1">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left sidebar - Steps */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-8 space-y-2">
                <h2 className="text-xl font-bold mb-4">Generator Steps</h2>
                
                <Button 
                  variant={activeStep === 1 ? "default" : "outline"}
                  className={`w-full justify-start ${activeStep === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 text-white hover:bg-gray-800'} ${isStepComplete(1) ? 'border-green-500' : ''}`}
                  onClick={() => setActiveStep(1)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isStepComplete(1) ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}>
                      {isStepComplete(1) ? <Check className="h-4 w-4" /> : '1'}
                    </div>
                    <span>Select MCU</span>
                  </div>
                </Button>
                
                <Button 
                  variant={activeStep === 2 ? "default" : "outline"}
                  className={`w-full justify-start ${activeStep === 2 ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 text-white hover:bg-gray-800'} ${isStepComplete(2) ? 'border-green-500' : ''}`}
                  onClick={() => setActiveStep(2)}
                  disabled={!isStepComplete(1)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isStepComplete(2) ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}>
                      {isStepComplete(2) ? <Check className="h-4 w-4" /> : '2'}
                    </div>
                    <span>Select Peripherals</span>
                  </div>
                </Button>
                
                <Button 
                  variant={activeStep === 3 ? "default" : "outline"}
                  className={`w-full justify-start ${activeStep === 3 ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 text-white hover:bg-gray-800'} ${isStepComplete(3) ? 'border-green-500' : ''}`}
                  onClick={() => setActiveStep(3)}
                  disabled={!isStepComplete(2)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isStepComplete(3) ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}>
                      {isStepComplete(3) ? <Check className="h-4 w-4" /> : '3'}
                    </div>
                    <span>HAL Settings</span>
                  </div>
                </Button>
                
                <Button 
                  variant={activeStep === 4 ? "default" : "outline"}
                  className={`w-full justify-start ${activeStep === 4 ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 text-white hover:bg-gray-800'} ${isStepComplete(4) ? 'border-green-500' : ''}`}
                  onClick={() => setActiveStep(4)}
                  disabled={!isStepComplete(3)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isStepComplete(4) ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}>
                      {isStepComplete(4) ? <Check className="h-4 w-4" /> : '4'}
                    </div>
                    <span>Advanced Options</span>
                  </div>
                </Button>
                
                <Button 
                  variant={activeStep === 5 ? "default" : "outline"}
                  className={`w-full justify-start ${activeStep === 5 ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 text-white hover:bg-gray-800'}`}
                  onClick={() => setActiveStep(5)}
                  disabled={!isStepComplete(4)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">
                      5
                    </div>
                    <span>Generate</span>
                  </div>
                </Button>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(getStepProgress())}%</span>
                  </div>
                  <Progress value={getStepProgress()} className="h-2" />
                </div>
                
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Need Help?</h3>
                  <p className="text-xs text-gray-400 mb-3">Our AI assistant can guide you through the HAL generation process.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs border-gray-600 text-white hover:bg-gray-700">
                    <Info className="mr-1 h-3 w-3" /> Get Assistance
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              <Card className="border-gray-700 bg-gray-800/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white">
                        {activeStep === 1 && "Select MCU Family"}
                        {activeStep === 2 && "Select Peripherals"}
                        {activeStep === 3 && "Configure HAL Settings"}
                        {activeStep === 4 && "Advanced Options"}
                        {activeStep === 5 && "Generate HAL Code"}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {activeStep === 1 && "Choose the microcontroller family for which you want to generate HAL code."}
                        {activeStep === 2 && "Select the peripherals you want to include in your HAL."}
                        {activeStep === 3 && "Configure the general settings for your HAL."}
                        {activeStep === 4 && "Set advanced options for your HAL generation."}
                        {activeStep === 5 && "Review your configuration and generate the HAL code."}
                      </CardDescription>
                    </div>
                    
                    {activeStep > 1 && (
                      <Button variant="ghost" onClick={goToPreviousStep} className="text-gray-400 hover:text-white hover:bg-gray-700">
                        <ArrowLeft className="mr-1 h-4 w-4" /> Back
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Step 1: Select MCU */}
                  {activeStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {mcuFamilies.map((mcu) => (
                          <div 
                            key={mcu.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedMCU === mcu.id ? `bg-${mcu.color}-900/20 border-${mcu.color}-500` : 'bg-gray-800/50 border-gray-700 hover:border-gray-500'}`}
                            onClick={() => handleMCUSelect(mcu.id)}
                          >
                            <div className="flex flex-col items-center text-center gap-2">
                              <div className={`w-12 h-12 rounded-full bg-${mcu.color}-900/30 border border-${mcu.color}-500/50 flex items-center justify-center`}>
                                {mcu.icon}
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{mcu.name}</h3>
                                {selectedMCU === mcu.id && (
                                  <Badge className={`bg-${mcu.color}-500/20 text-${mcu.color}-300 border-${mcu.color}-500/30 mt-1`}>
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={goToNextStep} 
                          disabled={!canProceedToNextStep(1)}
                          className={`${canProceedToNextStep(1) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Next Step <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Select Peripherals */}
                  {activeStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {peripheralTypes.map((peripheral) => (
                          <div 
                            key={peripheral.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedPeripherals.includes(peripheral.id) ? 'bg-blue-900/20 border-blue-500' : 'bg-gray-800/50 border-gray-700 hover:border-gray-500'}`}
                            onClick={() => handlePeripheralToggle(peripheral.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                <Checkbox 
                                  checked={selectedPeripherals.includes(peripheral.id)}
                                  className="pointer-events-none"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{peripheral.name}</h3>
                                <p className="text-xs text-gray-400">{peripheral.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={goToNextStep} 
                          disabled={!canProceedToNextStep(2)}
                          className={`${canProceedToNextStep(2) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Next Step <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: HAL Settings */}
                  {activeStep === 3 && (
                    <div className="space-y-6">
                      {renderHALSettings()}
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={goToNextStep} 
                          disabled={!canProceedToNextStep(3)}
                          className={`${canProceedToNextStep(3) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Next Step <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Advanced Options */}
                  {activeStep === 4 && (
                    <div className="space-y-6">
                      {renderAdvancedOptions()}
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={goToNextStep} 
                          disabled={!canProceedToNextStep(4)}
                          className={`${canProceedToNextStep(4) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Next Step <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 5: Generate */}
                  {activeStep === 5 && (
                    <div className="space-y-6">
                      {renderCodeStyleOptions()}
                      {renderGenerationActions()}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Preview and Information */}
              {activeStep === 5 && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <Card className="border-gray-700 bg-gray-800/30">
                    <CardHeader>
                      <CardTitle className="text-white">Generated HAL Preview</CardTitle>
                      <CardDescription className="text-gray-400">Preview of the generated HAL code.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                        <pre className="text-sm text-gray-300">
                          {generatedCode || "// HAL code will appear here after generation..."}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-700 bg-gray-800/30">
                    <CardHeader>
                      <CardTitle className="text-white">Generation Information</CardTitle>
                      <CardDescription className="text-gray-400">Details about your HAL configuration.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderGenerationInfo()}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
