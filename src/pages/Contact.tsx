import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Globe, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen text-white py-16 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-5xl font-bold mb-4 gradient-heading">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          We’d love to hear from you! Whether you have questions, feedback, or run into an issue — we're here to help.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Email */}
        <Card className=" border border-indigo-500/30 shadow-md shadow-indigo-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <Mail className="h-10 w-10 gradient-heading" />
            <h3 className="text-2xl font-semibold gradient-heading">Email</h3>
            <p className="text-muted-foreground text-lg">contact2codedaily@gmail.com</p>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className=" border border-indigo-500/30 shadow-md shadow-indigo-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <MapPin className="h-10 w-10 gradient-heading" />
            <h3 className="text-2xl font-semibold gradient-heading">Operational Address</h3>
            <p className="text-muted-foreground leading-relaxed">
              Opp. Gadikhana Ground, Dhoble Gali, Model Mill Sq.<br />
              Nagpur, Maharashtra, 440032
            </p>
          </CardContent>
        </Card>

        {/* Platform */}
        <Card className=" border border-indigo-500/30 shadow-md shadow-indigo-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <Globe className="h-10 w-10 gradient-heading" />
            <h3 className="text-2xl font-semibold gradient-heading">Platform</h3>
            <p className="text-muted-foreground text-lg">
              Fully Remote – Serving Coders Globally 🌍
            </p>
          </CardContent>
        </Card>

        {/* Extension Support */}
        <Card className=" border border-indigo-500/30 shadow-md shadow-indigo-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <MessageSquare className="h-10 w-10 gradient-heading" />
            <h3 className="text-2xl font-semibold gradient-heading">Extension Support</h3>
            <p className="text-muted-foreground text-lg">
              Facing issues or have suggestions with our Chrome Extension?<br /> We’re all ears!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Timing and Response Info */}
      <div className="max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Support Hours */}
        <Card className=" border border-indigo-500/30 shadow-md shadow-indigo-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <Clock className="h-10 w-10 gradient-heading" />
            <h3 className="text-2xl font-semibold gradient-heading">Support Hours</h3>
            <p className="text-muted-foreground text-lg">
              Mon–Fri, 10:00 AM – 6:00 PM (IST)
            </p>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card className=" border border-indigo-500/30 shadow-md shadow-indigo-500/20">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <Clock className="h-10 w-10 gradient-heading" />
            <h3 className="text-2xl font-semibold gradient-heading">Response Time</h3>
            <p className="text-muted-foreground text-lg">
              Typically within 24–48 business hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Message */}
      <div className="text-center mt-16 max-w-2xl">
        <p className="text-muted-foreground text-lg">
          Let’s build something amazing together — your feedback shapes <span className="gradient-heading font-semibold">2CodeDaily’s</span> future!
        </p>
      </div>
    </div>
  );
};

export default Contact;
