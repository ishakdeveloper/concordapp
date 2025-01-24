'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Skeleton } from '@/components/ui/skeleton';

// Initialize GIPHY - replace with your API key
const GIPHY_API_KEY = '3XPB0eUOJhFNNPFzqVfZbqmbhgaN2oki';

interface EmojiGifPickerProps {
  onSelect: (value: string, type: 'emoji' | 'gif') => void;
}

interface GiphyGif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
      height: string;
      width: string;
    };
  };
}

const customPickerTheme = {
  searchBackground: 'transparent',
  searchBorder: 'none',
  searchPlaceholder: 'Search emojis...',
  searchIcon: <Search className="h-4 w-4 text-muted-foreground" />,
  categoryIcons: {
    activities: '🎮',
    flags: '🏁',
    foods: '🍔',
    frequent: '🕒',
    nature: '🌲',
    objects: '💡',
    people: '😊',
    places: '✈️',
    symbols: '💱',
  },
};

const EmojiGifPicker = ({ onSelect }: EmojiGifPickerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [isLoadingGifs, setIsLoadingGifs] = useState(false);
  const [activeTab, setActiveTab] = useState('emoji');

  const searchGifs = async (query: string) => {
    setIsLoadingGifs(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=20&rating=g`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setIsLoadingGifs(false);
    }
  };

  const fetchTrendingGifs = async () => {
    setIsLoadingGifs(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=20&rating=g`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
    } finally {
      setIsLoadingGifs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'gif') {
      fetchTrendingGifs();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'gif' && searchQuery) {
      const debounce = setTimeout(() => {
        searchGifs(searchQuery);
      }, 500);

      return () => clearTimeout(debounce);
    }
  }, [searchQuery, activeTab]);

  return (
    <div className="w-[400px] h-[450px] bg-background rounded-md border shadow-md flex flex-col overflow-hidden">
      <Tabs
        defaultValue="emoji"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1"
      >
        <div className="p-4 border-b bg-background sticky top-0 z-10">
          <div className="flex items-center gap-2 mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="emoji">Emoji</TabsTrigger>
              <TabsTrigger value="gif">GIF</TabsTrigger>
            </TabsList>
          </div>
          {activeTab === 'gif' && (
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search GIFs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          )}
        </div>

        <TabsContent value="emoji" className="flex-1 mt-0">
          <div className="h-[350px]">
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) => {
                onSelect(emoji.native, 'emoji');
              }}
              theme="dark"
              searchPosition="none"
              previewPosition="none"
              skinTonePosition="none"
              navPosition="top"
              perLine={8}
              emojiSize={24}
              emojiButtonSize={32}
              categories={[
                'frequent',
                'people',
                'nature',
                'foods',
                'activity',
                'places',
                'objects',
                'symbols',
                'flags',
              ]}
              icons={customPickerTheme.categoryIcons}
              set="native"
              className="custom-emoji-picker"
            />
          </div>
        </TabsContent>

        <TabsContent value="gif" className="flex-1 mt-0 relative">
          <ScrollArea className="h-[350px]">
            {isLoadingGifs ? (
              <div className="p-4 grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-video w-full" />
                ))}
              </div>
            ) : (
              <div className="p-4 grid grid-cols-2 gap-2">
                {gifs.map((gif) => (
                  <button
                    key={gif.id}
                    className="relative aspect-video rounded-md overflow-hidden hover:ring-2 ring-primary transition-all"
                    onClick={() => onSelect(gif.images.fixed_height.url, 'gif')}
                  >
                    <img
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmojiGifPicker;
