'use client';

import { useState } from 'react';
import { Phone, AlertCircle, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function SOSButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    phone_number: '',
    emergency_type: '',
    people_count: 1,
    description: '',
    latitude: 0,
    longitude: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { data, error } = await supabase.from('sos_requests').insert({
            user_name: formData.user_name,
            phone_number: formData.phone_number,
            emergency_type: formData.emergency_type,
            people_count: formData.people_count,
            description: formData.description,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            status: 'Pending',
            priority: 'Critical',
          });

          setLoading(false);

          if (error) {
            toast.error('Failed to send SOS request');
            console.error(error);
          } else {
            toast.success('SOS request sent successfully! Help is on the way.');
            setOpen(false);
            setFormData({
              user_name: '',
              phone_number: '',
              emergency_type: '',
              people_count: 1,
              description: '',
              latitude: 0,
              longitude: 0,
            });
          }
        },
        () => {
          setLoading(false);
          toast.error('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setLoading(false);
      toast.error('Geolocation is not supported by your browser');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold shadow-lg animate-pulse"
          >
            <Phone className="h-5 w-5 mr-2" />
            Emergency SOS
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              Emergency SOS Request
            </DialogTitle>
            <DialogDescription>
              Fill in your details. Your location will be automatically detected.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                required
                value={formData.user_name}
                onChange={(e) =>
                  setFormData({ ...formData, user_name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                required
                type="tel"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                placeholder="+1234567890"
              />
            </div>

            <div>
              <Label htmlFor="emergency">Emergency Type *</Label>
              <Select
                required
                value={formData.emergency_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, emergency_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select emergency type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical">Medical Emergency</SelectItem>
                  <SelectItem value="Trapped">Trapped/Stuck</SelectItem>
                  <SelectItem value="Injured">Injured</SelectItem>
                  <SelectItem value="Fire">Fire</SelectItem>
                  <SelectItem value="Flood">Flood</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="people">Number of People</Label>
              <Input
                id="people"
                type="number"
                min="1"
                value={formData.people_count}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    people_count: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="description">Additional Details</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your situation..."
                rows={3}
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
              <p className="text-sm text-amber-800 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Your GPS location will be automatically sent
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Sending SOS...' : 'Send Emergency Request'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
