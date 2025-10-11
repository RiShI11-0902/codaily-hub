import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Heart, Lightbulb, Github, Instagram, Linkedin } from "lucide-react";

const About = () => {
  const faqs = [
    {
      question: "What is 2CodeDaily?",
      answer:
        "2CodeDaily is a platform that helps developers improve their coding skills through daily challenges and curated problem packs. We provide structured learning paths for all skill levels.",
    },
    {
      question: "How does the subscription work?",
      answer:
        "We offer flexible monthly and yearly plans. All plans include access to daily challenges, progress tracking, and community features. Premium plans unlock additional packs and analytics.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes! You can cancel your subscription at any time with no penalties. Your access will continue until the end of your current billing period.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Absolutely! We offer a 7-day free trial for new users to explore all features before committing to a subscription.",
    },
    {
      question: "What programming languages are supported?",
      answer:
        "We support all major programming languages including Python, JavaScript, Java, C++, and more. Problems can be solved in your language of choice.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Mission Section */}
        <section className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-heading">
            About 2CodeDaily
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My mission is to make interview preparation smarter and more accessible for developers at all levels. By integrating AI-driven mock interviews directly into the browser, this extension helps you prepare efficiently with real LeetCode questions — no need to search, schedule, or stress. Just open it up and start practicing like it's the real thing.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-heading">
            About the Developer
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <Card className="shadow-card hover:shadow-card-hover transition-all ">
              <CardContent className="p-8 text-center flex flex-col items-center space-y-4">
                {/* Avatar Section */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                  RB
                </div>

                {/* Name + Role */}
                <div className="text-center">
                  <h4 className="text-2xl font-bold bg-clip-text text-transparent gradient-heading">
                    Rushikesh Bagade
                  </h4>
                  <p className="text-blue-300 font-medium mt-1">Founder & Developer</p>
                </div>

                {/* Bio */}
                <p className="text-blue-100 leading-relaxed max-w-xl mx-auto">
                  I'm a passionate software developer who loves solving problems and
                  building things that help others. 2CodeDaily is a result of my own
                  experiences as a coder — built to make interview prep smarter, faster,
                  and fun. I hope it helps you on your journey as much as it helped me!
                </p>
              </CardContent>

              {/* Footer: Social Links */}
              <CardFooter className="pt-0">
                <div className="flex justify-center gap-6 w-full">
                  <a
                    href="https://www.linkedin.com/in/rushikesh-bagade11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100 hover:text-purple-400 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/RiShI11-0902"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100 hover:text-purple-400 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/rishi_codes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100 hover:text-purple-400 transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </CardFooter>
            </Card>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-heading">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
};

export default About;
