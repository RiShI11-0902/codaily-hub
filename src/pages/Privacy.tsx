import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {

    const privacyPolicy = [
        {
            id: 1,
            title: "Data Collected",
            description:
                "We collect your email address, name, and optional contact number. We also store your mock interview progress locally in your browser using Chrome storage.",
        },
        {
            id: 2,
            title: "Purpose",
            description:
                "We use the collected information to generate AI-powered mock interviews, provide personalized updates, and offer support when needed. Your session progress is saved locally to improve your user experience.",
        },
        {
            id: 3,
            title: "Permissions",
            description:
                "Our extension requests permission to access https://leetcode.com/* in order to simulate mock interviews directly on the LeetCode platform. It also uses storage permission to save your progress.",
        },
        {
            id: 4,
            title: "Security",
            description:
                "Your data is securely stored. We do not sell, rent, or share your information with any third parties. No third-party analytics or advertising services are used.",
        },
        {
            id: 5,
            title: "LeetCode Disclaimer",
            description:
                "We do not access, collect, or store any personal data from your LeetCode account. We only enhance your experience by simulating mock interviews on the LeetCode platform.",
        },
        {
            id: 6,
            title: "Changes to this Policy",
            description:
                "We may update this Privacy Policy in the future. Any changes will be posted inside the extension or on our official website.",
        },
        {
            id: 7,
            title: "Contact Us",
            description:
                "If you have any questions regarding this Privacy Policy, please contact us at support@2codedaily.com.",
        },
    ];

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-heading">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Everything you need to know about how 2CodeDaily use your data
                    </p>
                </div>

                {/* Policies */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 gradient-heading">
                        Policies & Information
                    </h2>

                    {privacyPolicy.map((item) => (
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
};

export default Privacy;
