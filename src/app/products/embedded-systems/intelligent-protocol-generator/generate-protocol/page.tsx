'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Code, Shield, Layers, Clock, Network, ArrowRight, Check, ChevronRight, X, Info, AlertCircle, Download, FileDown, Zap } from 'lucide-react';
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

export default function ProtocolGeneratorIDE() {
  // State management for protocol generation workflow
  const [activeStep, setActiveStep] = useState(1);
  const [selectedProtocol, setSelectedProtocol] = useState('');
  const [protocolSettings, setProtocolSettings] = useState({});
  const [advancedOptions, setAdvancedOptions] = useState({});
  const [codeStyle, setCodeStyle] = useState('standard');
  const [outputFormat, setOutputFormat] = useState('zip');
  const [includeExamples, setIncludeExamples] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Predefined data for protocol types and settings
  const protocolTypes = [
    { id: 'uart', name: 'UART', color: 'cyan', icon: <Network className="h-5 w-5" /> },
    { id: 'spi', name: 'SPI', color: 'blue', icon: <Network className="h-5 w-5" /> },
    { id: 'i2c', name: 'I2C', color: 'green', icon: <Network className="h-5 w-5" /> },
    { id: 'can', name: 'CAN', color: 'purple', icon: <Network className="h-5 w-5" /> },
    { id: 'modbus', name: 'Modbus', color: 'pink', icon: <Network className="h-5 w-5" /> },
    { id: 'tcp_ip', name: 'TCP/IP', color: 'yellow', icon: <Network className="h-5 w-5" /> },
    { id: 'usb', name: 'USB', color: 'orange', icon: <Network className="h-5 w-5" /> },
    { id: 'bluetooth', name: 'Bluetooth', color: 'indigo', icon: <Network className="h-5 w-5" /> },
    { id: 'zigbee', name: 'ZigBee', color: 'emerald', icon: <Network className="h-5 w-5" /> },
    { id: 'lora', name: 'LoRa', color: 'violet', icon: <Network className="h-5 w-5" /> },
  ];
  
  const baudRates = ['1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200', '230400', '460800', '921600'];
  const parityOptions = ['None', 'Even', 'Odd', 'Mark', 'Space'];
  const dataBits = ['5', '6', '7', '8', '9'];
  const stopBits = ['1', '1.5', '2'];
  const flowControl = ['None', 'Hardware', 'Software'];
  
  const spiModes = ['Mode 0 (CPOL=0, CPHA=0)', 'Mode 1 (CPOL=0, CPHA=1)', 'Mode 2 (CPOL=1, CPHA=0)', 'Mode 3 (CPOL=1, CPHA=1)'];
  const spiClockSpeeds = ['1 MHz', '5 MHz', '10 MHz', '20 MHz', '25 MHz', '50 MHz'];
  const spiDataOrders = ['MSB First', 'LSB First'];
  
  const i2cSpeeds = ['Standard (100 kHz)', 'Fast (400 kHz)', 'Fast Plus (1 MHz)', 'High Speed (3.4 MHz)'];
  const i2cAddressingModes = ['7-bit', '10-bit'];
  
  const canBitRates = ['125 kbps', '250 kbps', '500 kbps', '1 Mbps'];
  const canFrameFormats = ['Standard (11-bit)', 'Extended (29-bit)'];
  
  const modbusTypes = ['RTU', 'ASCII', 'TCP'];
  const modbusFunctions = ['Read Coils', 'Read Discrete Inputs', 'Read Holding Registers', 'Read Input Registers', 'Write Single Coil', 'Write Single Register', 'Write Multiple Coils', 'Write Multiple Registers'];
  
  const tcpipProtocols = ['TCP', 'UDP', 'HTTP', 'MQTT', 'CoAP'];
  
  const securityOptions = ['None', 'Basic Authentication', 'Encryption (AES)', 'Encryption (TLS/SSL)', 'Digital Signatures', 'Custom'];
  const errorHandlingOptions = ['Basic Error Codes', 'CRC Checksum', 'Parity Check', 'Retry Mechanism', 'Timeout Handling', 'Advanced Error Recovery'];
  
  // Helper functions
  const getProtocolColor = (protocolId) => {
    const protocol = protocolTypes.find(p => p.id === protocolId);
    return protocol ? protocol.color : 'gray';
  };
  
  const isStepComplete = (step) => {
    switch (step) {
      case 1: return !!selectedProtocol;
      case 2: return Object.keys(protocolSettings).length > 0;
      case 3: return true; // Advanced options are optional
      case 4: return true; // Code style is pre-selected
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
  
  // Protocol selection handler
  const handleProtocolSelect = (protocolId) => {
    setSelectedProtocol(protocolId);
    // Reset protocol settings when changing protocol type
    setProtocolSettings({});
  };
  
  // Protocol settings handlers
  const handleSettingChange = (setting, value) => {
    setProtocolSettings(prev => ({
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
  const generateProtocolCode = () => {
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
  
  // Example generated code based on protocol
  const getExampleGeneratedCode = () => {
    switch (selectedProtocol) {
      case 'uart':
        return `// UART Protocol Implementation
#include "uart.h"

/* Configuration */
UART_Config_t uartConfig = {
  .baudRate = ${protocolSettings.baudRate || '115200'},
  .dataBits = ${protocolSettings.dataBits || '8'},
  .parity = ${protocolSettings.parity ? `UART_PARITY_${protocolSettings.parity.toUpperCase()}` : 'UART_PARITY_NONE'},
  .stopBits = ${protocolSettings.stopBits || '1'},
  .flowControl = ${protocolSettings.flowControl ? `UART_FLOW_${protocolSettings.flowControl.toUpperCase()}` : 'UART_FLOW_NONE'}
};

/* Initialization */
void UART_Init(void) {
  UART_Configure(&uartConfig);
  UART_Enable();
}

/* Send Data */
void UART_SendData(uint8_t *data, uint16_t size) {
  for(uint16_t i = 0; i < size; i++) {
    UART_SendByte(data[i]);
  }
}

/* Receive Data */
uint16_t UART_ReceiveData(uint8_t *buffer, uint16_t maxSize) {
  uint16_t receivedBytes = 0;
  while(UART_DataAvailable() && receivedBytes < maxSize) {
    buffer[receivedBytes++] = UART_ReceiveByte();
  }
  return receivedBytes;
}`;
      case 'spi':
        return `// SPI Protocol Implementation
#include "spi.h"

/* Configuration */
SPI_Config_t spiConfig = {
  .mode = ${spiModes.indexOf(protocolSettings.mode || 'Mode 0 (CPOL=0, CPHA=0)')},
  .clockSpeed = ${protocolSettings.clockSpeed || '1000000'}, /* Hz */
  .dataOrder = ${protocolSettings.dataOrder === 'LSB First' ? 'SPI_LSB_FIRST' : 'SPI_MSB_FIRST'}
};

/* Initialization */
void SPI_Init(void) {
  SPI_Configure(&spiConfig);
  SPI_Enable();
}

/* Transfer Data */
void SPI_Transfer(uint8_t *txData, uint8_t *rxData, uint16_t size) {
  SPI_ChipSelect(SPI_CS_ENABLE);
  
  for(uint16_t i = 0; i < size; i++) {
    rxData[i] = SPI_TransferByte(txData[i]);
  }
  
  SPI_ChipSelect(SPI_CS_DISABLE);
}`;
      case 'i2c':
        return `// I2C Protocol Implementation
#include "i2c.h"

/* Configuration */
I2C_Config_t i2cConfig = {
  .speed = ${protocolSettings.speed === 'Standard (100 kHz)' ? '100000' : 
            protocolSettings.speed === 'Fast (400 kHz)' ? '400000' : 
            protocolSettings.speed === 'Fast Plus (1 MHz)' ? '1000000' : '3400000'}, /* Hz */
  .addressingMode = ${protocolSettings.addressingMode === '10-bit' ? 'I2C_ADDR_10BIT' : 'I2C_ADDR_7BIT'}
};

/* Initialization */
void I2C_Init(void) {
  I2C_Configure(&i2cConfig);
  I2C_Enable();
}

/* Write Data */
I2C_Status_t I2C_WriteData(uint8_t deviceAddress, uint8_t *data, uint16_t size) {
  I2C_Start();
  
  if(I2C_SendAddress(deviceAddress, I2C_WRITE) != I2C_ACK) {
    I2C_Stop();
    return I2C_ERROR_ADDR_NACK;
  }
  
  for(uint16_t i = 0; i < size; i++) {
    if(I2C_SendByte(data[i]) != I2C_ACK) {
      I2C_Stop();
      return I2C_ERROR_DATA_NACK;
    }
  }
  
  I2C_Stop();
  return I2C_SUCCESS;
}

/* Read Data */
I2C_Status_t I2C_ReadData(uint8_t deviceAddress, uint8_t *buffer, uint16_t size) {
  I2C_Start();
  
  if(I2C_SendAddress(deviceAddress, I2C_READ) != I2C_ACK) {
    I2C_Stop();
    return I2C_ERROR_ADDR_NACK;
  }
  
  for(uint16_t i = 0; i < size - 1; i++) {
    buffer[i] = I2C_ReceiveByte(I2C_ACK);
  }
  
  buffer[size - 1] = I2C_ReceiveByte(I2C_NACK);
  
  I2C_Stop();
  return I2C_SUCCESS;
}`;
      default:
        return `// Generated Protocol Code
// Protocol: ${selectedProtocol.toUpperCase()}
// Settings: ${JSON.stringify(protocolSettings, null, 2)}
// Advanced Options: ${JSON.stringify(advancedOptions, null, 2)}
// Code Style: ${codeStyle}

/* This is a placeholder for the actual generated code */
/* The real implementation would include full protocol stack */`;
    }
  };
  
  // Render protocol settings based on selected protocol
  const renderProtocolSettings = () => {
    if (!selectedProtocol) return null;
    
    switch (selectedProtocol) {
      case 'uart':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="baudRate">Baud Rate</Label>
              <Select 
                value={protocolSettings.baudRate || ''} 
                onValueChange={(value) => handleSettingChange('baudRate', value)}
              >
                <SelectTrigger id="baudRate">
                  <SelectValue placeholder="Select baud rate" />
                </SelectTrigger>
                <SelectContent>
                  {baudRates.map(rate => (
                    <SelectItem key={rate} value={rate}>{rate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dataBits">Data Bits</Label>
              <Select 
                value={protocolSettings.dataBits || ''} 
                onValueChange={(value) => handleSettingChange('dataBits', value)}
              >
                <SelectTrigger id="dataBits">
                  <SelectValue placeholder="Select data bits" />
                </SelectTrigger>
                <SelectContent>
                  {dataBits.map(bits => (
                    <SelectItem key={bits} value={bits}>{bits}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="parity">Parity</Label>
              <Select 
                value={protocolSettings.parity || ''} 
                onValueChange={(value) => handleSettingChange('parity', value)}
              >
                <SelectTrigger id="parity">
                  <SelectValue placeholder="Select parity" />
                </SelectTrigger>
                <SelectContent>
                  {parityOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="stopBits">Stop Bits</Label>
              <Select 
                value={protocolSettings.stopBits || ''} 
                onValueChange={(value) => handleSettingChange('stopBits', value)}
              >
                <SelectTrigger id="stopBits">
                  <SelectValue placeholder="Select stop bits" />
                </SelectTrigger>
                <SelectContent>
                  {stopBits.map(bits => (
                    <SelectItem key={bits} value={bits}>{bits}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="flowControl">Flow Control</Label>
              <Select 
                value={protocolSettings.flowControl || ''} 
                onValueChange={(value) => handleSettingChange('flowControl', value)}
              >
                <SelectTrigger id="flowControl">
                  <SelectValue placeholder="Select flow control" />
                </SelectTrigger>
                <SelectContent>
                  {flowControl.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 'spi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mode">SPI Mode</Label>
              <Select 
                value={protocolSettings.mode || ''} 
                onValueChange={(value) => handleSettingChange('mode', value)}
              >
                <SelectTrigger id="mode">
                  <SelectValue placeholder="Select SPI mode" />
                </SelectTrigger>
                <SelectContent>
                  {spiModes.map(mode => (
                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="clockSpeed">Clock Speed</Label>
              <Select 
                value={protocolSettings.clockSpeed || ''} 
                onValueChange={(value) => handleSettingChange('clockSpeed', value)}
              >
                <SelectTrigger id="clockSpeed">
                  <SelectValue placeholder="Select clock speed" />
                </SelectTrigger>
                <SelectContent>
                  {spiClockSpeeds.map(speed => (
                    <SelectItem key={speed} value={speed}>{speed}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dataOrder">Data Order</Label>
              <Select 
                value={protocolSettings.dataOrder || ''} 
                onValueChange={(value) => handleSettingChange('dataOrder', value)}
              >
                <SelectTrigger id="dataOrder">
                  <SelectValue placeholder="Select data order" />
                </SelectTrigger>
                <SelectContent>
                  {spiDataOrders.map(order => (
                    <SelectItem key={order} value={order}>{order}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="chipSelectPolarity">Chip Select Polarity</Label>
              <RadioGroup 
                value={protocolSettings.chipSelectPolarity || 'active_low'} 
                onValueChange={(value) => handleSettingChange('chipSelectPolarity', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active_low" id="cs_active_low" />
                  <Label htmlFor="cs_active_low">Active Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active_high" id="cs_active_high" />
                  <Label htmlFor="cs_active_high">Active High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
        
      case 'i2c':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="speed">I2C Speed</Label>
              <Select 
                value={protocolSettings.speed || ''} 
                onValueChange={(value) => handleSettingChange('speed', value)}
              >
                <SelectTrigger id="speed">
                  <SelectValue placeholder="Select I2C speed" />
                </SelectTrigger>
                <SelectContent>
                  {i2cSpeeds.map(speed => (
                    <SelectItem key={speed} value={speed}>{speed}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="addressingMode">Addressing Mode</Label>
              <Select 
                value={protocolSettings.addressingMode || ''} 
                onValueChange={(value) => handleSettingChange('addressingMode', value)}
              >
                <SelectTrigger id="addressingMode">
                  <SelectValue placeholder="Select addressing mode" />
                </SelectTrigger>
                <SelectContent>
                  {i2cAddressingModes.map(mode => (
                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="deviceAddress">Device Address (Hex)</Label>
              <Input 
                id="deviceAddress" 
                placeholder="0x48" 
                value={protocolSettings.deviceAddress || ''} 
                onChange={(e) => handleSettingChange('deviceAddress', e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pullups" 
                checked={protocolSettings.pullups || false} 
                onCheckedChange={(checked) => handleSettingChange('pullups', checked)}
              />
              <Label htmlFor="pullups">Enable Internal Pull-ups</Label>
            </div>
          </div>
        );
        
      case 'can':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bitRate">Bit Rate</Label>
              <Select 
                value={protocolSettings.bitRate || ''} 
                onValueChange={(value) => handleSettingChange('bitRate', value)}
              >
                <SelectTrigger id="bitRate">
                  <SelectValue placeholder="Select bit rate" />
                </SelectTrigger>
                <SelectContent>
                  {canBitRates.map(rate => (
                    <SelectItem key={rate} value={rate}>{rate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="frameFormat">Frame Format</Label>
              <Select 
                value={protocolSettings.frameFormat || ''} 
                onValueChange={(value) => handleSettingChange('frameFormat', value)}
              >
                <SelectTrigger id="frameFormat">
                  <SelectValue placeholder="Select frame format" />
                </SelectTrigger>
                <SelectContent>
                  {canFrameFormats.map(format => (
                    <SelectItem key={format} value={format}>{format}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="samplePoint">Sample Point (%)</Label>
              <Input 
                id="samplePoint" 
                type="number" 
                min="50" 
                max="90" 
                placeholder="75" 
                value={protocolSettings.samplePoint || ''} 
                onChange={(e) => handleSettingChange('samplePoint', e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="autoRetransmission" 
                checked={protocolSettings.autoRetransmission || false} 
                onCheckedChange={(checked) => handleSettingChange('autoRetransmission', checked)}
              />
              <Label htmlFor="autoRetransmission">Enable Auto Retransmission</Label>
            </div>
          </div>
        );
        
      case 'modbus':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="modbusType">Modbus Type</Label>
              <Select 
                value={protocolSettings.modbusType || ''} 
                onValueChange={(value) => handleSettingChange('modbusType', value)}
              >
                <SelectTrigger id="modbusType">
                  <SelectValue placeholder="Select Modbus type" />
                </SelectTrigger>
                <SelectContent>
                  {modbusTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="slaveAddress">Slave Address</Label>
              <Input 
                id="slaveAddress" 
                type="number" 
                min="1" 
                max="247" 
                placeholder="1" 
                value={protocolSettings.slaveAddress || ''} 
                onChange={(e) => handleSettingChange('slaveAddress', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Supported Functions</Label>
              <div className="space-y-2 mt-2">
                {modbusFunctions.map(func => (
                  <div key={func} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`func_${func.replace(/\s+/g, '_').toLowerCase()}`} 
                      checked={protocolSettings.functions?.includes(func) || false} 
                      onCheckedChange={(checked) => {
                        const updatedFunctions = [...(protocolSettings.functions || [])];
                        if (checked) {
                          updatedFunctions.push(func);
                        } else {
                          const index = updatedFunctions.indexOf(func);
                          if (index !== -1) updatedFunctions.splice(index, 1);
                        }
                        handleSettingChange('functions', updatedFunctions);
                      }}
                    />
                    <Label htmlFor={`func_${func.replace(/\s+/g, '_').toLowerCase()}`}>{func}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'tcp_ip':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="tcpipProtocol">Protocol</Label>
              <Select 
                value={protocolSettings.tcpipProtocol || ''} 
                onValueChange={(value) => handleSettingChange('tcpipProtocol', value)}
              >
                <SelectTrigger id="tcpipProtocol">
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  {tcpipProtocols.map(protocol => (
                    <SelectItem key={protocol} value={protocol}>{protocol}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="ipAddress">IP Address</Label>
              <Input 
                id="ipAddress" 
                placeholder="192.168.1.100" 
                value={protocolSettings.ipAddress || ''} 
                onChange={(e) => handleSettingChange('ipAddress', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="port">Port</Label>
              <Input 
                id="port" 
                type="number" 
                min="1" 
                max="65535" 
                placeholder="8080" 
                value={protocolSettings.port || ''} 
                onChange={(e) => handleSettingChange('port', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="socketType">Socket Type</Label>
              <RadioGroup 
                value={protocolSettings.socketType || 'client'} 
                onValueChange={(value) => handleSettingChange('socketType', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="socket_client" />
                  <Label htmlFor="socket_client">Client</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="server" id="socket_server" />
                  <Label htmlFor="socket_server">Server</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertCircle className="h-5 w-5" />
              <p>Please select a protocol type first.</p>
            </div>
          </div>
        );
    }
  };
  
  // Render advanced options
  const renderAdvancedOptions = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="security">Security</Label>
          <Select 
            value={advancedOptions.security || ''} 
            onValueChange={(value) => handleAdvancedOptionChange('security', value)}
          >
            <SelectTrigger id="security">
              <SelectValue placeholder="Select security option" />
            </SelectTrigger>
            <SelectContent>
              {securityOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="errorHandling">Error Handling</Label>
          <Select 
            value={advancedOptions.errorHandling || ''} 
            onValueChange={(value) => handleAdvancedOptionChange('errorHandling', value)}
          >
            <SelectTrigger id="errorHandling">
              <SelectValue placeholder="Select error handling" />
            </SelectTrigger>
            <SelectContent>
              {errorHandlingOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="bufferSize">Buffer Size (bytes)</Label>
          <Input 
            id="bufferSize" 
            type="number" 
            min="8" 
            max="4096" 
            placeholder="256" 
            value={advancedOptions.bufferSize || ''} 
            onChange={(e) => handleAdvancedOptionChange('bufferSize', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="timeout">Timeout (ms)</Label>
          <Input 
            id="timeout" 
            type="number" 
            min="10" 
            max="10000" 
            placeholder="1000" 
            value={advancedOptions.timeout || ''} 
            onChange={(e) => handleAdvancedOptionChange('timeout', e.target.value)}
          />
        </div>
        
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
    const isConfigComplete = isStepComplete(1) && isStepComplete(2);
    
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className={`bg-gradient-to-r from-${getProtocolColor(selectedProtocol)}-600 to-${getProtocolColor(selectedProtocol)}-500 hover:from-${getProtocolColor(selectedProtocol)}-700 hover:to-${getProtocolColor(selectedProtocol)}-600 text-white border-0 shadow-lg text-lg px-8 py-6 ${!isConfigComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={generateProtocolCode}
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
                GENERATE PROTOCOL CODE
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
              {!isStepComplete(1) && <li>Select a protocol type</li>}
              {!isStepComplete(2) && <li>Configure protocol settings</li>}
            </ul>
          </div>
        )}
        
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Generating protocol code...</span>
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
    if (!selectedProtocol) return null;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Generation Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">Protocol</div>
            <div className="font-medium text-white flex items-center gap-2">
              {protocolTypes.find(p => p.id === selectedProtocol)?.icon}
              {protocolTypes.find(p => p.id === selectedProtocol)?.name}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">Code Style</div>
            <div className="font-medium text-white capitalize">{codeStyle}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">Security</div>
            <div className="font-medium text-white">{advancedOptions.security || 'None'}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400">Estimated Time</div>
            <div className="font-medium text-white">~15 seconds</div>
          </div>
        </div>
        
        {Object.keys(protocolSettings).length > 0 && (
          <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Selected Settings</div>
            <div className="space-y-1">
              {Object.entries(protocolSettings).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-white">{Array.isArray(value) ? value.join(', ') : value.toString()}</span>
                </div>
              ))}
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
            <Link href="/products/embedded-systems/intelligent-protocol-generator">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Overview
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">Intelligent Protocol Generator</h1>
        </div>
        <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0">Protocol Generator</Badge>
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
                    <span>Select Protocol</span>
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
                    <span>Protocol Settings</span>
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
                    <span>Advanced Options</span>
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
                    <span>Code Style</span>
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
                  <p className="text-xs text-gray-400 mb-3">Our AI assistant can guide you through the protocol generation process.</p>
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
                        {activeStep === 1 && "Select Protocol Type"}
                        {activeStep === 2 && "Configure Protocol Settings"}
                        {activeStep === 3 && "Advanced Protocol Options"}
                        {activeStep === 4 && "Code Style & Output Format"}
                        {activeStep === 5 && "Generate Protocol Code"}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {activeStep === 1 && "Choose the communication protocol you want to generate."}
                        {activeStep === 2 && "Configure the specific settings for your selected protocol."}
                        {activeStep === 3 && "Set advanced options for security, error handling, and more."}
                        {activeStep === 4 && "Select your preferred code style and output format."}
                        {activeStep === 5 && "Review your configuration and generate the protocol code."}
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
                  {/* Step 1: Select Protocol */}
                  {activeStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {protocolTypes.map((protocol) => (
                          <div 
                            key={protocol.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedProtocol === protocol.id ? `bg-${protocol.color}-900/20 border-${protocol.color}-500` : 'bg-gray-800/50 border-gray-700 hover:border-gray-500'}`}
                            onClick={() => handleProtocolSelect(protocol.id)}
                          >
                            <div className="flex flex-col items-center text-center gap-2">
                              <div className={`w-12 h-12 rounded-full bg-${protocol.color}-900/30 border border-${protocol.color}-500/50 flex items-center justify-center`}>
                                {protocol.icon}
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{protocol.name}</h3>
                                {selectedProtocol === protocol.id && (
                                  <Badge className={`bg-${protocol.color}-500/20 text-${protocol.color}-300 border-${protocol.color}-500/30 mt-1`}>
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
                  
                  {/* Step 2: Protocol Settings */}
                  {activeStep === 2 && (
                    <div className="space-y-6">
                      {renderProtocolSettings()}
                      
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
                  
                  {/* Step 3: Advanced Options */}
                  {activeStep === 3 && (
                    <div className="space-y-6">
                      {renderAdvancedOptions()}
                      
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
                  
                  {/* Step 4: Code Style */}
                  {activeStep === 4 && (
                    <div className="space-y-6">
                      {renderCodeStyleOptions()}
                      
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
                      <CardTitle className="text-white">Generated Protocol Preview</CardTitle>
                      <CardDescription className="text-gray-400">Preview of the generated protocol code.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                        <pre className="text-sm text-gray-300">
                          {generatedCode || "// Protocol code will appear here after generation..."}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-700 bg-gray-800/30">
                    <CardHeader>
                      <CardTitle className="text-white">Generation Information</CardTitle>
                      <CardDescription className="text-gray-400">Details about your protocol configuration.</CardDescription>
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
