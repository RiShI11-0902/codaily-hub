"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield } from "lucide-react";
import { toast } from "sonner";
import UseUserStore from "@/store/store";

const Account = () => {
  const [showPayments, setShowPayments] = useState(false);
  const { user } = UseUserStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">
          Account Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-center ">
              <div className="">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name || ""} disabled />
              </div>
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ""}
                  disabled
                />
              </div>
            </div>
            <Card className="shadow-card mt-5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Membership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="text-lg font-semibold gradient-heading">
                    {user?.selectedPlan || "Free"}
                  </p>
                </div>
                {user?.activeSubscription && (
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">
                      {new Date(
                        user.activeSubscription.startedAt
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <span>Next Billing Date: </span>
                      {new Date(
                        user.activeSubscription.nextBillingDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="space-y-6">
          {/* Payments */}
          <Card className="shadow-card">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Payments
              </CardTitle>
              {user?.payments?.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPayments(!showPayments)}
                >
                  {showPayments ? "Hide" : "View"} Payments
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showPayments ? (
                user?.payments && user.payments.length > 0 ? (
                  <div className="space-y-4 max-h-full overflow-y-auto">
                    {user.payments.map((ele: any, index: number) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg hover:bg-muted/40 transition"
                      >
                        <p className="font-medium">Payment ID: {ele.paymentId}</p>
                        <p>Status: {ele.status}</p>
                        <p>Date: {new Date(ele.createdAt).toLocaleDateString()}</p>
                        <p>
                          Amount:{" "}
                          <span className="font-semibold">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(ele.amount / 100)} {/* divide by 100 if Dodo stores paise */}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No payments found</p>
                )
              ) : (
                <p className="text-muted-foreground">
                  Click "View Payments" to see your payment history
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
