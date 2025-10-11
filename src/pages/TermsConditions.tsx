import React from 'react'
import { Card, CardContent } from "@/components/ui/card";

const TermsConditions = () => {
    const termsAndConditions = [
    {
      id: 1,
      title: "Service Description",
      description:
        "We simulate mock interviews using LeetCode-style questions to help you prepare for coding interviews effectively.",
    },
    {
      id: 2,
      title: "No Affiliation with LeetCode",
      description:
        "We are not affiliated with or endorsed by LeetCode. We use public patterns to deliver a personalized interview experience.",
    },
    {
      id: 3,
      title: "User Responsibilities",
      description:
        "Use our extension only for personal learning and preparation. Redistribution, modification, or resale is strictly prohibited.",
    },
    {
      id: 4,
      title: "Payments",
      description:
        "Users receive 3 mock interviews for free. Payment is only required to access additional features if desired. All payments are handled securely through trusted platforms.",
    },
    {
      id: 5,
      title: "Intellectual Property",
      description:
        "While we base interview content on commonly known LeetCode-style problems, all AI-generated content is original and does not replicate exact questions.",
    },
    {
      id: 6,
      title: "Termination",
      description:
        "We reserve the right to suspend or terminate access to the service for any misuse, abuse, or violation of these terms.",
    },
  ];
  return (
    <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-heading">
                        Terms and Conditions
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Everything you need to know about our Terms and Conditions
                    </p>
                </div>

                <section>
                    {termsAndConditions.map((item) => (
                        <Card className="shadow-card mb-6">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                    }

                </section>
            </div>
        </div>
  )
}

export default TermsConditions