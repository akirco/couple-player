import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export function Room() {
  return (
    <Tabs defaultValue='Contacts' className='w-full h-full flex flex-col'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='Messages'>Messages</TabsTrigger>
        <TabsTrigger value='Contacts'>Contacts</TabsTrigger>
      </TabsList>
      <TabsContent value='Contacts' className='flex-1'>
        <Card className='h-full flex flex-col justify-between'>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when youre done.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <ScrollArea className='h-96'>
              <div className='p-4'>
                <AvatarDemo />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='Messages' className='flex-1'>
        <Card className='h-full flex flex-col justify-between'>
          <CardHeader>
            <CardTitle>Message</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex w-full max-w-sm items-center space-x-2'>
              <Input placeholder='Send a message?' type='text' />
              <Button size={'icon'}>
                <PaperPlaneIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
