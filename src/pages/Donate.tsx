import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// 1. Import the QR code image
import qrCode from "../assets/qr-code.png"; 

const Donate = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Support Our Cause</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Existing Donation Form or Info */}
        <Card>
          <CardHeader>
            <CardTitle>Online Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Choose an amount to contribute to our programs.</p>
            <Button className="w-full">Donate via Card</Button>
          </CardContent>
        </Card>

        {/* 2. Add the QR Code Section */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle>Scan to Donate</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <img 
                src={qrCode} 
                alt="Donation QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code using your banking or UPI app to make a direct contribution.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donate;