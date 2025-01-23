import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Horse</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Browse through our selection of quality horses and ponies
        </p>

        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="horses" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="horses">Horses</TabsTrigger>
              <TabsTrigger value="ponies">Ponies</TabsTrigger>
            </TabsList>
            <TabsContent value="horses">
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Horse Breed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friesian">Friesian</SelectItem>
                      <SelectItem value="kwpn">KWPN</SelectItem>
                      <SelectItem value="andalusian">Andalusian</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Discipline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dressage">Dressage</SelectItem>
                      <SelectItem value="jumping">Show Jumping</SelectItem>
                      <SelectItem value="eventing">Eventing</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amsterdam">Amsterdam</SelectItem>
                      <SelectItem value="rotterdam">Rotterdam</SelectItem>
                      <SelectItem value="thehague">The Hague</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  type="search"
                  placeholder="Search horses..."
                  className="w-full"
                />

                <Button className="w-full">Search Horses</Button>
              </div>
            </TabsContent>
            <TabsContent value="ponies">
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pony Breed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shetland">Shetland</SelectItem>
                      <SelectItem value="welsh">Welsh</SelectItem>
                      <SelectItem value="connemara">Connemara</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Discipline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dressage">Dressage</SelectItem>
                      <SelectItem value="jumping">Show Jumping</SelectItem>
                      <SelectItem value="eventing">Eventing</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amsterdam">Amsterdam</SelectItem>
                      <SelectItem value="rotterdam">Rotterdam</SelectItem>
                      <SelectItem value="thehague">The Hague</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  type="search"
                  placeholder="Search ponies..."
                  className="w-full"
                />

                <Button className="w-full">Search Ponies</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
