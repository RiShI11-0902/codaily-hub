import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Heart, Lightbulb } from "lucide-react";

const About = () => {
  const team = [
    { name: "Alex Johnson", role: "Founder & CEO", initials: "AJ" },
    { name: "Maria Garcia", role: "Head of Engineering", initials: "MG" },
    { name: "David Kim", role: "Product Designer", initials: "DK" },
    { name: "Sarah Williams", role: "Community Manager", initials: "SW" },
  ];

  const faqs = [
    {
      question: "What is 2CodeDaily?",
      answer: "2CodeDaily is a platform that helps developers improve their coding skills through daily challenges and curated problem packs. We provide structured learning paths for all skill levels.",
    },
    {
      question: "How does the subscription work?",
      answer: "We offer flexible monthly and yearly plans. All plans include access to daily challenges, progress tracking, and community features. Premium plans unlock additional packs and analytics.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! You can cancel your subscription at any time with no penalties. Your access will continue until the end of your current billing period.",
    },
    {
      question: "Is there a free trial?",
      answer: "Absolutely! We offer a 7-day free trial for new users to explore all features before committing to a subscription.",
    },
    {
      question: "What programming languages are supported?",
      answer: "We support all major programming languages including Python, JavaScript, Java, C++, and more. Problems can be solved in your language of choice.",
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
            Our mission is to make coding practice accessible, engaging, and effective for developers at every stage of their journey.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-heading">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">Focus on Growth</h3>
                <p className="text-muted-foreground">
                  We believe in continuous improvement and providing the tools to track and celebrate progress.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">Community First</h3>
                <p className="text-muted-foreground">
                  Learning is better together. We foster a supportive community where everyone can thrive.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <Lightbulb className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">Quality Content</h3>
                <p className="text-muted-foreground">
                  Every challenge is carefully curated to provide maximum learning value and real-world relevance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-heading">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-secondary via-primary to-accent flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-heading">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 shadow-card">
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
