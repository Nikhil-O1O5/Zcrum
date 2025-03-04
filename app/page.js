import { ChevronRight, Layout, Calendar, BarChart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CompanyCarousel from "@/components/company-carousel";
import faqs from "@/data/faqs"
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a111f]">
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">
          <span className="block">Streamline Your Workflow</span>
          <span className="flex items-center justify-center gap-2">
            with
            <Image
              src="/logo.png"
              alt="Zscrum Logo"
              width={400}
              height={80}
              className="h-14 sm:h-24 w-auto object-contain"
            />
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Empower yourself with our intuitive project management solution.
        </p>
        <div className="mt-6">
          <Link href="/onboarding">
            <Button size="lg" className="mr-4">
              Get Started <ChevronRight size={18} />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="mr-4">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-16 text-center">
        <h3 className="text-4xl font-bold text-white mb-6">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <CardContent className="flex flex-col items-center">
                <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                <h4 className="text-2xl font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Trusted by Industry Leaders</h3>
          <CompanyCarousel/>
        </div>
      </section>
      <section className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 text-center px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-xl mb-12">
            Join thousands of teams already using ZCRUM to streamline their
            projects and boost productivity.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="animate-bounce">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
