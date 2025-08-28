import Link from 'next/link';
import { ArrowRight, Target, Users, Lightbulb, Globe, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function About() {
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation First",
      description: "We push the boundaries of what's possible in electronics development through cutting-edge AI technology."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Our platform is built for and with the electronics community, from hobbyists to enterprise engineers."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Excellence in Execution",
      description: "Every tool we create is production-ready, reliable, and designed to meet industry standards."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Accessibility for All",
      description: "Making advanced electronics development tools accessible to everyone, regardless of experience level."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Co-Founder",
      background: "Former Principal Engineer at Tesla, PhD in Electrical Engineering from MIT",
      focus: "AI-driven hardware design and embedded systems"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      background: "Ex-Google Senior Staff Engineer, MS Computer Science from Stanford",
      focus: "Machine learning infrastructure and platform scalability"
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Head of AI Research",
      background: "Former Research Scientist at NVIDIA, PhD in Computer Science from CMU",
      focus: "Neural code generation and hardware optimization"
    },
    {
      name: "Lisa Rodriguez",
      role: "VP of Engineering",
      background: "Former Engineering Manager at Apple, BS in Computer Engineering",
      focus: "Product development and user experience"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "MCUZA was founded with a vision to democratize electronics development through AI"
    },
    {
      year: "2023",
      title: "First Product Launch",
      description: "Launched our Intelligent Drivers Generator, helping thousands of developers"
    },
    {
      year: "2024", 
      title: "Rapid Prototyping",
      description: "Introduced our flagship rapid prototyping feature, revolutionizing project development"
    },
    {
      year: "2024",
      title: "10K+ Users",
      description: "Reached 10,000+ active users across 50+ countries worldwide"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-30"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
            🚀 About MCUZA
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Empowering the Next Generation of
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">Electronics Innovators</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make electronics development faster, smarter, and accessible to everyone through the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                At MCUZA, we believe that great ideas shouldn't be limited by technical barriers. Our mission is to democratize electronics development by providing AI-powered tools that transform concepts into production-ready solutions in minutes, not months.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Whether you're a seasoned engineer at a Fortune 500 company, a student learning embedded systems, or a hobbyist with a brilliant idea, MCUZA empowers you to bring your vision to life with unprecedented speed and precision.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 shadow-lg" asChild>
                <Link href="/rapid-prototyping">
                  Experience Our Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="text-center p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
                    <div className="text-sm text-gray-400">Projects Created</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 mb-2">100+</div>
                    <div className="text-sm text-gray-400">MCUs Supported</div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6 mt-8">
                <Card className="text-center p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
                    <div className="text-sm text-gray-400">Active Users</div>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                    <div className="text-sm text-gray-400">Countries</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at MCUZA
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border border-gray-700 bg-gray-800/50 shadow-lg hover:bg-gray-800/70 hover:shadow-blue-500/25 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 mb-4 mx-auto">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-300">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              World-class engineers and researchers building the future of electronics development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Users className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{member.name}</CardTitle>
                      <CardDescription className="text-blue-400 font-medium">
                        {member.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-3">{member.background}</p>
                  <p className="text-sm text-blue-400 font-medium">Focus: {member.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey & Milestones */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Journey</h2>
            <p className="text-xl text-gray-300">
              Key milestones in our mission to transform electronics development
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="p-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <CardContent>
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-lg px-3 py-1 border-blue-500 text-blue-400">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Powered by Cutting-Edge AI
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Our platform leverages advanced machine learning models trained on millions of electronics projects, datasheets, and industry best practices. This enables us to generate production-ready code, optimize hardware designs, and suggest the best components for any project.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Patent-pending AI code generation technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Continuously learning from community feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Real-time component pricing and availability</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 p-8 rounded-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-white">Platform Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                    <div className="text-sm text-gray-400">Code Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">70%</div>
                    <div className="text-sm text-gray-400">Time Saved</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">5min</div>
                    <div className="text-sm text-gray-400">Avg Generation Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                    <div className="text-sm text-gray-400">Platform Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Join the Electronics Revolution
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Be part of a community that's reshaping how electronics are designed and built
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-white text-blue-900 hover:bg-gray-100 border-0 shadow-lg">
              <Link href="/signup">
                Start Building Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
