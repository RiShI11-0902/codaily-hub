import { Card, CardContent } from "@/components/ui/card";

const Refunds = () => {

    const refundPolicy = [
        {
            id: 1,
            title: "1. Free Users",
            description:
                "Users receive 3 free AI-generated mock interviews to try our service.",
        },
        {
            id: 2,
            title: "2. Paid Users:",
            description:
                " Since the service is offered with free trials and is fully digital, we do not offer refunds once a purchase is made.",
        },
    ];



    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-heading">
                        Cancellations and Refund
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        All payments done are non refundable upon cancellations
                    </p>
                </div>

                <section>
                    <h2 className="text-3xl font-bold mb-8 gradient-heading">
                        Policies & Information
                    </h2>

                    {refundPolicy.map((item) => (
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
    );
}

export default Refunds