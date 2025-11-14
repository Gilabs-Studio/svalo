import {
  Scissors,
  Clock,
  MessageSquare,
  MapPin,
  Phone,
  Music,
  Palette,
  Smile,
  type LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  scissors: Scissors,
  clock: Clock,
  'message-square': MessageSquare,
  'map-pin': MapPin,
  phone: Phone,
  chair: Music, // Using Music icon for "Cool chair, good music"
  palette: Palette,
  smile: Smile,
};

