import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

// import { peerSend } from '@/lib/peerEventListener';
import { peerSend } from "@/lib/peerEventListener";
import { useState } from "react";

export function Room({
  mineId,
  connectedId,
}: {
  mineId: string | null;
  connectedId: string | null;
}) {
  const [message, setMessage] = useState("");
  const sendMsg = () => {
    peerSend({ type: "message", value: message });
    setMessage("");
  };
  return (
    <Tabs defaultValue="Messages" className="w-full h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Messages">Messages</TabsTrigger>
        <TabsTrigger value="Contacts">Contacts</TabsTrigger>
      </TabsList>
      <TabsContent value="Contacts" className="flex-1">
        <Card className="h-full flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>
              View your connected user&apos;s ID.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-96">
              <div className="p-4 space-y-4">
                <span className="px-3 py-2 select-none rounded-full inline-flex items-center gap-2 bg-secondary">
                  <h1> mine:</h1>
                  <h1>{mineId}</h1>
                </span>
                <br />
                <span className="px-3 py-2 select-none rounded-full inline-flex items-center gap-2 bg-secondary">
                  <h1>connectedId:</h1>
                  <h1>{connectedId}</h1>
                </span>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Messages" className="flex-1">
        <Card className="h-full flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Message</CardTitle>
            <CardDescription>
              Send a message to your connected user.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex w-full max-w-sm items-center space-x-2 m-auto">
              <Input
                placeholder="Send a message?"
                type="text"
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.length > 0) sendMsg();
                }}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                size={"icon"}
                onClick={sendMsg}
                className="text-white text-xl font-medium"
              >
                <PaperPlaneIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
